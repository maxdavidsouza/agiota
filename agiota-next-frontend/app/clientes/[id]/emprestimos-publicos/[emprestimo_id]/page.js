import Link from "next/link";
import { carregarEmprestimoPublico } from "@/app/lib/funcoes";
import { carregarIdDeUsuarioPorEmail } from "@/app/lib/funcoes";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function FindEmprestimoPublico({params}) {
    const session = await getServerSession(authOptions);
    const userId = await carregarIdDeUsuarioPorEmail(session?.user?.email);
    const emprestimo = await carregarEmprestimoPublico(params.emprestimo_id);

    if (!session || !userId || userId != params.id) {
    redirect("/login");
  }
    if(emprestimo != null) {
      return (
        <main className="flex flex-col items-center p-4 min-h-screen">
          <h1 className="text-2xl font-bold mb-4">Dados do Empréstimo {emprestimo.id}</h1>
          <p className="text-lg mb-2">Valor emprestado: <span className="font-semibold">R$ {emprestimo.valorEmprestado.toFixed(2)}</span></p>
          <p className="text-lg mb-4">Valor a ser pago: <span className="font-semibold">R$ {emprestimo.valorASerPago.toFixed(2)}</span></p>
          {emprestimo.parcelas.map((parcela, index) => (
        <div key={index} className="w-full p-4 mb-4 rounded shadow-md" style={{ backgroundColor: '#005f73' }}>
          <h4 className="text-xl font-semibold mb-2 text-white">Parcela {index + 1}</h4>
          <div className="mb-2">
            <label className="font-medium text-white">Valor a Ser Pago: R$ </label>
            <span className="text-white">{parcela.valorASerPago.toFixed(2)}</span>
          </div>
          <div className="mb-2">
            <label className="font-medium text-white">Taxa de Atraso: R$ </label>
            <span className="text-white">{parcela.taxaDeAtraso.toFixed(2)}</span>
          </div>
          <div className="mb-2">
            <label className="font-medium text-white">Data de Vencimento: </label>
            <span className="text-white">{parcela.dataDeVencimento ? new Date(parcela.dataDeVencimento).toLocaleDateString() : 'Não definida'}</span>
          </div>
          <div className="mb-2">
            <label className="font-medium text-white">Estado da Parcela: </label>
            <span className="text-white">{parcela.estado}</span>
          </div>
        </div>
          ))}
          <Link href={`/clientes/${params.id}/emprestimos-publicos/${params.emprestimo_id}/firmar-acordo`} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition no-underline">
        Pedir Empréstimo
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
