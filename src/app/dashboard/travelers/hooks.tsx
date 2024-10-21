import React from "react";
import { trpc } from "~/utils/trpc";

export function useTravelersFunctions() {
  const [selectedTravelerId, setSelectedTravelerId] = React.useState<
    string | null
  >(null);
  const [openModalDeleteTraveler, setOpenModalDeleteTraveler] =
    React.useState(false);

  function handleModalDeleteTraveler(travelerId: string) {
    setSelectedTravelerId(travelerId);
    setOpenModalDeleteTraveler(true);
  }

  const {
    data: ListTravelers,
    isLoading,
    isError,
    error,
    refetch: listUsersRefetch,
  } = trpc.getAllTravelers.useQuery(undefined, {
    suspense: true,
  });

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

  function deleteTravelerModal() {
    if (selectedTravelerId) {
      deleteTraveler({ id: selectedTravelerId });
    }
  }

  return {
    handleModalDeleteTraveler,
    selectedTravelerId,
    openModalDeleteTraveler,
    setSelectedTravelerId,
    setOpenModalDeleteTraveler,
    deleteTravelerModal,
    listUsersRefetch,
    isLoading,
    ListTravelers,
  };
}
