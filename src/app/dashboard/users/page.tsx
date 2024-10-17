"use client";

import { Container } from "~/components/globals/container";
import { FormUsers } from "./components/formUsers";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const router = useRouter();
  return (
    <Container title="Usuários">
      <div>
        <Button
          variant={"default"}
          onClick={() => router.push("/dashboard/users/add")}
        >
          Adicionar usuário
        </Button>
      </div>
    </Container>
  );
}
