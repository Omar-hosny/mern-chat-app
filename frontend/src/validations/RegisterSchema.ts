import z from "zod";

const registerSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    email: z.email({
      message: "Invalid email address",
    }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirm Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterSchemaType = z.infer<typeof registerSchema>;

export { type RegisterSchemaType, registerSchema };
