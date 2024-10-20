import { z } from "zod";

export const schemaCreateUserInput = z.object({
  name: z.string().min(1, { message: "Por favor, insira um nome." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z
    .string()
    .min(4, { message: "A senha deve ter no mínimo 4 caracteres." }),
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

export type schemaCreateUserInput = z.infer<typeof schemaCreateUserInput>;

export const schemaEditUsersInput = z.object({
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

export type schemaEditUsersInput = z.infer<typeof schemaEditUsersInput>;

export const schemaGetUserInput = z.object({
  id: z.string().min(1, { message: "Por favor, insira um ID." }),
  name: z.string().min(1, { message: "Por favor, insira um nome." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  phone: z.string().min(1, { message: "Por favor, insira um telefone." }),
  address: z
    .object({
      street: z.string().min(1, { message: "Por favor, insira uma rua." }),
      number: z.string().min(1, { message: "Por favor, insira um número." }),
      district: z.string().min(1, { message: "Por favor, insira um bairro." }),
      zipCode: z.string().min(1, { message: "Por favor, insira um CEP." }),
      city: z.string().min(1, { message: "Por favor, insira uma cidade." }),
      state: z.string().min(1, { message: "Por favor, insira um estado." }),
      country: z.string().min(1, { message: "Por favor, insira um país." }),
    })
    .nullable(),
});

export type schemaGetUserInput = z.infer<typeof schemaGetUserInput>;

export const schemaUserByIdInput = z.object({
  id: z.string().min(1, { message: "Por favor, insira um ID." }),
});

export type schemaUserByIdInput = z.infer<typeof schemaUserByIdInput>;
