'use client'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { cadastrarEmprestimo } from "@/app/lib/funcoes";

export default function CreateEmprestimo({ params }) {
  const router = useRouter();
  const [erro, setErro] = useState("");
  const [parcelasCount, setParcelasCount] = useState(1);
  const [formData, setFormData] = useState({
  valorEmprestado: '',
  valorASerPago: '',
  taxaTotal: 0,
  formaDePagamento: '',
  estado: 'Aberto',
  parcelas: [
    {
    valorASerPago: 0,
    valorPago: 0,
    taxaDeAtraso: 0,
    dataDePagamento: null,
    dataDeVencimento: null, // Data de vencimento nula
    estado: 'Em acordo',
    },
  ],
  });

  useEffect(() => {
  const valorEmprestado = parseFloat(formData.valorEmprestado) || 0;
  const valorASerPago = parseFloat(formData.valorASerPago) || 0;

  if (valorEmprestado > 0 && valorASerPago >= valorEmprestado) {
    const valorTotal = valorASerPago - valorEmprestado;
    const valorParcela = valorASerPago / parcelasCount;
    const taxaDeAtraso = valorParcela / 30;

    const updatedParcelas = formData.parcelas.map(parcela => ({
    ...parcela,
    valorASerPago: valorParcela,
    taxaDeAtraso: taxaDeAtraso,
    }));

    setFormData({
    ...formData,
    taxaTotal: valorTotal,
    parcelas: updatedParcelas,
    });
  }
  }, [formData.valorEmprestado, formData.valorASerPago, parcelasCount]);

  const handleParcelasChange = (e) => {
  const count = parseInt(e.target.value, 10);
  setParcelasCount(count);
  setFormData({
    ...formData,
    parcelas: Array.from({ length: count }, () => ({
    valorASerPago: 0,
    valorPago: 0,
    taxaDeAtraso: 0,
    dataDePagamento: null,
    dataDeVencimento: null, // Data de vencimento nula
    estado: 'Em acordo',
    })),
  });
  };

  const handleInputChange = (e, index, field) => {
  const value = e.target.value;
  if (field.startsWith('parcela')) {
    const parcelaIndex = parseInt(field.split('.')[1], 10);
    const parcelaField = field.split('.')[2];
    const updatedParcelas = formData.parcelas.map((parcela, idx) =>
    idx === parcelaIndex ? { ...parcela, [parcelaField]: value } : parcela
    );
    setFormData({ ...formData, parcelas: updatedParcelas });
  } else {
    setFormData({ ...formData, [field]: value });
  }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErro("");

  cadastrarEmprestimo(params.id, formData)
    .then(
    (result) => {
      console.log('Success:', result);
      router.push('/agiotas/'+params.id+"/emprestimos");
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
  <main className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Página de cadastro de empréstimo</h1>
      {erro && <h2 className="text-red-500 mb-4">{erro}</h2>}
      <div className="mb-4">
        <label className="block text-gray-700">Valor Emprestado: R$ </label>
        <input
        type="number"
        value={formData.valorEmprestado}
        onChange={(e) => handleInputChange(e, null, 'valorEmprestado')}
        required
        className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Valor a Ser Pago: R$ </label>
        <input
        type="number"
        value={formData.valorASerPago}
        onChange={(e) => handleInputChange(e, null, 'valorASerPago')}
        min={formData.valorEmprestado}
        disabled={!formData.valorEmprestado}
        required
        className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Taxa Total: R$ </label>
        <input
        type="number"
        value={formData.taxaTotal.toFixed(2)}
        readOnly
        className="mt-1 p-2 border rounded w-full bg-gray-100"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Forma de Pagamento:</label>
        <select
        value={formData.formaDePagamento}
        onChange={(e) => handleInputChange(e, null, 'formaDePagamento')}
        required
        className="mt-1 p-2 border rounded w-full"
        >
        <option value="" disabled>Selecione uma forma de pagamento</option>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão">Cartão</option>
        <option value="Móveis">Móveis</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Quantidade de Parcelas: </label>
        <input
        type="number"
        min="1"
        value={parcelasCount}
        onChange={handleParcelasChange}
        required
        className="mt-1 p-2 border rounded w-full"
        />
      </div>

      {Array.from({ length: parcelasCount }).map((_, index) => (
        <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
        <h4 className="font-semibold mb-2">Parcela {index + 1}</h4>
        <div className="mb-2">
          <label className="block text-gray-700">Valor a Ser Pago: R$ </label>
          <input
          type="number"
          value={formData.parcelas[index].valorASerPago.toFixed(2)}
          readOnly
          className="mt-1 p-2 border rounded w-full bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700">Taxa de Atraso: R$ </label>
          <input
          type="number"
          value={formData.parcelas[index].taxaDeAtraso.toFixed(2)}
          readOnly
          className="mt-1 p-2 border rounded w-full bg-gray-100"
          />
        </div>
        </div>
      ))}

      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Criar Empréstimo</button>
    </form>
  </main>
  );
}
