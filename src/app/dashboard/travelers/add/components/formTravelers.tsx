"use client";

import { useForm } from "react-hook-form";
import { FormContainer } from "~/components/globals/formContainer";
import { InputField } from "~/components/globals/inputField";
import { formSchemaCreateTraveler } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "~/utils/trpc";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function FormTravelers() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
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

  const { mutate: registerUser } = trpc.registerTravelers.useMutation({
    onSettled: () => setSubmitting(false),
    onMutate: () => setSubmitting(true),
    onError: (error) => console.error(error),
    onSuccess: () => {
      router.push("/dashboard/travelers");
    },
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

  return (
    <FormContainer<formSchemaCreateTraveler> form={methods} onSubmit={onSubmit}>
      <InputField
        control={methods.control}
        label="Nome"
        name="name"
        placeholder="Nome"
      />
      <InputField
        control={methods.control}
        label="e-mail"
        name="email"
        placeholder="e-mail"
      />
      <InputField
        control={methods.control}
        label="Telefone"
        name="phone"
        placeholder="Telefone"
      />
      <InputField
        control={methods.control}
        label="Rua/Avenida"
        name="address.street"
        placeholder="Rua/Avenida"
      />
      <InputField
        control={methods.control}
        label="Número"
        name="address.number"
        placeholder="Número"
      />
      <InputField
        control={methods.control}
        label="Bairro"
        name="address.district"
        placeholder="Bairro"
      />
      <InputField
        control={methods.control}
        label="CEP"
        name="address.zipCode"
        placeholder="CEP"
      />
      <InputField
        control={methods.control}
        label="Cidade"
        name="address.city"
        placeholder="Cidade"
      />
      <InputField
        control={methods.control}
        label="Estado"
        name="address.state"
        placeholder="Estado"
      />
      <InputField
        control={methods.control}
        label="País"
        name="address.country"
        placeholder="País"
      />
    </FormContainer>
  );
}
