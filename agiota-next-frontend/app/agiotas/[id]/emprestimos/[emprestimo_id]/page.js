import Link from "next/link";
import { carregarEmprestimoDeAgiota } from "@/app/lib/funcoes";
import { carregarIdDeUsuarioPorEmail } from "@/app/lib/funcoes";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function FindEmprestimoDeAgiota({params}) {
    const session = await getServerSession(authOptions);
    const userId = await carregarIdDeUsuarioPorEmail(session?.user?.email);
    const emprestimo = await carregarEmprestimoDeAgiota(params.id, params.emprestimo_id);

    if (!session || !userId || userId != params.id) {
    redirect("/login");
  }
    if(emprestimo != null) {
      return (
        <main className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Dados do Empréstimo {emprestimo.id}</h1>
        <p className="text-lg mb-2">Valor emprestado: <span className="font-semibold">R$ {emprestimo.valorEmprestado.toFixed(2)}</span></p>
        <p className="text-lg mb-2">Valor a ser pago: <span className="font-semibold">R$ {emprestimo.valorASerPago.toFixed(2)}</span></p>
        <p className="text-lg mb-4">Estado de Publicação: <span className="font-semibold">{emprestimo.estado}</span></p>
        <div className="w-full max-w-2xl">
        {emprestimo.parcelas.map((parcela, index) => (
        <div key={index} className="bg-[#007ea7] text-white shadow-md rounded-lg p-4 mb-4">
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
        <Link href={`/agiotas/${params.id}/emprestimos/${params.emprestimo_id}/parcelas/${parcela.id}`} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-greenblue-600 no-underline">
        Ver Detalhes
        </Link>
        </div>
        ))}
        </div>
        {emprestimo.estado === "Em acordo" && (
        <Link href={`/agiotas/${params.id}/emprestimos/${params.emprestimo_id}/firmar-acordo`} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4">
        Fechar Acordo
        </Link>
        )}
        <Link href={`/agiotas/${params.id}/emprestimos/delete/${params.emprestimo_id}`} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 no-underline">
        Apagar
        </Link>
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
