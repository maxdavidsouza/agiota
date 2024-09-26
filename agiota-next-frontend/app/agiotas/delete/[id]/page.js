'use client';
import { useRouter } from "next/navigation";
import { removerAgiota } from "@/app/lib/funcoes";

export default function DeleteAgiota({ params }) {
    const router = useRouter();

    const handleYesButton = async () => {
        await removerAgiota(params.id);
        alert(`O agiota ${params.id} foi removido com sucesso`);
        router.push('/agiotas/');
        router.refresh();
    };

    const handleNoButton = () => {
        router.push('/agiotas/');
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-gray-200 p-10 rounded-lg shadow-md">
                <div className="text-center mb-4 text-[#00171F] font-sans">
                    Tem certeza que deseja apagar o agiota <strong>{params.id}</strong>?
                </div>
                <div className="flex justify-center space-x-4">
                    <button 
                        onClick={handleYesButton} 
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Sim
                    </button>
                    <button 
                        onClick={handleNoButton} 
                        className="bg-gray-400 text-black px-4 py-2 rounded"
                    >
                        Não
                    </button>
                </div>
            </div>
        </main>
    );
}
