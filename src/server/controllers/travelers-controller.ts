import { TRPCError } from "@trpc/server";
import {
  schemaCreateTravelersInput,
  schemaEditTravelersInput,
  schemaGetTravelersInput,
  schemaTravelersByIdInput,
} from "../schemas/travelers";
import { prisma } from "~/lib/prisma";

export const createTravelersHandler = async ({
  input,
}: {
  input: schemaCreateTravelersInput;
}) => {
  try {
    await prisma.travelers.create({
      data: {
        email: input.email,
        name: input.name,
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
        message: "Viajante já cadastrado.",
      });
    }
  }

  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "Ocorreu um erro durante o registro.",
  });
};

export const getAllTravelersHandler = async () => {
  try {
    const travelers = await prisma.travelers.findMany({
      include: {
        address: true,
      },
    });

    const travelersWithoutAddressId = travelers.map((traveler) => {
      const { addressId, ...rest } = traveler;
      return rest;
    });

    return {
      status: "success",
      data: travelersWithoutAddressId,
    };
  } catch (error: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }
};

export const deleteTravelersHandler = async ({
  input,
}: {
  input: schemaTravelersByIdInput;
}) => {
  try {
    await prisma.travelers.delete({
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

export const getTravelerByid = async ({
  input,
}: {
  input: schemaTravelersByIdInput;
}) => {
  try {
    const traveler = await prisma.travelers.findUnique({
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

export const editTravelersHandler = async ({
  input,
}: {
  input: schemaEditTravelersInput;
}) => {
  try {
    const traveler = await prisma.travelers.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!traveler) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Viajante não encontrado.",
      });
    }

    await prisma.travelers.update({
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
