import { carregarParcela } from "@/app/lib/funcoes";

export default async function CarregarParcela({params}) {
    const parcela = await carregarParcela(params.emprestimo_id, params.parcela_id);
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