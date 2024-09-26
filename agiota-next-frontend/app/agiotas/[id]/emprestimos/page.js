import Link from "next/link";
import { listarEmprestimosDeAgiota } from "@/app/lib/funcoes.js";
import { carregarIdDeUsuarioPorEmail } from "@/app/lib/funcoes";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function EmprestimosDeAgiota({params}) {
  const session = await getServerSession(authOptions);
  const userId = await carregarIdDeUsuarioPorEmail(session?.user?.email);
  const emprestimos = await listarEmprestimosDeAgiota(params.id);

  if (!session || !userId) {
    redirect("/login");
  }
    if(emprestimos != null) {
      return (
        <main className="flex flex-col items-center">
         <h1>Lista de Empréstimos oferecidos pelo Agiota {params.id}</h1>
          {
            emprestimos.map(emprestimo => {
              return <div key={emprestimo.id}>
                  {emprestimo.id} - Estado: {emprestimo.estado} - Empréstimo de R${emprestimo.valorEmprestado} com retorno mínimo de R${emprestimo.valorASerPago}
                  <Link href={`/agiotas/${params.id}/emprestimos/${emprestimo.id}`}>| Detalhar Empréstimo </Link>
                  {emprestimo.estado === "Em acordo" && (
                    <Link href={`/agiotas/${params.id}/emprestimos/${emprestimo.id}/firmar-acordo`}>| Fechar Acordo </Link>
                  )}
                  <Link href={`/agiotas/${params.id}/emprestimos/delete/${emprestimo.id}`}>| Apagar |</Link>
                </div>
             })
          }
          <Link href={`/agiotas/${params.id}/emprestimos/create`}>| Registrar novo Empréstimo |</Link>
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
