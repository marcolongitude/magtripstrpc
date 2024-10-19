"use client";

import { useParams } from "next/navigation";
import { FormTravelers } from "../components/formTravelers";
import { trpc } from "~/utils/trpc";
import { Container } from "~/components/globals/container";

export default function EditTravelerPage() {
  const { id } = useParams();

  if (!id || Array.isArray(id)) return null;
  const { data: traveler } = trpc.getTravelerByid.useQuery({ id });

  return (
    <Container title="Editar viajante">
      {traveler && traveler.data && <FormTravelers traveler={traveler?.data} />}
    </Container>
  );
}
