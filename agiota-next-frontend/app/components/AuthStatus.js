"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function AuthStatus() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading" && session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/" });
    }
  }, [session, status]);

  if (status === "loading") {
    return <div>Carregando...</div>;
  }

  if (session) {
    return (
      <div>
        <button
          onClick={() => {
            signOut({ callbackUrl: "/" }); // Logout e redireciona para a URL especificada
          }}
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => {
          signOut({ redirect: false }); // Logout sem redirecionamento automático
          signIn("keycloak"); // Força o login novamente
        }}
      >
        Entrar
      </button>
    </div>
  );
}