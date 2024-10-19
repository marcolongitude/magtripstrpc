import { Container } from "~/components/globals/container";
import { FormTravelers } from "./components/formTravelers";

export default function AddTravelerPage() {
  return (
    <Container title="Adicionar viajante">
      <FormTravelers />
    </Container>
  );
}
