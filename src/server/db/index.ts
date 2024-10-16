import { PrismaClient } from "@prisma/client";

// Cria uma instância do Prisma Client
export const prisma = new PrismaClient();

// Exemplo para rodar apenas uma instância do Prisma Client no modo de desenvolvimento
if (process.env.NODE_ENV !== "production") {
  (global as any).prisma = prisma;
}
