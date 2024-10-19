import { TRPCError } from "@trpc/server";
import type { Context } from "../../utils/trpc-context";
import { prisma } from "~/lib/prisma";
import { schemaDeleteUserInput } from "../schemas/users";

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
  input: schemaDeleteUserInput;
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
