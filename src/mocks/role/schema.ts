import { z } from "zod";

const roleStatusSchema = z.union([
  z.literal("active"),
  z.literal("inactive"),
  z.literal("invited"),
  z.literal("suspended"),
]);
export type RoleStatus = z.infer<typeof roleStatusSchema>;

const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  keyword: z.string(),
  status: roleStatusSchema,
  create_time: z.coerce.date(),
  update_time: z.coerce.date(),
});
export type User = z.infer<typeof roleSchema> & API.Role;

export const roleListSchema = z.array(roleSchema);
