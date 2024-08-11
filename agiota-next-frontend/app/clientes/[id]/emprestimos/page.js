import Link from "next/link";
import { listarEmprestimosDeCliente } from "@/app/lib/funcoes.js";

export default async function EmprestimosDeCliente({params}) {
    const emprestimos = await listarEmprestimosDeCliente(params.id);
    if(emprestimos != null) {
      return (
        <main className="flex flex-col items-center">
         <h1>Lista de Empréstimos aceitos pelo Cliente {params.id}</h1>
          {
            emprestimos.map(emprestimo => {
              return <div key={emprestimo.id}>
                  {emprestimo.id} - Estado: {emprestimo.estado} - Empréstimo de R${emprestimo.valorEmprestado} com retorno mínimo de R${emprestimo.valorASerPago}
                  <Link href={`/clientes/${params.id}/emprestimos/${emprestimo.id}`}>| Detalhar Empréstimo </Link>
                </div>
             })
          }
        <Link href={`/clientes/${params.id}/emprestimos-publicos`}>| Veja a lista de Empréstimos Publicados! |</Link>
        </main>
      );
    } else {
      return (
        <main className="flex flex-col items-center">
            <h1>Empréstimos não encontrados.</h1>
        </main>
      )
    }
}