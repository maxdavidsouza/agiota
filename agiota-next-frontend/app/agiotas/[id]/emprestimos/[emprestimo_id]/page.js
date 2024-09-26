import Link from "next/link";
import { carregarEmprestimoDeAgiota } from "@/app/lib/funcoes";
import { carregarIdDeUsuarioPorEmail } from "@/app/lib/funcoes";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function FindEmprestimoDeAgiota({params}) {
    const session = await getServerSession(authOptions);
    const userId = await carregarIdDeUsuarioPorEmail(session?.user?.email);
    const emprestimo = await carregarEmprestimoDeAgiota(params.id, params.emprestimo_id);

    if (!session || !userId) {
    redirect("/login");
  }
    if(emprestimo != null) {
      return (
        <main className="flex flex-col items-center">
            <h1>Dados do Empréstimo {emprestimo.id}</h1>
            <p>Valor emprestado: {emprestimo.valorEmprestado}</p>
            <p>Valor a ser pago: {emprestimo.valorASerPago}</p>
            <p>Estado de Publicação: {emprestimo.estado}</p>
            {emprestimo.parcelas.map((parcela, index) => (
                    <div key={index}>
                        <h4>Parcela {index + 1}</h4>
                        <div>
                            <label>Valor a Ser Pago: R$ </label>
                            <span>{parcela.valorASerPago.toFixed(2)}</span>
                        </div>
                        <div>
                            <label>Taxa de Atraso: R$ </label>
                            <span>{parcela.taxaDeAtraso.toFixed(2)}</span>
                        </div>
                        <div>
                            <label>Data de Vencimento: </label>
                            <span>{parcela.dataDeVencimento ? new Date(parcela.dataDeVencimento).toLocaleDateString() : 'Não definida'}</span>
                        </div>
                        <div>
                            <label>Estado da Parcela: </label>
                            <span>{parcela.estado}</span>
                        </div>
                        <Link href={`/agiotas/${params.id}/emprestimos/${params.emprestimo_id}/parcelas/${parcela.id}`}>Ver Detalhes</Link>
                    </div>
            ))}
            {emprestimo.estado === "Em acordo" && (
                    <Link href={`/agiotas/${params.id}/emprestimos/${params.emprestimo_id}/firmar-acordo`}>| Fechar Acordo </Link>
            )}
            <Link href={`/agiotas/${params.id}/emprestimos/delete/${params.emprestimo_id}`}>Apagar</Link>
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
