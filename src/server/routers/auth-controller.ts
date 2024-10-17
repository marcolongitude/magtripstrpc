import bcrypt from "bcryptjs";
import { prisma } from "~/lib/prisma";
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import { formSchemaLogin } from "~/app/login/components/schema";
import { formSchemaCreateUser } from "~/app/dashboard/users/components/schema";
import { cookies } from "next/headers";
import { schemaCreateUserInput } from "./schemas/users";

export const registerHandler = async ({
  input,
}: {
  input: schemaCreateUserInput;
}) => {
  try {
    const hashedPassword = await bcrypt.hash(input.password, 12);
    await prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        password: hashedPassword,
        phone: input.phone,
        address: {
          create: {
            street: input.address.street,
            number: input.address.number,
            district: input.address.district,
            zipCode: input.address.zipCode,
            city: input.address.city,
            state: input.address.state,
            country: input.address.country,
          },
        },
      },
    });

    return {
      status: "success",
      code: "CREATED",
    };
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Email ja existente.",
      });
    }
  }

  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "Ocorreu um erro durante o registro.",
  });
};

export const loginHandler = async ({ input }: { input: formSchemaLogin }) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Email ou senha inválido.",
      });
    }

    const secret = process.env.JWT_SECRET!;
    const token = jwt.sign({ sub: user.id }, secret, {
      expiresIn: 60 * 60,
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
    };

    cookies().set("token", token, cookieOptions);

    return {
      status: "success",
      token,
    };
  } catch (error: any) {
    throw new error();
  }
};

export const logoutHandler = async () => {
  try {
    cookies().set("token", "", { maxAge: -1 });
    return { status: "success" };
  } catch (error: any) {
    throw error;
  }
};
