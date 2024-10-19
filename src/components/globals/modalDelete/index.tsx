import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

type ModalDeleteProps = {
  openModalDelete: boolean;
  setOpenModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirmDelete: () => void;
};

export function ModalDelete({
  openModalDelete,
  setOpenModalDelete,
  onConfirmDelete,
}: ModalDeleteProps) {
  return (
    <Dialog open={openModalDelete} onOpenChange={setOpenModalDelete}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deseja realmente excluir o usuário?</DialogTitle>
          <DialogDescription>
            <div className="m-4">
              <span>
                Esta ação não pode ser desfeita. Isso excluirá permanentemente
                os dados selecionados de nosso servidor.
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"destructive"}
            size={"sm"}
            onClick={() => setOpenModalDelete(false)}
          >
            Cancelar
          </Button>
          <Button variant="default" size="sm" onClick={onConfirmDelete}>
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
