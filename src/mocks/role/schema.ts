import { z } from "zod";

const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  keyword: z.string(),
  description: z.string(),
  status: z.number(),
  create_time: z.string(),
  update_time: z.string(),
});
export type User = z.infer<typeof roleSchema> & API.System.Role;

export const roleListSchema = z.array(roleSchema);
