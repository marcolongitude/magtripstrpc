import { Container } from "~/components/globals/container";
import { FormUsers } from "./components/formUsers";
// import { ErrorBoundary } from "react-error-boundary";

// function FallbackRender({ error, resetErrorBoundary }: ) {
//   // Call resetErrorBoundary() to reset the error boundary and retry the render.

//   console.log("error", error, resetErrorBoundary);

//   return (
//     <div role="alert">
//       <p>Something went wrong:</p>
//       <pre style={{ color: "red" }}>{error.message}</pre>
//     </div>
//   );
// }

export default function AddUserPage() {
  return (
    <Container title="Adicionar usuário">
      {/* <ErrorBoundary fallback={<FallbackRender />}> */}
      <FormUsers />
      {/* </ErrorBoundary> */}
    </Container>
  );
}
