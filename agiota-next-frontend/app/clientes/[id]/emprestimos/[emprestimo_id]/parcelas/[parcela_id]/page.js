import Link from "next/link";
import { carregarParcela } from "@/app/lib/funcoes";
import { carregarIdDeUsuarioPorEmail } from "@/app/lib/funcoes";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function CarregarParcela({params}) {
    const session = await getServerSession(authOptions);
    const userId = await carregarIdDeUsuarioPorEmail(session?.user?.email);
    const parcela = await carregarParcela(params.emprestimo_id, params.parcela_id);

    if (!session || !userId || userId != params.id) {
    redirect("/login");
  }
    if(parcela != null) {
      return (
        <main className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Dados da Parcela {parcela.id}</h1>
        <div className="bg-[#007ea7] text-white shadow-md rounded-lg p-6 w-full max-w-md">
        <p className="mb-2"><span className="font-semibold">Valor Emprestado:</span> {parcela.valorASerPago}</p>
        <p className="mb-2"><span className="font-semibold">Data de Vencimento:</span> {parcela.dataDeVencimento}</p>
        <p className="mb-2"><span className="font-semibold">Estado:</span> {parcela.estado}</p>
        {parcela.valorPago != 0 && (
        <p className="mb-2"><span className="font-semibold">Valor Devolvido:</span> {parcela.valorPago}</p>
        )}
        {parcela.dataDePagamento != null && (
        <p className="mb-2"><span className="font-semibold">Data de Pagamento:</span> {parcela.dataDePagamento}</p>
        )}
        {parcela.multa != null && (
        <p className="mb-2"><span className="font-semibold">Valor da multa:</span> {parcela.multa.valor}</p>
        )}
        <div className="flex justify-between mt-4">
        <Link href={`/clientes/${params.id}/emprestimos/${params.emprestimo_id}/parcelas/${params.parcela_id}/pagamento`} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 no-underline">
          Pagar Parcela
        </Link>
        <Link href={`/clientes/${params.id}/emprestimos/${params.emprestimo_id}/parcelas/${params.parcela_id}/lembrete`} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 no-underline">
          Gerar Lembrete
        </Link>
        </div>
        </div>
        </main>
      );
    } else {
      return (
        <main className="flex flex-col items-center">
            <h1>Parcelas não encontradas.</h1>
        </main>
      )
    }
}
