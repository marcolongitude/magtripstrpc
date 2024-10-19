import { notFound } from "next/navigation";
import { TextInLine } from "~/components/globals/textBody";
import { Button } from "~/components/ui/button";
import { trpc } from "~/utils/trpc";

export function ListUsers() {
  const {
    data: listUsers,
    isLoading,
    isError,
    error,
  } = trpc.getAllUsers.useQuery(undefined, {
    suspense: true,
  });

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
              <Button size="sm" variant="secondary" onClick={() => {}}>
                Editar
              </Button>
              <Button size="sm" variant="secondary" onClick={() => {}}>
                Deletar
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
}
