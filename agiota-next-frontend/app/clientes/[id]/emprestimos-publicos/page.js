import Link from "next/link";
import { listarEmprestimosPublicos } from "@/app/lib/funcoes.js";
import { carregarIdDeUsuarioPorEmail } from "@/app/lib/funcoes";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function EmprestimosPublicos({params}) {
  const session = await getServerSession(authOptions);
    const userId = await carregarIdDeUsuarioPorEmail(session?.user?.email);
    const emprestimos = await listarEmprestimosPublicos(params.id);

    if (!session || !userId || userId != params.id) {
    redirect("/login");
  }
    if(emprestimos != null) {
      return (
        <main className="flex flex-col items-center">
         <h1>Lista de Empréstimos publicados por Agiotas</h1>
          {
            emprestimos.map(emprestimo => {
                return (
                <div key={emprestimo.id} className="bg-[#007ea7] shadow-md rounded-lg p-4 m-4 w-full max-w-md text-white">
                  <p><strong>Estado:</strong> {emprestimo.estado}</p>
                  <p><strong>Empréstimo:</strong> R${emprestimo.valorEmprestado}</p>
                  <p><strong>Retorno Mínimo:</strong> R${emprestimo.valorASerPago}</p>
                  <Link href={`/clientes/${params.id}/emprestimos-publicos/${emprestimo.id}`}>
                  <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
                  Detalhar Empréstimo
                  </button>
                  </Link>
                </div>
                );
             })
          }
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
