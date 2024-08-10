'use client';
import { useRouter } from "next/navigation";
import { removerEmprestimo } from "@/app/lib/funcoes";

export default function DeleteEmprestimo({params}) {
    const router = useRouter();

    const handleYesButton = async () => {
        await removerEmprestimo(params.id, params.emprestimo_id);
        alert("O empréstimo "+params.emprestimo_id+" foi removido com sucesso")
        router.push('/agiotas/'+params.id+'/emprestimos');
        router.refresh()
    }

    const handleNoButton = () => {
        router.push('/agiotas/'+params.id+'/emprestimos');
    }

    return (
        <main className="flex flex-col items-center">
        <div>Tem certeza que desejar apagar o empréstimo {params.emprestimo_id}?</div>
        <button onClick={() => handleYesButton()}>Sim</button>
        <button onClick={() => handleNoButton()}>Não</button>
        </main>
    );
}
