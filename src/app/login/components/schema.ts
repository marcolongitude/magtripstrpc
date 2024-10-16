import { z } from "zod";

export const formSchemaLogin = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z
    .string()
    .min(4, { message: "A senha deve ter no mínimo 4 caracteres." }),
});

export type formSchemaLogin = z.infer<typeof formSchemaLogin>;
