import Link from "next/link";
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
        <main className="flex flex-col items-center">
            <h1>Dados da Parcela {parcela.id}</h1>
            <p>Valor Emprestado: {parcela.valorASerPago}</p>
            <p>Data de Vencimento: {parcela.dataDeVencimento}</p>
            <p>Estado: {parcela.estado}</p>
            {parcela.valorPago != 0 && (
            <p>Valor Devolvido: {parcela.valorPago}</p>
            )}
            {parcela.dataDePagamento != null && (
            <p>Data de Pagamento: {parcela.dataDePagamento}</p>
            )}
            {parcela.multa != null && (
            <p>Valor da multa: {parcela.multa.valor}</p>
            )}
            <Link href={`/clientes/${params.id}/emprestimos/${params.emprestimo_id}/parcelas/${params.parcela_id}/pagamento`}>Pagar Parcela</Link>
            <Link href={`/clientes/${params.id}/emprestimos/${params.emprestimo_id}/parcelas/${params.parcela_id}/lembrete`}>Gerar Lembrete</Link>
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
