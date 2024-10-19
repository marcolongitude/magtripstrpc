"use client";

import { useForm } from "react-hook-form";
import { FormContainer } from "~/components/globals/formContainer";
import { InputField } from "~/components/globals/inputField";
import { formSchemaEditUser } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "~/utils/trpc";
import { useState } from "react";
import { useRouter } from "next/navigation";

type FormTravelersProps = {
  traveler: formSchemaEditUser;
};

export function FormUsers({ traveler }: FormTravelersProps) {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const methods = useForm<formSchemaEditUser>({
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
    resolver: zodResolver(formSchemaEditUser),
  });

  const { mutate: editUser } = trpc.editUser.useMutation({
    onSettled: () => setSubmitting(false),
    onMutate: () => setSubmitting(true),
    onError: (error) => console.error(error),
    onSuccess: () => {
      router.push("/dashboard/users");
    },
  });

  function onSubmit(data: formSchemaEditUser) {
    const payload: formSchemaEditUser = {
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
    editUser(payload);
  }

  console.log(methods.formState.errors);

  return (
    <FormContainer<formSchemaEditUser> form={methods} onSubmit={onSubmit}>
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
