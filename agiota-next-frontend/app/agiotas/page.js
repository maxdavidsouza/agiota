import Link from "next/link";
import { listarAgiotas } from "../lib/funcoes.js";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Agiota() {
	const session = await getServerSession(authOptions);
	console.log("Session:", session); // Adicione esta linha para verificar a sessão

	if (!session) {
		// Se o usuário não estiver autenticado, redireciona para a página de login
		redirect("/login");
	}

	const agiotas = await listarAgiotas();
	if (agiotas != null) {
		return (
			<main className="flex flex-col items-center">
				<h1>Lista de Agiotas</h1>
				{agiotas.map((agiota) => {
					return (
						<div key={agiota.id}>
							{agiota.id} - {agiota.nome} ({agiota.login.email})
							<Link href={`/agiotas/${agiota.id}`}>
								| Entrar no Perfil{" "}
							</Link>
							<Link href={`/agiotas/update/${agiota.id}`}>
								| Atualizar{" "}
							</Link>
							<Link href={`/agiotas/delete/${agiota.id}`}>
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
				<h1>Agiotas não encontrados.</h1>
			</main>
		);
	}
}
