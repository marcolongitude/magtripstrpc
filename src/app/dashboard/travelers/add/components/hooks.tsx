import { useState } from "react";
import { trpc } from "~/utils/trpc";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { formSchemaCreateTraveler } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useAddTravelersFunctions() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const { mutate: registerUser } = trpc.registerTravelers.useMutation({
    onSettled: () => setSubmitting(false),
    onMutate: () => setSubmitting(true),
    onError: (error) => console.error(error),
    onSuccess: () => {
      router.push("/dashboard/travelers");
    },
  });

  const methods = useForm<formSchemaCreateTraveler>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: {
        street: "",
        number: "",
        district: "",
        zipCode: "",
        city: "",
        state: "",
        country: "",
      },
    },
    resolver: zodResolver(formSchemaCreateTraveler),
  });

  function onSubmit(data: formSchemaCreateTraveler) {
    const payload: Omit<formSchemaCreateTraveler, "confirmPassword"> = {
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
    registerUser(payload);
  }

  return {
    registerUser,
    methods,
    onSubmit,
  };
}
