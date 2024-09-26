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
            return (
            <div key={emprestimo.id} className="bg-blue-500 shadow-md rounded-lg p-4 m-4 w-full max-w-md">
            <h2 className="text-xl font-bold mb-2">Empréstimo {emprestimo.id}</h2>
            <p className="text-black-700 mb-2">Estado: {emprestimo.estado}</p>
            <p className="text-black-700 mb-2">Valor Emprestado: R${emprestimo.valorEmprestado}</p>
            <p className="text-black-700 mb-4">Valor a Ser Pago: R${emprestimo.valorASerPago}</p>
            <div className="flex justify-between">
            <Link href={`/agiotas/${params.id}/emprestimos/${emprestimo.id}`} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 no-underline">Detalhar Empréstimo</Link>
            {emprestimo.estado === "Em acordo" && (
            <Link href={`/agiotas/${params.id}/emprestimos/${emprestimo.id}/firmar-acordo`} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 no-underline">Firmar Acordo</Link>
            )}
            <Link href={`/agiotas/${params.id}/emprestimos/delete/${emprestimo.id}`} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 no-underline">Apagar</Link>
            </div>
            </div>
            );
         })
          }
          <Link href={`/agiotas/${params.id}/emprestimos/create`} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4 no-underline">Registrar novo Empréstimo</Link>
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
