import { TRPCError, initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import { Context } from "./trpc-context";
import { trpc } from "./trpc";

export const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }

  return next();
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
