import { formSchema } from "~/app/dashboard/users/components/schema";
import { TRPCError } from "@trpc/server";
import { prisma } from "~/lib/prisma";

export async function createusers(data: Omit<formSchema, "confirmPassword">) {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        address: {
          create: {
            street: data.address.street,
            number: data.address.number,
            district: data.address.district,
            zipCode: data.address.zipCode,
            city: data.address.city,
            state: data.address.state,
            country: data.address.country,
          },
        },
      },
      include: {
        address: true,
      },
    });

    if (!newUser) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Erro interno.",
      });
    }

    const { password, ...userWithoutPassword } = newUser;

    return {
      status: "success",
      data: {
        user: userWithoutPassword,
      },
    };
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Email ja existe.",
      });
    }
  }
}

export async function getUserById(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      address: true,
    },
  });
  return user;
}
