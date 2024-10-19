import { z } from "zod";

export const formSchemaCreateUser = z
  .object({
    name: z.string().min(1, { message: "Por favor, insira um nome." }),
    email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
    password: z
      .string()
      .min(4, { message: "A senha deve ter no mínimo 4 caracteres." }),
    confirmPassword: z
      .string()
      .min(4, { message: "A senha deve ter no минimo 4 caracteres." }),
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem corresponder.",
    path: ["confirmPassword"],
  });

export type formSchemaCreateUser = z.infer<typeof formSchemaCreateUser>;

export const formSchemaDeleteUser = z
  .object({
    id: z.string().min(1, { message: "Por favor, insira um ID." }),
    name: z.string().min(1, { message: "Por favor, insira um nome." }),
    email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
    password: z
      .string()
      .min(4, { message: "A senha deve ter no mínimo 4 caracteres." }),
    confirmPassword: z
      .string()
      .min(4, { message: "A senha deve ter no минimo 4 caracteres." }),
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem corresponder.",
    path: ["confirmPassword"],
  });

export type formSchemaDeleteUser = z.infer<typeof formSchemaDeleteUser>;
