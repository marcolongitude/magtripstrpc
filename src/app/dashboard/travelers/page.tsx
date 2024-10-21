import { Container } from "~/components/globals/container";

import { ListTravelers } from "./listTravelers";
import ErrorBoundary from "./error";
import { ButtonRedirect } from "~/components/globals/buttonRedirect";

export default function TravelersPage() {
  return (
    <Container title="Viajantes">
      <div className="flex justify-end">
        <ButtonRedirect
          label="Adicionar viajantes"
          route="/dashboard/travelers/add"
        />
      </div>
      <ErrorBoundary>
        <ListTravelers />
      </ErrorBoundary>
    </Container>
  );
}
