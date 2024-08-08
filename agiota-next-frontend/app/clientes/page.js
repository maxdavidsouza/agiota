import Link from "next/link";
import { listarClientes } from "../lib/funcoes.js";

export default async function Cliente() {
    const clientes = await listarClientes();
      return (
        <main className="flex flex-col items-center">
         <h1>Lista de Clientes</h1>
          {
            clientes.map(cliente => {
              return <div key={cliente.id}>
                  {cliente.id} - {cliente.nome} ({cliente.login.email})
                  <Link href={`/clientes/${cliente.id}`}>Ver Perfil</Link>
                  <Link href={`/clientes/update/${cliente.id}`}>Atualizar</Link>
                  <Link href={`/clientes/delete/${cliente.id}`}>Remover</Link>
                </div>
             })
          }
        </main>
      );
    }