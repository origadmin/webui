import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  nickname: z.string(),
  avatar: z.string(),
  email: z.string(),
  phone: z.string(),
  status: z.number(),
  create_time: z.string(),
  update_time: z.string(),
});
export type User = z.infer<typeof userSchema> & API.System.User;

export const userListSchema = z.array(userSchema);
