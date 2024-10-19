import { notFound } from "next/navigation";
import { TextInLine } from "~/components/globals/textBody";
import { Button } from "~/components/ui/button";
import { trpc } from "~/utils/trpc";

export function ListTravelers() {
  const {
    data: ListTravelers,
    isLoading,
    isError,
    error,
  } = trpc.getAllTravelers.useQuery(undefined, {
    suspense: true,
  });

  if (!ListTravelers) {
    return notFound();
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
