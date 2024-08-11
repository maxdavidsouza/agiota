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
    <main className="flex flex-col items-center">
        <form onSubmit={handleSubmit}>
            <h1>Página de Pagamento da Parcela {params.parcela_id}</h1>
            {<h2>{erro}</h2>}
            <div>
                <label>Valor do Pagamento: R$ </label>
                <input
                type="number"
                name="valorDoPagamento"
                value={formData.valorDoPagamento}
                onChange={handleChange}
                required
                />
            </div>
            <button type="submit">Pagar</button>
        </form>
    </main>
  );
}
