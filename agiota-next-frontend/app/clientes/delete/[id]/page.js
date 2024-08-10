'use client';
import { useRouter } from "next/navigation";
import { removerCliente } from "@/app/lib/funcoes";

export default function DeleteCliente({params}) {
    const router = useRouter();

    const handleYesButton = async (id) => {
        await removerCliente(id);
        router.push('/clientes/');
        router.refresh()
    }

    const handleNoButton = () => {
        router.push('/clientes/');
    }

    return (
        <main className="flex flex-col items-center">
        <div>Tem certeza que desejar apagar o cliente {params.id}?</div>
        <button onClick={() => handleYesButton(params.id)}>Sim</button>
        <button onClick={() => handleNoButton()}>Não</button>
        </main>
    );
}
