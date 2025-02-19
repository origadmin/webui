import { zodResolver } from "@hookform/resolvers/zod";
import { IconMailPlus, IconSend } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required." }).email({ message: "Email is invalid." }),
  resource: z.string().min(1, { message: "Resource is required." }),
  desc: z.string().optional(),
});
type ResourceInviteForm = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResourcesInviteDialog({ open, onOpenChange }: Props) {
  const form = useForm<ResourceInviteForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", resource: "", desc: "" },
  });

  const onSubmit = (values: ResourceInviteForm) => {
    form.reset();
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader className='text-left'>
          <DialogTitle className='flex items-center gap-2'>
            <IconMailPlus /> Invite Resource
          </DialogTitle>
          <DialogDescription>
            Invite new resource to join your team by sending them an email invitation. Assign a resource to define their
            access level.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id='resource-invite-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder='eg: john.doe@gmail.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='desc'
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      className='resize-none'
                      placeholder='Add a personal note to your invitation (optional)'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className='gap-y-2'>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button type='submit' form='resource-invite-form'>
            Invite <IconSend />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
