'use client';
import { useRouter } from "next/navigation";
import { darEmprestimo } from "@/app/lib/funcoes";

export default function EntregarEmprestimo({params}) {
    const router = useRouter();

    const handleYesButton = async () => {
        await darEmprestimo(params.id, params.emprestimo_id);
        alert("O empréstimo "+params.emprestimo_id+" foi firmado com sucesso");
        router.push('/agiotas/'+params.id+'/emprestimos/'+params.emprestimo_id);
        router.refresh();
    }

    const handleNoButton = () => {
        router.push('/agiotas/'+params.id+'/emprestimos/'+params.emprestimo_id);
    }

    return (
        <main className="flex flex-col items-center">
        <div>Tem certeza que desejar firmar esse empréstimo {params.emprestimo_id}?</div>
        <button onClick={() => handleYesButton()}>Sim</button>
        <button onClick={() => handleNoButton()}>Não</button>
        </main>
    );
}
