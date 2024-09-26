import { carregarIdDeUsuarioPorEmail, listarMensagensCliente } from "@/app/lib/funcoes";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import styles from './LembretesList.module.css'; // Importando o CSS Modules

export default async function Lembretes({ params }) {
    const session = await getServerSession(authOptions);
    const userId = await carregarIdDeUsuarioPorEmail(session?.user?.email);
    const lembretes = await listarMensagensCliente(params.id);

    // Função para formatar a data em um formato mais legível
    const formatarData = (dataString) => {
        const data = new Date(dataString);
        return new Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(data);
    };

    if (params.id != userId) {
        redirect("/login");
    }

    if (lembretes != null && lembretes.length > 0) {
        return (
            <main className={styles.lembretesMain}>
                <h1 className={styles.lembretesTitle}>Lista de Mensagens</h1>
                <ul className={styles.lembretesList}>
                    {lembretes.map((lembrete) => (
                        <li key={lembrete.id} className={styles.lembretesListItem}>
                            <div className={styles.lembretesContent}>
                                <div className={styles.lembreteInfo}>
                                    <p className={styles.lembreteData}>
                                        <strong>{formatarData(lembrete.dataEHoraDeEnvio)}</strong>
                                    </p>
                                    <p className={styles.lembreteTexto}>
                                        {lembrete.texto}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        );
    } else {
        return (
            <main className={styles.lembretesMain}>
                <h1 className={styles.lembretesTitle}>Mensagens não encontradas.</h1>
            </main>
        );
    }
}
