import { formSchemaCreateUser } from "~/app/dashboard/users/components/schema";
import { formSchemaLogin } from "~/app/login/components/schema";
import {
  loginHandler,
  logoutHandler,
  registerHandler,
} from "./auth-controller";
import {
  protectedProcedure,
  publicProcedure,
  t,
} from "../../utils/trpc-server";
import { z } from "zod";
import { schemaCreateUserInput } from "./schemas/users";

const authRouter = t.router({
  registerUser: publicProcedure
    .output(
      z.object({
        status: z.string(),
        code: z.string(),
      }),
    )
    .input(schemaCreateUserInput)
    .mutation(({ input }: { input: schemaCreateUserInput }) =>
      registerHandler({ input }),
    ),

  loginUser: publicProcedure
    .output(z.object({ token: z.string(), status: z.string() }))
    .input(formSchemaLogin)
    .mutation(({ input }: { input: formSchemaLogin }) =>
      loginHandler({ input }),
    ),

  logoutUser: protectedProcedure.mutation(() => logoutHandler()),
});

export default authRouter;
