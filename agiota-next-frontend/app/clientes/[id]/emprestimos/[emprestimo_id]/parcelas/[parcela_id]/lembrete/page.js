'use client'
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { cadastrarLembrete } from "@/app/lib/funcoes";

export default function CreateLembrete({ params }) {
    const router = useRouter();
    const [erro, setErro] = useState("");
    const [formData, setFormData] = useState({
    dataEHoraDeEnvio: null,
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

    cadastrarLembrete(params.id, params.emprestimo_id, params.parcela_id, formData)
      .then(
        (result) => {
          console.log('Success:', result);
          alert("Lembrete registrado!");
          router.push('/clientes/'+params.id+"/emprestimos/"+params.emprestimo_id+"/parcelas/"+params.parcela_id);
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
            <h1>Página de Criação de Lembretes {params.parcela_id}</h1>
            {<h2>{erro}</h2>}
            <div>
                <label>Selecione a Data do Lembrete</label>
                <input
                type="datetime-local"
                name="dataEHoraDeEnvio"
                value={formData.dataEHoraDeEnvio}
                onChange={handleChange}
                required
            />
            </div>
            <button type="submit">Anotar</button>
        </form>
    </main>
  );
}
