import Link from "next/link";
import { listarLembretes, carregarIdDeUsuarioPorEmail } from "@/app/lib/funcoes";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import styles from './LembretesList.module.css'; // Importando o CSS Modules

export default async function Lembretes({ params }) {
  const session = await getServerSession(authOptions);
  const userId = await carregarIdDeUsuarioPorEmail(session?.user?.email);
  const lembretes = await listarLembretes(params.id);

  if (params.id != userId) {
    redirect("/login");
  }
  if (lembretes != null && lembretes.length > 0) {
    return (
      <main className={styles.lembretesMain}>
        <h1 className={styles.lembretesTitle}>Lista de Lembretes do Cliente {params.id}</h1>
        <ul className={styles.lembretesList}>
          {lembretes.map((lembrete) => (
            < li key={lembrete.id} className={styles.lembretesListItem} >
              <div className={styles.lembretesContent}>
                <div className={styles.lembreteInfo}>
                  <strong>{lembrete.dataEHoraDeEnvio}</strong> - {lembrete.texto}
                </div>
                <div className={styles.lembreteActions}>
                  <Link href={`lembretes/delete/${lembrete.id}`}>
                    <button className={`${styles.actionButton} ${styles.danger}`}>Apagar</button>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main >
    );
  } else {
    return (
      <main className={styles.lembretesMain}>
        <h1 className={styles.lembretesTitle}>Lembretes não encontrados.</h1>
      </main>
    );
  }
}
