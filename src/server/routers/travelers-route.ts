import { z } from "zod";
import { protectedProcedure, t } from "../../utils/trpc-server";
import {
  schemaCreateTravelersInput,
  schemaTravelersByIdInput,
  schemaGetTravelersInput,
  schemaEditTravelersInput,
} from "../schemas/travelers";
import {
  createTravelersHandler,
  deleteTravelersHandler,
  editTravelersHandler,
  getAllTravelersHandler,
  getTravelerByid,
} from "../controllers/travelers-controller";

export const travelersRouter = t.router({
  registerTravelers: protectedProcedure
    .output(
      z.object({
        status: z.string(),
        code: z.string(),
      }),
    )
    .input(schemaCreateTravelersInput)
    .mutation(({ input }: { input: schemaCreateTravelersInput }) =>
      createTravelersHandler({ input }),
    ),
  getAllTravelers: protectedProcedure
    .output(
      z.object({
        status: z.string(),
        data: z.array(schemaGetTravelersInput),
      }),
    )
    .query(() => getAllTravelersHandler()),
  deleteTraveler: protectedProcedure
    .output(
      z.object({
        status: z.string(),
      }),
    )
    .input(schemaTravelersByIdInput)
    .mutation(({ input }: { input: schemaTravelersByIdInput }) =>
      deleteTravelersHandler({ input }),
    ),

  getTravelerByid: protectedProcedure
    .input(schemaTravelersByIdInput)
    .output(
      z.object({
        status: z.string(),
        data: z.any(),
      }),
    )
    .query(({ input }) => getTravelerByid({ input })),

  editTraveler: protectedProcedure
    .output(
      z.object({
        status: z.string(),
      }),
    )
    .input(schemaEditTravelersInput)
    .mutation(({ input }: { input: schemaEditTravelersInput }) =>
      editTravelersHandler({ input }),
    ),
});
