import { toast } from "@/hooks/use-toast";

export function debugToast(title: string, data: unknown) {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  toast({
    title: title,
    description: (
      <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
        <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  });
}
