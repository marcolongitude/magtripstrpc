import { z } from "zod";

export const formSchemaEditUser = z.object({
  id: z.string().min(1, { message: "Por favor, insira um ID." }).optional(),
  name: z.string().min(1, { message: "Por favor, insira um nome." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  phone: z.string().min(1, { message: "Por favor, insira um telefone." }),
  address: z.object({
    street: z.string().min(1, { message: "Por favor, insira uma rua." }),
    number: z.string().min(1, { message: "Por favor, insira um número." }),
    district: z.string().min(1, { message: "Por favor, insira um bairro." }),
    zipCode: z.string().min(1, { message: "Por favor, insira um CEP." }),
    city: z.string().min(1, { message: "Por favor, insira uma cidade." }),
    state: z.string().min(1, { message: "Por favor, insira um estado." }),
    country: z.string().min(1, { message: "Por favor, insira um país." }),
  }),
});

export type formSchemaEditUser = z.infer<typeof formSchemaEditUser>;
