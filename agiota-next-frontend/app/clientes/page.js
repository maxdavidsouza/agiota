import Link from "next/link";
import { carregarIdDeUsuarioPorEmail, listarClientes } from "../lib/funcoes.js";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import styles from './ListCliente.module.css';

export default async function Cliente() {
	const session = await getServerSession(authOptions);
	const userId = await carregarIdDeUsuarioPorEmail(session && session.user ? session.user.email : null);

	if (!session || !session.roles.includes("cliente")) {
			redirect("/login");
		} else if (session && session.roles.includes("cliente")) {
			redirect(`/clientes/${userId}`);
		}

	const clientes = await listarClientes();

	if (clientes != null) {
		return (
			<main className={styles.clienteListMain}>
				<h1 className={styles.clienteListTitle}>Lista de Clientes</h1>
				<ul className={styles.clienteList}>
					{clientes.map((cliente) => (
						<li key={cliente.id} className={styles.clienteListItem}>
							<div className={styles.clienteListItemContent}>
								<div className={styles.clienteInfo}>
									<strong>{cliente.nome}</strong> ({cliente.login.email})
								</div>
								<div className={styles.clienteActions}>
									<Link href={`/clientes/${cliente.id}`}>
										<button className={`${styles.actionButton} ${styles.info}`}>Perfil</button>
									</Link>
									<Link href={`/clientes/update/${cliente.id}`}>
										<button className={`${styles.actionButton} ${styles.warning}`}>Atualizar</button>
									</Link>
									<Link href={`/clientes/delete/${cliente.id}`}>
										<button className={`${styles.actionButton} ${styles.danger}`}>Apagar</button>
									</Link>
								</div>
							</div>
						</li>
					))}
				</ul>
			</main>
		);
	} else {
		return (
			<main className={styles.clienteListMain}>
				<h1 className={styles.clienteListTitle}>Clientes não encontrados.</h1>
			</main>
		);
	}
}
