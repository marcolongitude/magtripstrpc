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

const authRouter = t.router({
  registerUser: publicProcedure
    .input(formSchemaCreateUser)
    .mutation(({ input }: { input: formSchemaCreateUser }) =>
      registerHandler({ input }),
    ),

  loginUser: publicProcedure
    .input(formSchemaLogin)
    .mutation(({ input }: { input: formSchemaLogin }) =>
      loginHandler({ input }),
    ),

  logoutUser: protectedProcedure.mutation(() => logoutHandler()),
});

export default authRouter;
