import { useState } from "react";
import { trpc } from "~/utils/trpc";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchemaEditTraveler } from "./schema";

type Props = {
  traveler: formSchemaEditTraveler;
};

export function useTravelersEditFunctions({ traveler }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const { mutate: editTraveler } = trpc.editTraveler.useMutation({
    onSettled: () => setSubmitting(false),
    onMutate: () => setSubmitting(true),
    onError: (error) => console.error(error),
    onSuccess: () => {
      router.push("/dashboard/travelers");
    },
  });

  const methods = useForm<formSchemaEditTraveler>({
    defaultValues: {
      name: traveler.name || "",
      email: traveler.email,
      phone: traveler.phone,
      address: {
        street: traveler.address.street,
        number: traveler.address.number,
        district: traveler.address.district,
        zipCode: traveler.address.zipCode,
        city: traveler.address.city,
        state: traveler.address.state,
        country: traveler.address.country,
      },
    },
    resolver: zodResolver(formSchemaEditTraveler),
  });

  function onSubmit(data: formSchemaEditTraveler) {
    const payload: formSchemaEditTraveler = {
      id: traveler.id || "",
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: {
        street: data.address.street,
        number: data.address.number,
        district: data.address.district,
        zipCode: data.address.zipCode,
        city: data.address.city,
        state: data.address.state,
        country: data.address.country,
      },
    };
    editTraveler(payload);
  }

  return {
    editTraveler,
    methods,
    onSubmit,
  };
}
