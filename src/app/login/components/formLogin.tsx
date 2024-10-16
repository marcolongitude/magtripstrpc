"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Form } from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { InputField } from "~/components/globals/inputField";
import { LogIn } from "lucide-react";
import { formSchemaLogin } from "./schema";
import { useRouter } from "next/navigation";
import { trpc } from "~/utils/trpc";
import { useState } from "react";

export function FormLogin() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchemaLogin),
  });

  const { mutate: loginFn } = trpc.loginUser.useMutation({
    onSettled: () => setSubmitting(false),
    onMutate: () => setSubmitting(true),
    onError: (error) => methods.reset({ password: "" }),
    onSuccess: () => {
      router.push("/dashboard/users");
    },
  });

  const onSubmitHandler: SubmitHandler<formSchemaLogin> = (values) => {
    loginFn(values);
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <InputField
              control={methods.control}
              name="email"
              placeholder="E-mail"
              label="E-mail"
            />
            <InputField
              control={methods.control}
              name="password"
              placeholder="Senha"
              label="Senha"
            />
          </div>
          <div className="flex flex-row justify-end">
            <Button type="submit">
              Salvar <LogIn size="16" className="ml-4" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
