import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

export const authOptions = {
  debug: true,
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_FRONTEND_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_FRONTEND_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      // Passar as roles do token JWT para a sessão
      session.user = token.user || null;
      session.roles = token.roles || [];
      return session;
    },
    async jwt({ token, user, account }) {
      // Se o usuário acabou de se autenticar, incluir as roles do token JWT
      if (account && user) {
        const accessToken = account.access_token;
        const decodedToken = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());

        // Pegar as roles específicas do cliente (agiota-frontend)
        const clientRoles = decodedToken.resource_access?.['agiota-frontend']?.roles || [];
        
        // Adicionar as roles do cliente ao token
        token.roles = clientRoles;

        // Adicionar usuário ao token
        token.user = user;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
