import Link from "next/link";
import { listarEmprestimosDeAgiota } from "@/app/lib/funcoes.js";
import { carregarIdDeUsuarioPorEmail } from "@/app/lib/funcoes";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import styles from './EmprestimosDeAgiota.module.css'; // Importando o CSS Module

export default async function EmprestimosDeAgiota({ params }) {
  const session = await getServerSession(authOptions);
  const userId = await carregarIdDeUsuarioPorEmail(session?.user?.email);
  const emprestimos = await listarEmprestimosDeAgiota(params.id);

  if (!session || !userId || userId != params.id) {
    redirect("/login");
  }

  if (emprestimos != null && emprestimos.length > 0) {
    return (
      <main className={styles.emprestimosMain}>
        <h1 className={styles.emprestimosTitle}>Lista de Empréstimos oferecidos pelo Agiota {params.id}</h1>
        <ul className={styles.emprestimosList}>
          {emprestimos.map((emprestimo) => (
            <li key={emprestimo.id} className={styles.emprestimosListItem}>
              <div className={styles.emprestimosContent}>
                <h2 className={styles.emprestimosSubtitle}>Empréstimo {emprestimo.id}</h2>
                <p><strong>Estado:</strong> {emprestimo.estado}</p>
                <p><strong>Valor Emprestado:</strong> R${emprestimo.valorEmprestado}</p>
                <p><strong>Valor a Ser Pago:</strong> R${emprestimo.valorASerPago}</p>
                <div className={styles.buttonGroup}>
                  <Link href={`/agiotas/${params.id}/emprestimos/${emprestimo.id}`}>
                    <button className={`${styles.actionButton} ${styles.detailButton}`}>
                      Detalhar Empréstimo
                    </button>
                  </Link>
                  {emprestimo.estado === "Em acordo" && (
                    <Link href={`/agiotas/${params.id}/emprestimos/${emprestimo.id}/firmar-acordo`}>
                      <button className={`${styles.actionButton} ${styles.agreementButton}`}>
                        Firmar Acordo
                      </button>
                    </Link>
                  )}
                  <Link href={`/agiotas/${params.id}/emprestimos/delete/${emprestimo.id}`}>
                    <button className={`${styles.actionButton} ${styles.deleteButton}`}>
                      Apagar
                    </button>
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
      <main className={styles.emprestimosMain}>
        <h1 className={styles.emprestimosTitle}>Empréstimos não encontrados.</h1>
      </main>
    );
  }
}
