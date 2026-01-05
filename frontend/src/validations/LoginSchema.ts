import { z } from "zod";
const loginSchema = z.object({
  email: z
    .email({
      message: "Invalid email address",
    })
    .min(1, {
      message: "Email is required",
    }),
  password: z.string().min(1, "Password is required"),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export { type LoginSchemaType, loginSchema };
