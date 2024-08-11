import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sistema Agiota",
  description: "Criado pelo Next JS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav>
            <a href="/">Página Principal</a>
            <a href="/agiotas/create">Cadastrar agiota</a>
            <a href="/clientes/create">Cadastrar cliente</a>
            <a href="/agiotas">Ver agiotas</a>
            <a href="/clientes">Ver clientes</a>
          </nav>
        </header>
        {children}
        <footer>
          <p>&copy; 2024 UFAPE. Todos os direitos reservados.</p>
        </footer>
      </body>
    </html>
  );
}
