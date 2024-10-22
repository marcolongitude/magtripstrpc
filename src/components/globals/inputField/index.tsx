import { type Control, type FieldValues, type Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

type InputProps<T extends FieldValues> = {
  name: Path<T>;
  placeholder: string;
  label: string;
  control: Control<T>;
};

export function InputField<T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
}: InputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
