import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

const taskSchema = z.object({
  name: z.string().min(1, 'Task name is required'),
  description: z.string().optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  owner: z.string().min(1, 'Task owner is required'),
  type: z.enum(['private', 'public']),
});

const memberSchema = z.object({
  name: z.string().min(1, 'Member name is required'),
  role: z.string().min(1, 'Role is required'),
});

const formSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  projectDescription: z.string().optional(),
  client: z.string().min(1, 'Client name is required'),
  contractType: z.enum(['fixed', 'hourly']),
  tasks: z.array(taskSchema).min(1, 'At least one task is required'),
  members: z.array(memberSchema),
});

export default function AdvancedFormExample() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      projectDescription: '',
      client: '',
      contractType: 'fixed',
      tasks: [{ name: '', description: '', startDate: '', endDate: '', owner: '', type: 'private' }],
      members: [{ name: '', role: '' }],
    },
  });

  const {
    fields: taskFields,
    append: appendTask,
    remove: removeTask,
  } = useFieldArray({
    name: 'tasks',
    control: form.control,
  });

  const {
    fields: memberFields,
    append: appendMember,
    remove: removeMember,
  } = useFieldArray({
    name: 'members',
    control: form.control,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <ScrollArea className='h-full'>
      <div className='container mx-auto py-10'>
        <Card>
          <CardHeader>
            <CardTitle>Advanced Project Management Form</CardTitle>
            <CardDescription>Manage your project details, tasks, and team members.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <Tabs defaultValue='project' className='w-full'>
                  <TabsList className='grid w-full grid-cols-3'>
                    <TabsTrigger value='project'>Project Details</TabsTrigger>
                    <TabsTrigger value='tasks'>Tasks</TabsTrigger>
                    <TabsTrigger value='team'>Team Members</TabsTrigger>
                  </TabsList>
                  <TabsContent value='project' className='space-y-4'>
                    <FormField
                      control={form.control}
                      name='projectName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter project name' {...field} />
                          </FormControl>
                          <FormDescription>The name of your project.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='projectDescription'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder='Describe your project' className='resize-none' {...field} />
                          </FormControl>
                          <FormDescription>A brief description of your project.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='grid grid-cols-2 gap-4'>
                      <FormField
                        control={form.control}
                        name='client'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client</FormLabel>
                            <FormControl>
                              <Input placeholder='Client name' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='contractType'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contract Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select a contract type' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value='fixed'>Fixed Price</SelectItem>
                                <SelectItem value='hourly'>Hourly Rate</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value='tasks' className='space-y-4'>
                    {taskFields.map((field, index) => (
                      <Card key={field.id}>
                        <CardHeader>
                          <CardTitle className='text-lg'>Task {index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='grid gap-4'>
                            <FormField
                              control={form.control}
                              name={`tasks.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Task Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder='Enter task name' {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`tasks.${index}.description`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder='Describe the task' className='resize-none' {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className='grid grid-cols-2 gap-4'>
                              <FormField
                                control={form.control}
                                name={`tasks.${index}.startDate`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Start Date</FormLabel>
                                    <FormControl>
                                      <Input type='date' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`tasks.${index}.endDate`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>End Date</FormLabel>
                                    <FormControl>
                                      <Input type='date' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormField
                              control={form.control}
                              name={`tasks.${index}.owner`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Task Owner</FormLabel>
                                  <FormControl>
                                    <Input placeholder='Task owner' {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`tasks.${index}.type`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Task Type</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder='Select a task type' />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value='private'>Private</SelectItem>
                                      <SelectItem value='public'>Public</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            type='button'
                            variant='outline'
                            size='sm'
                            className='mt-2'
                            onClick={() => removeTask(index)}
                          >
                            Remove Task
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      className='mt-2'
                      onClick={() =>
                        appendTask({
                          name: '',
                          description: '',
                          startDate: '',
                          endDate: '',
                          owner: '',
                          type: 'private',
                        })
                      }
                    >
                      Add Task
                    </Button>
                  </TabsContent>
                  <TabsContent value='team' className='space-y-4'>
                    {memberFields.map((field, index) => (
                      <Card key={field.id}>
                        <CardHeader>
                          <CardTitle className='text-lg'>Team Member {index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='grid gap-4'>
                            <FormField
                              control={form.control}
                              name={`members.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder='Enter member name' {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`members.${index}.role`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Role</FormLabel>
                                  <FormControl>
                                    <Input placeholder='Enter member role' {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            type='button'
                            variant='outline'
                            size='sm'
                            className='mt-2'
                            onClick={() => removeMember(index)}
                          >
                            Remove Member
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      className='mt-2'
                      onClick={() => appendMember({ name: '', role: '' })}
                    >
                      Add Team Member
                    </Button>
                  </TabsContent>
                </Tabs>
                <Separator />
                <Button type='submit'>Submit Project</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
