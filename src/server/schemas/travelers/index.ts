import { z } from "zod";

export const schemaCreateTravelersInput = z.object({
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

export type schemaCreateTravelersInput = z.infer<
  typeof schemaCreateTravelersInput
>;

export const schemaGetTravelersInput = z.object({
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

export type schemaGetTravelersInput = z.infer<typeof schemaGetTravelersInput>;
