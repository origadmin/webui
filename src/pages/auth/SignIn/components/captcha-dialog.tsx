import { useCallback, useEffect, useState } from "react";
import { get } from "@/utils/request";
import { IconAlertCircle, IconRefresh, IconVolume } from "@tabler/icons-react";
import { useToast } from "@/hooks/use-toast";
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

type CaptchaResponse = {
  captchaId?: string;
  captchaData?: string;
  mimeType?: string;
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
      // The `get` utility directly returns the data payload on success.
      const response = await get<CaptchaResponse>("/auth/captcha", { captcha_type: "digit" });

      // FINAL, CORRECTED LOGIC: The response object IS the data. No ".success" or ".data" wrapper.
      if (response && response.captchaData) {
        setCaptchaId(response.captchaId);
        setCaptchaImage(response.captchaData);
      } else {
        // This will now correctly catch cases where the response is empty or malformed.
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
      if (response && response.captchaData) {
        const audio = new Audio(response.captchaData);
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
      // Reset state when dialog closes
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
      return <Skeleton className='h-[50px] w-[150px]' />;
    }
    if (hasError) {
      return (
        <div
          className='flex h-[50px] w-[150px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed text-destructive'
          onClick={refreshCaptcha}
        >
          <IconAlertCircle className='size-5' />
          <span className='text-xs'>Load failed</span>
        </div>
      );
    }
    return (
      <img
        src={captchaImage || ""}
        alt='CAPTCHA'
        className='h-[50px] w-[150px] cursor-pointer rounded-md border'
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
        <div className='space-y-4 py-2'>
          <div className='relative'>
            <Input
              id='captcha-code'
              value={captchaCode}
              onChange={(e) => setCaptchaCode(e.target.value)}
              placeholder='Enter code'
              className='pr-28' // Make space for the buttons inside
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <Button variant='ghost' size='icon' className='size-7' onClick={playAudio}>
                <IconVolume className='size-5 text-muted-foreground' />
              </Button>
              <Button variant='ghost' size='icon' className='size-7' onClick={refreshCaptcha}>
                <IconRefresh className='size-5 text-muted-foreground' />
              </Button>
            </div>
          </div>
          <div className='flex justify-center'>{renderCaptchaImage()}</div>
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
