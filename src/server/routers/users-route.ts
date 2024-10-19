import { z } from "zod";
import {
  protectedProcedure,
  publicProcedure,
  t,
} from "../../utils/trpc-server";
import { getAllUsersHandler } from "../controllers/user-controller";
import { schemaCreateUserInput, schemaGetUserInput } from "../schemas/users";

export const usersRouter = t.router({
  getAllUsers: protectedProcedure
    .output(
      z.object({
        status: z.string(),
        data: z.array(schemaGetUserInput),
      }),
    )
    .query(() => getAllUsersHandler()),
});
