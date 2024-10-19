import { notFound, useRouter } from "next/navigation";
import React from "react";
import { ModalDelete } from "~/components/globals/modalDelete";
import { TextInLine } from "~/components/globals/textBody";
import { Button } from "~/components/ui/button";
import { trpc } from "~/utils/trpc";

export function ListTravelers() {
  const router = useRouter();
  const [openModalDeleteTraveler, setOpenModalDeleteTraveler] =
    React.useState(false);
  const [selectedTravelerId, setSelectedTravelerId] = React.useState<
    string | null
  >(null);
  const {
    data: ListTravelers,
    isLoading,
    isError,
    error,
    refetch: listUsersRefetch,
  } = trpc.getAllTravelers.useQuery(undefined, {
    suspense: true,
  });

  if (!ListTravelers) {
    return notFound();
  }

  const { mutate: deleteTraveler } = trpc.deleteTraveler.useMutation({
    onSuccess: () => {
      listUsersRefetch();
    },
    onError: (error) => {},
    onSettled: () => {
      setOpenModalDeleteTraveler(false);
    },
    onMutate: () => {
      setOpenModalDeleteTraveler(true);
    },
  });

  function handleModalDeleteTraveler(travelerId: string) {
    setSelectedTravelerId(travelerId);
    setOpenModalDeleteTraveler(true);
  }

  function deleteTravelerModal() {
    if (selectedTravelerId) {
      deleteTraveler({ id: selectedTravelerId });
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {!isLoading &&
        ListTravelers &&
        ListTravelers.data.map((traveler) => (
          <div
            key={traveler.email}
            className="flex flex-col gap-4 rounded-xl border-2 p-4"
          >
            <div>
              <TextInLine title={"Nome: "} value={traveler.name} />
              <TextInLine title={"Email: "} value={traveler.email} />
              <TextInLine title={"Telefone: "} value={traveler.phone} />
              <TextInLine
                title={"Rua: "}
                value={traveler.address?.street || "Não informado"}
              />
              <TextInLine
                title={"Número: "}
                value={traveler.address?.number || "Não informado"}
              />
              <TextInLine
                title={"Bairro: "}
                value={traveler.address?.district || "Não informado"}
              />
              <TextInLine
                title={"Cidade: "}
                value={traveler.address?.city || "Não informado"}
              />
            </div>
            <div className="flex items-center justify-end gap-4">
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  router.push(`/dashboard/travelers/edit/${traveler.id}`)
                }
              >
                Editar
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleModalDeleteTraveler(traveler.id)}
              >
                Deletar
              </Button>
            </div>
          </div>
        ))}
      <ModalDelete
        openModalDelete={openModalDeleteTraveler}
        setOpenModalDelete={setOpenModalDeleteTraveler}
        onConfirmDelete={deleteTravelerModal}
      />
    </div>
  );
}
