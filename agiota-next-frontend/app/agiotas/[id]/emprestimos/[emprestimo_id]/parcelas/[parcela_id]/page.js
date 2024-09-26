import { carregarParcela } from "@/app/lib/funcoes";
import { carregarIdDeUsuarioPorEmail } from "@/app/lib/funcoes";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function CarregarParcela({params}) {
    const session = await getServerSession(authOptions);
    const userId = await carregarIdDeUsuarioPorEmail(session?.user?.email);
    const parcela = await carregarParcela(params.emprestimo_id, params.parcela_id);

    if (!session || !userId) {
    redirect("/login");
  }
    if(parcela != null) {
      return (
        <main className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Dados da Parcela {parcela.id}</h1>
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
            <p className="text-lg mb-2"><strong>Valor Emprestado:</strong> {parcela.valorASerPago}</p>
            <p className="text-lg mb-2"><strong>Data de Vencimento:</strong> {parcela.dataDeVencimento}</p>
            <p className="text-lg mb-2"><strong>Estado:</strong> {parcela.estado}</p>
            {parcela.valorPago != 0 && (
            <p className="text-lg mb-2"><strong>Valor Devolvido:</strong> {parcela.valorPago}</p>
            )}
            {parcela.dataDePagamento != null && (
            <p className="text-lg mb-2"><strong>Data de Pagamento:</strong> {parcela.dataDePagamento}</p>
            )}
            {parcela.multa != null && (
            <p className="text-lg mb-2"><strong>Valor da multa:</strong> {parcela.multa.valor}</p>
            )}
        </div>
        </main>
      );
    } else {
      return (
        <main className="flex flex-col items-center">
            <h1>Parcela não encontrada.</h1>
        </main>
      )
    }
}
