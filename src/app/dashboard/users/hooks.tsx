import React from "react";
import { trpc } from "~/utils/trpc";

export function useUsersFunctions() {
  const [openModalDeleteUser, setOpenModalDeleteUser] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(
    null,
  );

  function handleModalDeleteUser(userId: string) {
    setSelectedUserId(userId);
    setOpenModalDeleteUser(true);
  }

  const {
    data: listUsers,
    isLoading,
    isError,
    error,
    refetch: listUsersRefetch,
  } = trpc.getAllUsers.useQuery(undefined, {
    trpc: {
      context: {
        deserializeUser: true,
      },
    },
    suspense: true,
  });

  const { mutate: deleteUser } = trpc.deleteUser.useMutation({
    onSuccess: async () => {
      setOpenModalDeleteUser(false);
      listUsersRefetch();
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      setSelectedUserId(null);
    },
    onMutate: () => {
      setSelectedUserId(null);
    },
  });

  function deleteUserModal() {
    if (selectedUserId) {
      deleteUser({ id: selectedUserId });
    }
  }

  return {
    handleModalDeleteUser,
    selectedUserId,
    openModalDeleteUser,
    setSelectedUserId,
    setOpenModalDeleteUser,
    deleteUserModal,
    listUsers,
    isLoading,
  };
}
