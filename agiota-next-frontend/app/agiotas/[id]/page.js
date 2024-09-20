import Link from "next/link";
import { carregarAgiota, carregarIdDeUsuarioPorEmail } from "@/app/lib/funcoes";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function FindAgiota({params}) {
    const session = await getServerSession(authOptions);
    const userId = await carregarIdDeUsuarioPorEmail(session && session.user ? session.user.email : null);
    console.log("Session:", session); // Adicione esta linha para verificar a sessão

    if (params.id != userId) {
      redirect("/login");
    }

    const agiota = await carregarAgiota(params.id);
    if(agiota != null) {
      return (
        <main className="flex flex-col items-center">
            <h1>Agiota {params.id}</h1>
            <p>Nome: {agiota.nome}</p>
            <h1>Login {agiota.login.id}</h1>
            <p>Email: {agiota.login.email}</p>
            <p>Senha: {agiota.login.senha}</p>
            <h1>Endereço {agiota.endereco.id}</h1>
            <p>CEP: {agiota.endereco.cep}</p>
            <p>Número: {agiota.endereco.numero}</p>
            <p>Rua: {agiota.endereco.rua}</p>
            <p>Bairro: {agiota.endereco.bairro}</p>
            <p>Cidade: {agiota.endereco.cidade}</p>
            <p>Estado: {agiota.endereco.estado}</p>
            <Link href={`${agiota.id}/emprestimos/create`}>Cadastrar Empréstimo</Link>
            <Link href={`${agiota.id}/emprestimos/`}>Ver Empréstimos Efetuados</Link>
            <Link href={`update/${agiota.id}`}>Atualizar</Link>
            <Link href={`delete/${agiota.id}`}>Apagar</Link>
        </main>
      );
    } else {
      return (
        <main className="flex flex-col items-center">
            <h1>Agiota não encontrado.</h1>
        </main>
      )
    }
}