"use client";

import { useForm } from "react-hook-form";
import { FormContainer } from "~/components/globals/formContainer";
import { InputField } from "~/components/globals/inputField";
import { formSchemaCreateUser } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function FormUsers() {
  const form = useForm<formSchemaCreateUser>({
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

  // const createUsers = api.users.create.useMutation({
  //   onSuccess: (data) => {
  //     return data;
  //   },
  // });

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
    // createUsers.mutate(payload);
  }

  return (
    <FormContainer<formSchemaCreateUser> form={form} onSubmit={onSubmit}>
      <InputField
        control={form.control}
        label="Nome"
        name="name"
        placeholder="Nome"
      />
      <InputField
        control={form.control}
        label="e-mail"
        name="email"
        placeholder="e-mail"
      />
      <InputField
        control={form.control}
        label="Telefone"
        name="phone"
        placeholder="Telefone"
      />
      <InputField
        control={form.control}
        label="Senha"
        name="password"
        placeholder="Senha"
      />
      <InputField
        control={form.control}
        label="Confirmar Senha"
        name="confirmPassword"
        placeholder="Confirmar Senha"
      />
      <InputField
        control={form.control}
        label="Rua/Avenida"
        name="address.street"
        placeholder="Rua/Avenida"
      />
      <InputField
        control={form.control}
        label="Número"
        name="address.number"
        placeholder="Número"
      />
      <InputField
        control={form.control}
        label="Bairro"
        name="address.district"
        placeholder="Bairro"
      />
      <InputField
        control={form.control}
        label="CEP"
        name="address.zipCode"
        placeholder="CEP"
      />
      <InputField
        control={form.control}
        label="Cidade"
        name="address.city"
        placeholder="Cidade"
      />
      <InputField
        control={form.control}
        label="Estado"
        name="address.state"
        placeholder="Estado"
      />
      <InputField
        control={form.control}
        label="País"
        name="address.country"
        placeholder="País"
      />
    </FormContainer>
  );
}
