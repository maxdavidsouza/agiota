import Link from "next/link";
import { carregarCliente, carregarIdDeUsuarioPorEmail } from "@/app/lib/funcoes";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function FindCliente({ params }) {
  const session = await getServerSession(authOptions);
  const userId = await carregarIdDeUsuarioPorEmail(
    session && session.user ? session.user.email : null
  );

  if (params.id != userId) {
    redirect("/login");
  }

  const cliente = await carregarCliente(params.id);

  if (cliente != null) {
    return (
      <main className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-00171f">
            Cliente {params.id}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row w-full justify-between gap-8">
          <div className="flex-1 mb-4">
            <h2 className="text-xl font-semibold mb-2 text-007ea7">Informações Pessoais</h2>
            <div className="grid gap-y-2">
              <p><span className="font-bold">Nome:</span> {cliente.nome}</p>
              <p><span className="font-bold">Email:</span> {cliente.login.email}</p>
              <p><span className="font-bold">Senha:</span> {cliente.login.senha}</p>
            </div>
          </div>

          <div className="flex-1 mb-4">
            <h2 className="text-xl font-semibold mb-2 text-007ea7">Endereço</h2>
            <div className="grid grid-cols-2 gap-y-2">
              <p><span className="font-bold">CEP:</span> {cliente.endereco.cep}</p>
              <p><span className="font-bold">Número:</span> {cliente.endereco.numero}</p>
              <p><span className="font-bold">Rua:</span> {cliente.endereco.rua}</p>
              <p><span className="font-bold">Bairro:</span> {cliente.endereco.bairro}</p>
              <p><span className="font-bold">Cidade:</span> {cliente.endereco.cidade}</p>
              <p><span className="font-bold">Estado:</span> {cliente.endereco.estado}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link href={`/clientes/${cliente.id}/emprestimos`}>
              <button className="bg-[#00171f] text-[#ffffff] py-1 px-3 rounded transition hover:bg-[#007ea7] w-56">
                Empréstimos Aceitos
              </button>
            </Link>
            <Link href={`/clientes/${cliente.id}/lembretes`}>
              <button className="bg-[#00171f] text-[#ffffff] py-1 px-3 rounded transition hover:bg-[#007ea7] w-56">
                Lembretes
              </button>
            </Link>
            <Link href={`/clientes/update/${cliente.id}`}>
              <button className="bg-green-600 text-white py-1 px-3 rounded transition hover:bg-green-500 w-56">
                Atualizar
              </button>
            </Link>
            <Link href={`/clientes/delete/${cliente.id}`}>
              <button className="bg-red-600 text-white py-1 px-3 rounded transition hover:bg-red-500 w-56">
                Apagar
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <main className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-red-600">
          Cliente não encontrado.
        </h1>
      </main>
    );
  }
}
