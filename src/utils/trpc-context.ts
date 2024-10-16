import { deserializeUser } from "~/server/routers/auth-middleware";
// import { inferAsyncReturnType } from "@trpc/server";

export const createContext = async () => deserializeUser();

export type Context = Awaited<ReturnType<typeof createContext>>;
