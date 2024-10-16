import { ArrowBigLeft, Save } from "lucide-react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";

type FormContainerProps<T extends FieldValues> = {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
};

export function FormContainer<T extends FieldValues>({
  children,
  form,
  onSubmit,
}: FormContainerProps<T>) {
  return (
    <div className="mx-5 max-w-full rounded-lg border border-gray-300 p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {children}
          </div>
          <div className="mt-6 flex h-full flex-row justify-end gap-8">
            <Button variant="secondary" type="submit">
              <ArrowBigLeft size="20" className="mr-4" /> Cancelar
            </Button>
            <Button type="submit">
              Salvar <Save size="16" className="ml-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
