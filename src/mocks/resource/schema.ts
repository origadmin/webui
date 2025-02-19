import { z } from "zod";

const resourceSchema = z.object({
  id: z.string(),
  create_time: z.string(),
  update_time: z.string(),
  name: z.string(),
  keyword: z.string(),
  i18n_key: z.string(),
  type: z.string(),
  status: z.number(),
  uri: z.string(),
  operation: z.string(),
  method: z.string(),
  component: z.string(),
  icon: z.string(),
  sequence: z.number(),
  visible: z.boolean(),
  tree_path: z.string(),
  description: z.string(),
});
export type Resource = z.infer<typeof resourceSchema> & API.System.Resource;

export const resourceListSchema = z.array(resourceSchema);
