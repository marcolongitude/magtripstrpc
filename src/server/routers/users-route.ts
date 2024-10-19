import { z } from "zod";
import {
  protectedProcedure,
  publicProcedure,
  t,
} from "../../utils/trpc-server";
import {
  deleteUserhandler,
  editUsersHandler,
  getAllUsersHandler,
  getUserByid,
} from "../controllers/user-controller";
import {
  schemaCreateUserInput,
  schemaUserByIdInput,
  schemaGetUserInput,
  schemaEditUsersInput,
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
    .input(schemaUserByIdInput)
    .mutation(({ input }) => deleteUserhandler({ input })),
  getUserByid: protectedProcedure
    .input(schemaUserByIdInput)
    .output(
      z.object({
        status: z.string(),
        data: z.any(),
      }),
    )
    .query(({ input }) => getUserByid({ input })),

  editUser: protectedProcedure
    .output(
      z.object({
        status: z.string(),
      }),
    )
    .input(schemaEditUsersInput)
    .mutation(({ input }: { input: schemaEditUsersInput }) =>
      editUsersHandler({ input }),
    ),
});
