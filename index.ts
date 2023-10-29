import { z } from "zod";

const profileSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be string",
      required_error: "Name is required",
    })
    .regex(/^[^0-9]$/, { message: "Name should not contain number" }),
  age: z.number({
    invalid_type_error: "Age must be a number",
    required_error: "Age is required",
  }),
  score: z.object({
    soccer: z.number(),
    baseball: z.number(),
  }),
});

const profileCheck = profileSchema.safeParse({
  name: "Bob",
  score: {
    baseball: 2,
  },
} as z.infer<typeof profileSchema>);

if (!profileCheck.success) {
  console.log(
    profileCheck.error.errors.map((err) => ({
      path: err.path.join("/"),
      message: err.message,
    })),
  );
}
