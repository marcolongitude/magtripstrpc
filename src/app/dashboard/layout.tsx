import { Suspense } from "react";
import { Sidebar } from "~/components/globals/sidebar/sidebar";
import Loading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-row">
      {/* Sidebar */}
      <div className="mx-5 mt-16 sm:ml-[270px] sm:mt-3">
        <Sidebar />
      </div>

      {/* Content (children) */}
      <Suspense fallback={<Loading />}>
        <div className="w-full md:w-[calc(100%-270px)]">{children}</div>
      </Suspense>
    </div>
  );
}
