import { z, ZodType } from "zod";

export class TaskValidation {
  static readonly CREATE: ZodType = z.object({
    user_id: z.string(),
    title: z.string().trim().max(100).min(1),
    description: z.string().trim().optional(),
    date: z.coerce.date().min(new Date(new Date().setHours(0, 0, 0, 0))),
    is_important: z.boolean().default(false),
  });
}