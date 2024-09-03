'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div>
        <h1>
            Seu acesso está bloqueado.
        </h1>
      <div>
        <button onClick={() => signIn('keycloak')}>Entre com um Usuário do Keycloak</button>
      </div>
    </div>
  );
}
