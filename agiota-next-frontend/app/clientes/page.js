import Link from "next/link";
import { listarClientes } from "../lib/funcoes.js";

export default async function Cliente() {
    const clientes = await listarClientes();
      return (
        
        <main className="flex flex-col items-center">
         <h1>Lista de Clientes</h1>
          {
            clientes.map(cliente => {
              return <div button className="bg-gray-800 text-white py-2 px-2 rounded" key={cliente.id}>
                {cliente.endereco.id} - {cliente.nome} ({cliente.login.email})
                  <Link className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-600" 
                          href={`/cliente/update/${cliente.id}`}>Atualizar</Link>
                  <Link className="bg-red-800 text-white py-2 px-4 rounded hover:bg-red-600" 
                          href={`/cliente/delete/${cliente.id}`}>Remover</Link>
                </div>
             })
          }
        </main>
      );
    }