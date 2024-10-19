"use client";

import { Container } from "~/components/globals/container";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { ListTravelers } from "./listTravelers";

export default function TravelersPage() {
  const router = useRouter();
  return (
    <Container title="Viajantes">
      <div className="flex justify-end">
        <Button
          variant={"default"}
          onClick={() => router.push("/dashboard/travelers/add")}
        >
          Adicionar viajantes
        </Button>
      </div>
      <ListTravelers />
    </Container>
  );
}
