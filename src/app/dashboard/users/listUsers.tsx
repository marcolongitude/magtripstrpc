"use client";

import { notFound } from "next/navigation";
import { TextInLine } from "~/components/globals/textBody";
import { Button } from "~/components/ui/button";

import React from "react";
import { ModalDelete } from "../../../components/globals/modalDelete";
import { useUsersFunctions } from "./hooks";
import { ButtonRedirect } from "~/components/globals/buttonRedirect";

export function ListUsers() {
  const {
    handleModalDeleteUser,
    openModalDeleteUser,
    setOpenModalDeleteUser,
    listUsers,
    isLoading,
    deleteUserModal,
  } = useUsersFunctions();

  if (!listUsers) {
    return notFound();
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {!isLoading &&
        listUsers &&
        listUsers.data.map((user) => (
          <div
            key={user.email}
            className="flex flex-col gap-4 rounded-xl border-2 p-4"
          >
            <div>
              <TextInLine title={"Id: "} value={user.id} />
              <TextInLine title={"Nome: "} value={user.name} />
              <TextInLine title={"Email: "} value={user.email} />
              <TextInLine title={"Telefone: "} value={user.phone} />
              <TextInLine
                title={"Rua: "}
                value={user.address?.street || "Não informado"}
              />
              <TextInLine
                title={"Número: "}
                value={user.address?.number || "Não informado"}
              />
              <TextInLine
                title={"Bairro: "}
                value={user.address?.district || "Não informado"}
              />
              <TextInLine
                title={"Cidade: "}
                value={user.address?.city || "Não informado"}
              />
            </div>
            <div className="flex items-center justify-end gap-4">
              <ButtonRedirect
                route={`/dashboard/users/edit/${user.id}`}
                label="Editar"
              />
              <Button
                onClick={() => handleModalDeleteUser(user.id)}
                size="sm"
                variant="default"
              >
                Deletar
              </Button>
            </div>
          </div>
        ))}
      <ModalDelete
        openModalDelete={openModalDeleteUser}
        setOpenModalDelete={setOpenModalDeleteUser}
        onConfirmDelete={deleteUserModal}
      />
    </div>
  );
}
