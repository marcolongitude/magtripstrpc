import { HydrateClient } from "~/trpc/server";
import { FormLogin } from "./components/formLogin";

export default function LoginPage() {
  return (
    <div className="align-center flex h-screen w-screen flex-1 items-center justify-center">
      <div className="ml-10 mr-10 w-full max-w-lg rounded-lg border border-gray-300 bg-white p-6 sm:p-8">
        <div className="mb-8 flex w-full justify-center">
          <span className="text-2xl font-bold">MAG - TRIPS</span>
        </div>
        <div>
          <FormLogin />
        </div>
      </div>
    </div>
  );
}
