"use client";

import { FormContainer } from "~/components/globals/formContainer";
import { InputField } from "~/components/globals/inputField";
import { formSchemaEditTraveler } from "./schema";

import { useState } from "react";
import { useTravelersEditFunctions } from "./hooks";

type FormTravelersProps = {
  traveler: formSchemaEditTraveler;
};

export function FormTravelers({ traveler }: FormTravelersProps) {
  const { editTraveler, methods, onSubmit } = useTravelersEditFunctions({
    traveler,
  });

  return (
    <FormContainer<formSchemaEditTraveler> form={methods} onSubmit={onSubmit}>
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
