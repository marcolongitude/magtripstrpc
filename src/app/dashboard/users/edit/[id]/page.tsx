"use client";

import { useParams } from "next/navigation";
import { FormUsers } from "../components/formUsers";
import { trpc } from "~/utils/trpc";
import { Container } from "~/components/globals/container";

export default function EditTravelerPage() {
  const { id } = useParams();

  if (!id || Array.isArray(id)) return null;
  const { data: user } = trpc.getUserByid.useQuery({ id });

  return (
    <Container title="Editar usuários">
      {user && user.data && <FormUsers traveler={user?.data} />}
    </Container>
  );
}
