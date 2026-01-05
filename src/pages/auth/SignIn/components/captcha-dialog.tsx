import { useCallback, useEffect, useState } from "react";
import { get } from "@/utils/request";
import { IconAlertCircle, IconRefresh, IconVolume } from "@tabler/icons-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";


interface CaptchaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerifySuccess: (captchaId: string, captchaCode: string) => void;
}

type CaptchaResponse = {
  captcha_id?: string;
  captcha_data?: string;
  mime_type?: string;
};

export function CaptchaDialog({ open, onOpenChange, onVerifySuccess }: CaptchaDialogProps) {
  const [captchaId, setCaptchaId] = useState<string | undefined>();
  const [captchaImage, setCaptchaImage] = useState<string | undefined>();
  const [captchaCode, setCaptchaCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { toast } = useToast();

  const refreshCaptcha = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const response = await get<CaptchaResponse>("/auth/captcha", { captcha_type: "digit" });
      if (response && response.captcha_data) {
        setCaptchaId(response.captcha_id);
        setCaptchaImage(response.captcha_data);
      } else {
        throw new Error("Failed to load or parse captcha data.");
      }
    } catch (err) {
      console.error("Captcha fetch error:", err);
      setHasError(true);
      toast({ variant: "destructive", description: "Failed to load captcha. Please try again." });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const playAudio = useCallback(async () => {
    if (!captchaId) return;
    try {
      const response = await get<CaptchaResponse>("/auth/captcha", {
        captcha_id: captchaId,
        captcha_type: "audio",
      });
      if (response && response.captcha_data) {
        const audio = new Audio(response.captcha_data);
        audio.play().catch((e) => {
          console.error("Audio playback failed:", e);
          toast({ variant: "destructive", description: "Failed to play audio." });
        });
      } else {
        throw new Error("Failed to load audio captcha.");
      }
    } catch (error) {
      toast({ variant: "destructive", description: "Failed to load audio. Please try again." });
    }
  }, [captchaId, toast]);

  useEffect(() => {
    if (open) {
      refreshCaptcha();
    } else {
      setCaptchaCode("");
      setCaptchaId(undefined);
      setCaptchaImage(undefined);
    }
  }, [open, refreshCaptcha]);

  const handleSubmit = async () => {
    if (!captchaId || !captchaCode) {
      toast({ variant: "destructive", description: "Please enter the captcha code." });
      return;
    }
    onVerifySuccess(captchaId, captchaCode);
  };

  const renderCaptchaImage = () => {
    if (isLoading) {
      return <Skeleton className='h-[50px] w-full' />;
    }
    if (hasError) {
      return (
        <div
          className='flex h-[50px] w-full cursor-pointer flex-col items-center justify-center rounded-l-md'
          onClick={refreshCaptcha}
        >
          <IconAlertCircle className='size-5 text-destructive' />
          <span className='text-xs'>Load failed</span>
        </div>
      );
    }
    return (
      <img
        src={captchaImage || ""}
        alt='CAPTCHA'
        className='h-[50px] w-full cursor-pointer rounded-l-md'
        onClick={refreshCaptcha}
      />
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader>
          <DialogTitle>Complete Security Verification</DialogTitle>
          <DialogDescription>Enter the characters from the image to continue.</DialogDescription>
        </DialogHeader>
        {/* CORRECTED: Reduced vertical spacing from space-y-3 to space-y-2 */}
        <div className='space-y-2 py-2'>
          {/* Unified container for image and buttons */}
          <div className='flex h-[52px] items-center rounded-md border border-input'>
            <div className='flex-grow'>{renderCaptchaImage()}</div>
            <div className='h-full w-px bg-border' />
            <div className='flex h-full flex-col items-center justify-center gap-y-1 px-1'>
              {/* CORRECTED: Re-added the onClick handlers */}
              <Button variant='ghost' size='icon' className='size-8' onClick={refreshCaptcha}>
                <IconRefresh className='size-5 text-muted-foreground' />
              </Button>
              <Button variant='ghost' size='icon' className='size-8' onClick={playAudio}>
                <IconVolume className='size-5 text-muted-foreground' />
              </Button>
            </div>
          </div>

          {/* Input field below */}
          <Input
            id='captcha-code'
            value={captchaCode}
            onChange={(e) => setCaptchaCode(e.target.value)}
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
