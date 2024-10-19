import { z } from "zod";
import {
  protectedProcedure,
  publicProcedure,
  t,
} from "../../utils/trpc-server";
import {
  deleteUserhandler,
  getAllUsersHandler,
} from "../controllers/user-controller";
import {
  schemaCreateUserInput,
  schemaDeleteUserInput,
  schemaGetUserInput,
} from "../schemas/users";

export const usersRouter = t.router({
  getAllUsers: protectedProcedure
    .output(
      z.object({
        status: z.string(),
        data: z.array(schemaGetUserInput),
      }),
    )
    .query(() => getAllUsersHandler()),
  deleteUser: protectedProcedure
    .output(
      z.object({
        status: z.string(),
      }),
    )
    .input(schemaDeleteUserInput)
    .mutation(({ input }) => deleteUserhandler({ input })),
});
