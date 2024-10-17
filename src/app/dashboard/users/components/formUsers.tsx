"use client";

import { useForm } from "react-hook-form";
import { FormContainer } from "~/components/globals/formContainer";
import { InputField } from "~/components/globals/inputField";
import { formSchemaCreateUser } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "~/utils/trpc";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function FormUsers() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const methods = useForm<formSchemaCreateUser>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
    resolver: zodResolver(formSchemaCreateUser),
  });

  const { mutate: registerUser } = trpc.registerUser.useMutation({
    onSettled: () => setSubmitting(false),
    onMutate: () => setSubmitting(true),
    onError: (error) => methods.reset({ password: "" }),
    onSuccess: () => {
      router.push("/dashboard/users");
    },
  });

  function onSubmit(data: formSchemaCreateUser) {
    const payload: Omit<formSchemaCreateUser, "confirmPassword"> = {
      name: data.name,
      email: data.email,
      password: data.password,
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
    <FormContainer<formSchemaCreateUser> form={methods} onSubmit={onSubmit}>
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
        label="Senha"
        name="password"
        placeholder="Senha"
      />
      <InputField
        control={methods.control}
        label="Confirmar Senha"
        name="confirmPassword"
        placeholder="Confirmar Senha"
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
