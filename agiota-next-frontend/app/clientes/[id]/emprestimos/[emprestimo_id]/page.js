import Link from "next/link";
import { carregarEmprestimoDeCliente } from "@/app/lib/funcoes";

export default async function FindEmprestimoDeCliente({params}) {
    const emprestimo = await carregarEmprestimoDeCliente(params.id, params.emprestimo_id);
    if(emprestimo != null) {
      return (
        <main className="flex flex-col items-center">
            <h1>Dados do Empréstimo {emprestimo.id}</h1>
            <p>Valor emprestado: {emprestimo.valorEmprestado}</p>
            <p>Valor a ser pago: {emprestimo.valorASerPago}</p>
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
                        <Link href={`/clientes/${params.id}/emprestimos/${params.emprestimo_id}/parcelas/${parcela.id}`}>Pagamento</Link>
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