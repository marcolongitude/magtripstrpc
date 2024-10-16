// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// export function middleware(req: NextRequest) {
//   console.log("middleware");
//   // Verifica se a rota começa com "/dashboard"
//   if (req.nextUrl.pathname.startsWith("/dashboard")) {
//     const token = req.headers.get("Authorization");

//     // Verifica se o token está presente
//     if (!token) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }

//     // Lógica de validação do token (simplesmente um exemplo fictício)
//     const isValid = validateToken(token);

//     if (!isValid) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }

//   // Continua para a rota original se o token for válido
//   return NextResponse.next();
// }

// // Função fictícia para validação do token
// const validateToken = (token: string) => {
//   // Lógica de validação do token (por exemplo, JWT decode/verify)
//   return jwt.verify(token, "secret");
// };

// export const config = {
//   matcher: ["/dashboard/:path*"], // Middleware vai rodar para todas as rotas que começam com "/dashboard"
// };
