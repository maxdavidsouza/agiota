'use client';
import { useRouter } from "next/navigation";
import { removerLembrete } from "@/app/lib/funcoes";

export default function DeleteLembrete({params}) {
    const router = useRouter();

    const handleYesButton = async () => {
        await removerLembrete(params.lembrete_id);
        router.push('/clientes/'+params.id+'/lembretes');
        router.refresh()
    }

    const handleNoButton = () => {
        router.push('/clientes/'+params.id+'/lembretes');
    }

    return (
        <main className="flex flex-col items-center">
        <div>Tem certeza que desejar apagar o lembrete {params.lembrete_id}?</div>
        <button onClick={() => handleYesButton()}>Sim</button>
        <button onClick={() => handleNoButton()}>Não</button>
        </main>
    );
}
