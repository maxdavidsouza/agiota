'use client';
import { useRouter } from "next/navigation";
import { pedirEmprestimo } from "@/app/lib/funcoes";

export default function PedirEmprestimo({params}) {
    const router = useRouter();

    const handleYesButton = async () => {
        await pedirEmprestimo(params.id, params.emprestimo_id);
        alert("O empréstimo "+params.emprestimo_id+" foi firmado com sucesso");
        router.push('/clientes/'+params.id+'/emprestimos/'+params.emprestimo_id);
        router.refresh();
    }

    const handleNoButton = () => {
        router.push('/clientes/'+params.id+'/emprestimos/'+params.emprestimo_id);
    }

    return (
        <main className="flex flex-col items-center">
        <div>Tem certeza que desejar pedir esse empréstimo {params.emprestimo_id}?</div>
        <button onClick={() => handleYesButton()}>Sim</button>
        <button onClick={() => handleNoButton()}>Não</button>
        </main>
    );
}
