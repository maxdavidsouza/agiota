import Link from "next/link";
import { listarAgiotas, carregarIdDeUsuarioPorEmail } from "../lib/funcoes.js";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import styles from './AgiotaList.module.css'; // Usando CSS Modules

export default async function Agiota() {
	const session = await getServerSession(authOptions);
	const userId = await carregarIdDeUsuarioPorEmail(session && session.user ? session.user.email : null);

	if (!session || !session.roles.includes("agiota")) {
			redirect("/login");
		} else if (session && session.roles.includes("agiota")) {
			redirect(`/agiotas/${userId}`);
		}

	const agiotas = await listarAgiotas();

	if (agiotas != null) {
		return (
			<main className={styles.agiotaListMain}>
				<h1 className={styles.agiotaListTitle}>Lista de Agiotas</h1>
				<ul className={styles.agiotaList}>
					{agiotas.map((agiota) => (
						<li key={agiota.id} className={styles.agiotaListItem}>
							<div className={styles.agiotaListItemContent}>
								<div className={styles.agiotaInfo}>
									<strong>{agiota.nome}</strong> ({agiota.login.email})
								</div>
								<div className={styles.agiotaActions}>
									<Link href={`/agiotas/${agiota.id}`}>
										<button className={`${styles.actionButton} ${styles.info}`}>Perfil</button>
									</Link>
									<Link href={`/agiotas/update/${agiota.id}`}>
										<button className={`${styles.actionButton} ${styles.warning}`}>Atualizar</button>
									</Link>
									<Link href={`/agiotas/delete/${agiota.id}`}>
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
			<main className={styles.agiotaListMain}>
				<h1 className={styles.agiotaListTitle}>Agiotas não encontrados.</h1>
			</main>
		);
	}
}
