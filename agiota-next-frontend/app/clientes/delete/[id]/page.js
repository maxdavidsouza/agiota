'use client';
import { useRouter } from "next/navigation";
import { removerCliente } from "@/app/lib/funcoes";

export default function DeleteCliente({ params }) {
    const router = useRouter();

    const handleConfirmation = async (confirm) => {
        if (confirm) {
            await removerCliente(params.id);
        }
        router.push('/clientes/');
        router.refresh();
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-gray-200 p-10 rounded-lg shadow-md">
                <div className="text-center mb-4 text-[#00171F] font-sans">
                    Tem certeza que deseja apagar o cliente <strong>{params.id}</strong>?
                </div>
                <div className="flex justify-center space-x-4">
                    <button 
                        onClick={() => handleConfirmation(true)} 
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Sim
                    </button>
                    <button 
                        onClick={() => handleConfirmation(false)} 
                        className="bg-gray-400 text-black px-4 py-2 rounded"
                    >
                        Não
                    </button>
                </div>
            </div>
        </main>
    );
}
