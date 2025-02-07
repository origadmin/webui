import { z } from "zod";

const userStatusSchema = z.union([
  z.literal("active"),
  z.literal("inactive"),
  z.literal("invited"),
  z.literal("suspended"),
]);
export type UserStatus = z.infer<typeof userStatusSchema>;

const userRoleSchema = z.union([
  z.literal("superadmin"),
  z.literal("admin"),
  z.literal("cashier"),
  z.literal("manager"),
]);

const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  nickname: z.string(),
  avatar: z.string(),
  email: z.string(),
  phone: z.string(),
  // status: userStatusSchema,
  // role: userRoleSchema,
  status: z.number(),
  create_time: z.string(),
  update_time: z.string(),
});
export type User = z.infer<typeof userSchema> & API.System.User;

export const userListSchema = z.array(userSchema);
