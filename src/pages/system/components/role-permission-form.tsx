import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const formSchema = z.object({
  name: z.string().min(2, "名称至少2个字符"),
  keyword: z.string().regex(/^[A-Z_]+$/, "关键字必须大写字母和下划线"),
  description: z.string().optional(),
  data_scope: z.enum(["self", "dept", "role", "all"]),
  data_rules: z.record(z.string()).optional(),
});

type PermissionForm = z.infer<typeof formSchema>;

export const RolePermissionForm = ({ initialValues, onSubmit, onDelete }) => {
  const form = useForm<PermissionForm>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      keyword: "",
      description: "",
      data_scope: "role",
      data_rules: {},
    },
  });
  
  const onSubmit = (data: PermissionForm) => {
    // form.handleSubmit(onSubmit)(data);
  }

  return (
    <Form {...form}>
      <form id='role-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 p-1'>
        {/* 表单字段实现 */}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>权限名称</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* 其他字段... */}

        <div className='flex justify-between'>
          {onDelete && (
            <Button variant='destructive' type='button' onClick={onDelete}>
              删除权限
            </Button>
          )}
          <Button type='submit'>{initialValues ? "保存修改" : "创建权限"}</Button>
        </div>
      </form>
    </Form>
  );
};
