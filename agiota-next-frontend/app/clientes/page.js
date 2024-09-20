import Link from "next/link";
import { carregarIdDeUsuarioPorEmail, listarClientes } from "../lib/funcoes.js";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Cliente() {
	const session = await getServerSession(authOptions);
	const userId = await carregarIdDeUsuarioPorEmail(session && session.user ? session.user.email : null);
	console.log("Session:", session); // Adicione esta linha para verificar a sessão

	if (!session || !session.roles.includes("cliente")) {
		// Se o usuário não estiver autenticado, redireciona para a página de login
		redirect("/login");
	} else if(session && session.roles.includes("cliente")){
		redirect(`/clientes/${userId}`);
	}

	const clientes = await listarClientes();

	if (clientes != null) {
		return (
			<main className="flex flex-col items-center">
				<h1>Lista de Clientes</h1>
				{clientes.map((cliente) => {
					return (
						<div key={cliente.id}>
							{cliente.id} - {cliente.nome} ({cliente.login.email})
							<Link href={`/clientes/${cliente.id}`}>
								| Entrar no Perfil{" "}
							</Link>
							<Link href={`/clientes/update/${cliente.id}`}>
								| Atualizar{" "}
							</Link>
							<Link href={`/clientes/delete/${cliente.id}`}>
								| Apagar |
							</Link>
						</div>
					);
				})}
			</main>
		);
	} else {
		return (
			<main className="flex flex-col items-center">
				<h1>Clientes não encontrados.</h1>
			</main>
		);
	}
}
