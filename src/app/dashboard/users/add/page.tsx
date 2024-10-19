import { Container } from "~/components/globals/container";
import { FormUsers } from "./components/formUsers";

export default function AddUserPage() {
  return (
    <Container title="Adicionar usuário">
      <FormUsers />
    </Container>
  );
}
