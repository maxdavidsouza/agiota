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
        <main className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-gray-200 p-10 rounded-lg shadow-md">
                <div className="text-center mb-4 text-[#00171F] font-sans">
                    Tem certeza que deseja apagar o empréstimo <strong>{params.emprestimo_id}</strong>?
                </div>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={() => handleYesButton()}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Sim
                    </button>
                    <button
                        onClick={() => handleNoButton()}
                        className="bg-red-500 text-black px-4 py-2 rounded"
                    >
                        Não
                    </button>
                </div>
            </div>
        </main>
    );
}
