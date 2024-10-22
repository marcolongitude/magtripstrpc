"use client";

import { Container } from "~/components/globals/container";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { ListUsers } from "./listUsers";

export default function UsersPage() {
  const router = useRouter();
  return (
    <Container title="Usuários">
      <div className="flex justify-end">
        <Button
          variant={"default"}
          onClick={() => router.push("/dashboard/users/add")}
        >
          Adicionar usuário
        </Button>
      </div>
      <ListUsers />
    </Container>
  );
}
