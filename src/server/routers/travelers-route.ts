import { z } from "zod";
import { protectedProcedure, t } from "../../utils/trpc-server";
import {
  schemaCreateTravelersInput,
  schemaDeleteTravelersInput,
  schemaGetTravelersInput,
} from "../schemas/travelers";
import {
  createTravelersHandler,
  deleteTravelersHandler,
  getAllTravelersHandler,
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
    .input(schemaDeleteTravelersInput)
    .mutation(({ input }: { input: schemaDeleteTravelersInput }) =>
      deleteTravelersHandler({ input }),
    ),
});
