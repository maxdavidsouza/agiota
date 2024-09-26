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
        <main className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-gray-200 p-10 rounded-lg shadow-md">
                <div className="text-center mb-4 text-[#00171F] font-sans">
                    Tem certeza que desejar pedir esse empréstimo <strong>{params.emprestimo_id}</strong>?
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
