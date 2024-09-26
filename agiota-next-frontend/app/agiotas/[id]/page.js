import Link from "next/link";
import { carregarAgiota, carregarIdDeUsuarioPorEmail } from "@/app/lib/funcoes";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function FindAgiota({ params }) {
  const session = await getServerSession(authOptions);
  const userId = await carregarIdDeUsuarioPorEmail(session?.user?.email);

  if (!session || !userId) {
    redirect("/login");
  }

  const agiota = await carregarAgiota(params.id);
  if (agiota) {
    return (
      <main className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
        {/* Ajuste para o título centralizado à esquerda */}
        <h1 className="text-3xl font-bold mb-6 text-00171f text-left w-full">
          Agiota {params.id}
        </h1>
        <div className="flex flex-col md:flex-row w-full justify-between gap-8">
          <div className="flex-1 mb-4">
            <h2 className="text-xl font-semibold mb-2 text-007ea7">Informações Pessoais</h2>
            <div className="grid gap-y-2">
              <p><span className="font-bold">Nome:</span> {agiota.nome}</p>
              <p><span className="font-bold">Email:</span> {agiota.login.email}</p>
              <p><span className="font-bold">Senha:</span> {agiota.login.senha}</p>
            </div>
          </div>

          <div className="flex-1 mb-4 flex flex-col">
            <h2 className="text-xl font-semibold mb-2 text-007ea7">Endereço</h2>
            <div className="grid grid-cols-2 gap-y-2">
              <p><span className="font-bold">CEP:</span> {agiota.endereco.cep}</p>
              <p><span className="font-bold">Número:</span> {agiota.endereco.numero}</p>
              <p><span className="font-bold">Rua:</span> {agiota.endereco.rua}</p>
              <p><span className="font-bold">Bairro:</span> {agiota.endereco.bairro}</p>
              <p><span className="font-bold">Cidade:</span> {agiota.endereco.cidade}</p>
              <p><span className="font-bold">Estado:</span> {agiota.endereco.estado}</p>
            </div>
          </div>

          {/* Adicionando uma nova div para os botões ao lado do endereço */}
          <div className="flex flex-col gap-3">
            <Link href={`${agiota.id}/emprestimos/create`}>
              <button className="bg-[#00171f] text-[#ffffff] py-1 px-3 rounded transition hover:bg-[#007ea7] w-56">
                Cadastrar Empréstimo
              </button>
            </Link>
            <Link href={`${agiota.id}/emprestimos/`}>
              <button className="bg-[#00171f] text-[#ffffff] py-1 px-3 rounded transition hover:bg-[#007ea7] w-56">
                Empréstimos Efetuados
              </button>
            </Link>
            <Link href={`update/${agiota.id}`}>
              <button className="bg-green-600 text-white py-1 px-3 rounded transition hover:bg-green-500 w-56">
                Atualizar
              </button>
            </Link>
            <Link href={`delete/${agiota.id}`}>
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
          Agiota não encontrado.
        </h1>
      </main>
    );
  }
}
