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

    if (!session || !userId || userId != params.id) {
    redirect("/login");
  }
    if(emprestimos != null) {
      return (
        <main className="flex flex-col items-center p-4">
          <h1 className="text-2xl font-bold mb-4">Lista de Empréstimos aceitos pelo Cliente {params.id}</h1>
          <div className="w-full max-w-4xl">
        {
          emprestimos.map(emprestimo => {
        return (
        <div key={emprestimo.id} className="border p-4 mb-4 rounded shadow-sm" style={{ backgroundColor: '#007ea7', color: 'white' }}>
        <p className="text-lg font-semibold">Empréstimo ID: {emprestimo.id}</p>
        <p>Estado: {emprestimo.estado}</p>
        <p>Empréstimo de R${emprestimo.valorEmprestado} com retorno mínimo de R${emprestimo.valorASerPago}</p>
        <Link href={`/clientes/${params.id}/emprestimos/${emprestimo.id}`} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 no-underline">Detalhar Empréstimo</Link>
        </div>
        );
          })
        }
          </div>
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
