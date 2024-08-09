'use client';
import { useRouter } from "next/navigation";
import { removerAgiota } from "@/app/lib/funcoes";

export default function DeleteAgiota({params}) {
    const router = useRouter();

    const handleYesButton = async (id) => {
        await removerAgiota(id);
        alert("O agiota "+id+" foi removido com sucesso")
        router.push('/agiotas/');
    }

    const handleNoButton = () => {
        router.push('/agiotas/');
    }

    return (
        <main className="flex flex-col items-center">
        <div>Tem certeza que desejar apagar o agiota {params.id}?</div>
        <button onClick={() => handleYesButton(params.id)}>Sim</button>
        <button onClick={() => handleNoButton()}>Não</button>
        </main>
    );
}
