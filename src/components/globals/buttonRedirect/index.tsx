"use client";

import { Button, ButtonProps } from "~/components/ui/button";
import { useRouter } from "next/navigation";

type ButtonRedirectProps = ButtonProps & {
  route: string;
  label: string;
};

export function ButtonRedirect({
  route,
  label,
  ...props
}: ButtonRedirectProps) {
  const router = useRouter();
  return (
    <Button variant={"default"} onClick={() => router.push(route)} {...props}>
      {label}
    </Button>
  );
}
