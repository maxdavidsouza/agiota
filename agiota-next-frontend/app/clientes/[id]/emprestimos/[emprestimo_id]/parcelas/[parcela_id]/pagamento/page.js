'use client'
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { cadastrarPagamento } from "@/app/lib/funcoes";


export default function CreatePagamento({ params }) {
    const router = useRouter();
    const [erro, setErro] = useState("");
    const [formData, setFormData] = useState({
    valorDoPagamento: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, key] = name.split(".");

    if (section && key) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    cadastrarPagamento(params.id, params.emprestimo_id, params.parcela_id, formData)
      .then(
        (result) => {
          console.log('Success:', result);
          router.push('/clientes/'+params.id+"/emprestimos/"+params.emprestimos_id+"/parcelas/"+params.parcela_id);
          router.refresh()
        }
      )
      .catch (
        (error) => {
          const terceiroDoisPontos = error.message.split(':').slice(0, 2).join(':').length + 1;
          const posicaoPontoEVirgula = error.message.indexOf(';', terceiroDoisPontos);
          const mensagemDeErro = error.message.substring(terceiroDoisPontos, posicaoPontoEVirgula).trim();
          mensagemDeErro.split('\n')[0];
          if(mensagemDeErro == "fetch failed")
            setErro("O Servidor está desligado.");
          else
            setErro(mensagemDeErro);
        }
      )
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4">Página de Pagamento da Parcela {params.parcela_id}</h1>
            {erro && <h2 className="text-red-500 mb-4">{erro}</h2>}
            <div className="mb-4">
                <label className="block text-gray-700">Valor do Pagamento: R$ </label>
                <input
                type="number"
                name="valorDoPagamento"
                value={formData.valorDoPagamento}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
            </div>
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Pagar
            </button>
        </form>
    </main>
  );
}
