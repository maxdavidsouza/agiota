import Link from "next/link";
import { listarEmprestimosDeCliente } from "@/app/lib/funcoes.js";
import { carregarIdDeUsuarioPorEmail } from "@/app/lib/funcoes";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function EmprestimosDeCliente({params}) {
    const session = await getServerSession(authOptions);
    const userId = await carregarIdDeUsuarioPorEmail(session?.user?.email);
    const emprestimos = await listarEmprestimosDeCliente(params.id);

    if (!session || !userId) {
    redirect("/login");
  }
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
