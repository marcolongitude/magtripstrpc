"use client";

import { Button } from "~/components/ui/button";

import { useRouter } from "next/navigation";
export function ButtonRedirect() {
  const router = useRouter();
  return (
    <div className="flex justify-end">
      <Button
        variant={"default"}
        onClick={() => router.push("/dashboard/travelers/add")}
      >
        Adicionar viajantes
      </Button>
    </div>
  );
}
