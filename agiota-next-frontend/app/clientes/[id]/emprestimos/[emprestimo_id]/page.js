import Link from "next/link";
import { carregarEmprestimoDeCliente } from "@/app/lib/funcoes";
import { carregarIdDeUsuarioPorEmail } from "@/app/lib/funcoes";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function FindEmprestimoDeCliente({params}) {
    const session = await getServerSession(authOptions);
    const userId = await carregarIdDeUsuarioPorEmail(session?.user?.email);
    const emprestimo = await carregarEmprestimoDeCliente(params.id, params.emprestimo_id);

    if (!session || !userId) {
    redirect("/login");
  }
    if(emprestimo != null) {
      return (
        <main className="flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold mb-4">Dados do Empréstimo {emprestimo.id}</h1>
        <p className="text-lg mb-2">Valor emprestado: <span className="font-semibold">R$ {emprestimo.valorEmprestado.toFixed(2)}</span></p>
        <p className="text-lg mb-4">Valor a ser pago: <span className="font-semibold">R$ {emprestimo.valorASerPago.toFixed(2)}</span></p>
        {emprestimo.parcelas.map((parcela, index) => (
        <div key={index} className="bg-[#007ea7] text-white p-4 mb-4 w-full max-w-md rounded shadow">
        <h4 className="text-xl font-semibold mb-2">Parcela {index + 1}</h4>
        <div className="mb-2">
        <label className="font-medium">Valor a Ser Pago: R$ </label>
        <span>{parcela.valorASerPago.toFixed(2)}</span>
        </div>
        <div className="mb-2">
        <label className="font-medium">Taxa de Atraso: R$ </label>
        <span>{parcela.taxaDeAtraso.toFixed(2)}</span>
        </div>
        <div className="mb-2">
        <label className="font-medium">Data de Vencimento: </label>
        <span>{parcela.dataDeVencimento ? new Date(parcela.dataDeVencimento).toLocaleDateString() : 'Não definida'}</span>
        </div>
        <div className="mb-2">
        <label className="font-medium">Estado da Parcela: </label>
        <span>{parcela.estado}</span>
        </div>
        <Link href={`/clientes/${params.id}/emprestimos/${params.emprestimo_id}/parcelas/${parcela.id}`} className="bg-green-500 text-white py-2 px-8 rounded hover:bg-green-600 no-underline">
        Ver Detalhes
        </Link>
        </div>
        ))}
        </main>
      );
    } else {
      return (
        <main className="flex flex-col items-center">
            <h1>Empréstimo não encontrado.</h1>
        </main>
      )
    }
}
