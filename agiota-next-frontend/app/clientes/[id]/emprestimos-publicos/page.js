import Link from "next/link";
import { listarEmprestimosPublicos } from "@/app/lib/funcoes.js";
import { carregarIdDeUsuarioPorEmail } from "@/app/lib/funcoes";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import styles from './EmprestimosPublicos.module.css';

export default async function EmprestimosPublicos({ params }) {
  const session = await getServerSession(authOptions);
  const userId = await carregarIdDeUsuarioPorEmail(session?.user?.email);
  const emprestimos = await listarEmprestimosPublicos(params.id);

  if (!session || !userId || userId != params.id) {
    redirect("/login");
  }

  if (emprestimos != null && emprestimos.length > 0) {
    return (
      <main className={styles.emprestimosMain}>
        <h1 className={styles.emprestimosTitle}>Lista de Empréstimos Publicados por Agiotas</h1>
        <ul className={styles.emprestimosList}>
          {emprestimos.map((emprestimo) => (
            <li key={emprestimo.id} className={styles.emprestimosListItem}>
              <div className={styles.emprestimosContent}>
                <p><strong>Estado:</strong> {emprestimo.estado}</p>
                <p><strong>Empréstimo:</strong> R${emprestimo.valorEmprestado}</p>
                <p><strong>Retorno Mínimo:</strong> R${emprestimo.valorASerPago}</p>
                <Link href={`/clientes/${params.id}/emprestimos-publicos/${emprestimo.id}`}>
                  <button className={`${styles.actionButton} ${styles.detailButton}`}>
                    Detalhar Empréstimo
                  </button>
                </Link>
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
