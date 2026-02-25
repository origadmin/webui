import { useCallback, useEffect, useState } from "react";
import { getCaptcha } from "@/api/auth/login";
import { IconAlertCircle, IconRefresh, IconVolume } from "@tabler/icons-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

interface CaptchaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerifySuccess: (captchaId: string, captchaCode: string) => void;
}

export function CaptchaDialog({ open, onOpenChange, onVerifySuccess }: CaptchaDialogProps) {
  const [captchaId, setCaptchaId] = useState<string | undefined>();
  const [captchaImage, setCaptchaImage] = useState<string | null>(null);
  const [captchaCode, setCaptchaCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [dialogError, setDialogError] = useState<string | null>(null);
  const { toast } = useToast();

  const refreshCaptcha = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    setDialogError(null);
    try {
      const response = await getCaptcha({ captcha_type: "digit" });
      if (response && response.captcha_data) {
        setCaptchaId(response.captcha_id);
        setCaptchaImage(response.captcha_data);
      } else {
        // Directly handle the error case instead of throwing
        console.error("Captcha fetch error: Failed to load or parse captcha data.");
        setHasError(true);
      }
    } catch (err) {
      console.error("Captcha fetch error:", err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const playAudio = useCallback(async () => {
    if (!captchaId) return;
    try {
      const response = await getCaptcha({
        captcha_id: captchaId,
        captcha_type: "audio",
      });
      if (response && response.captcha_data) {
        const audio = new Audio(response.captcha_data);
        audio.play().catch((e) => {
          console.error("Audio playback failed:", e);
          setDialogError("Failed to play audio.");
        });
      } else {
        // Directly handle the error case instead of throwing
        setDialogError("Failed to load audio. Please try again.");
      }
    } catch {
      setDialogError("Failed to load audio. Please try again.");
    }
  }, [captchaId]);

  useEffect(() => {
    if (open) {
      refreshCaptcha();
    } else {
      setCaptchaCode("");
      setCaptchaId(undefined);
      setCaptchaImage(null);
      setDialogError(null);
    }
  }, [open, refreshCaptcha]);

  const handleSubmit = async () => {
    if (!captchaId || !captchaCode) {
      setDialogError("Please enter the captcha code.");
      return;
    }
    onVerifySuccess(captchaId, captchaCode);
  };

  const renderCaptchaImage = () => {
    if (isLoading) {
      return <Skeleton className='h-[60px] w-full' />;
    }
    if (hasError) {
      return (
        <div
          className='flex h-[60px] w-full cursor-pointer flex-col items-center justify-center rounded-l-md'
          onClick={refreshCaptcha}
        >
          <IconAlertCircle className='size-5 text-destructive' />
          <span className='text-xs'>Load failed</span>
        </div>
      );
    }
    if (captchaImage) {
      return (
        <img
          src={captchaImage}
          alt='CAPTCHA'
          className='h-[60px] w-full cursor-pointer rounded-l-md'
          onClick={refreshCaptcha}
        />
      );
    }
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader>
          <DialogTitle>Complete Security Verification</DialogTitle>
          <DialogDescription>Enter the characters from the image to continue.</DialogDescription>
        </DialogHeader>
        <div className='space-y-2 py-2'>
          <div className='flex h-[62px] items-center rounded-md border border-input'>
            <div className='flex-grow'>{renderCaptchaImage()}</div>
            <div className='h-full w-px bg-border' />
            <div className='flex h-full flex-col items-center justify-center gap-y-1 px-1'>
              <Button variant='ghost' size='icon' className='size-8' onClick={refreshCaptcha}>
                <IconRefresh className='size-5 text-muted-foreground' />
              </Button>
              <Button variant='ghost' size='icon' className='size-8' onClick={playAudio}>
                <IconVolume className='size-5 text-muted-foreground' />
              </Button>
            </div>
          </div>
          {dialogError && (
            <Alert variant='destructive' className='py-1.5 px-3'>
              <AlertDescription className='text-xs'>{dialogError}</AlertDescription>
            </Alert>
          )}
          <Input
            id='captcha-code'
            value={captchaCode}
            onChange={(e) => {
              setCaptchaCode(e.target.value);
              setDialogError(null);
            }}
            placeholder='Please enter the characters'
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>
        <DialogFooter>
          <Button type='button' className='w-full' onClick={handleSubmit}>
            Verify and Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
