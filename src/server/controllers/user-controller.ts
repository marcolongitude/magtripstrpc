import { TRPCError } from "@trpc/server";
import type { Context } from "../../utils/trpc-context";
import { prisma } from "~/lib/prisma";
import { schemaEditUsersInput, schemaUserByIdInput } from "../schemas/users";

export const getUserHandler = ({ ctx }: { ctx: Context }) => {
  try {
    const user = ctx.user;
    return {
      status: "success",
      data: {
        user,
      },
    };
  } catch (error: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }
};

export const getAllUsersHandler = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        address: true,
      },
    });

    const usersWithoutAddress = users.map((user) => {
      const { addressId, password, ...rest } = user;
      return rest;
    });

    return {
      status: "success",
      data: usersWithoutAddress,
    };
  } catch (error: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }
};

export const deleteUserhandler = async ({
  input,
}: {
  input: schemaUserByIdInput;
}) => {
  try {
    await prisma.user.delete({
      where: {
        id: input.id,
      },
    });
    return {
      status: "success",
    };
  } catch (error: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }
};

export const getUserByid = async ({
  input,
}: {
  input: schemaUserByIdInput;
}) => {
  try {
    const traveler = await prisma.user.findUnique({
      where: {
        id: input.id,
      },
      include: {
        address: true,
      },
    });

    if (!traveler) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Viajante não encontrado.",
      });
    }

    const { addressId, ...rest } = traveler;
    return {
      status: "success",
      data: rest,
    };
  } catch (error: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }
};

export const editUsersHandler = async ({
  input,
}: {
  input: schemaEditUsersInput;
}) => {
  try {
    const traveler = await prisma.user.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!traveler) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Usuário não encontrado.",
      });
    }

    await prisma.user.update({
      where: {
        id: input.id,
      },
      data: {
        email: input.email,
        name: input.name,
        phone: input.phone,
        address: {
          update: {
            street: input?.address.street,
            number: input?.address.number,
            district: input?.address.district,
            zipCode: input?.address.zipCode,
            city: input?.address.city,
            state: input?.address.state,
            country: input?.address.country,
          },
        },
      },
    });

    return {
      status: "success",
    };
  } catch (error: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }
};
