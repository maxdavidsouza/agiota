export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6 text-00171f">Procedimentos do Sistema</h1>
        <ol className="list-decimal list-inside space-y-2 text-left">
          <li>Cadastre ambos os Usuários.</li>
          <li>Faça uma proposta de Empréstimo pelo Agiota.</li>
          <li>Aceite a proposta pelo Cliente.</li>
          <li>Firme o contrato com o Agiota.</li>
          <li>Pague as Parcelas do Cliente.</li>
          <li>Envie mensagens pelo Agiota para o Cliente.</li>
          <li>Gere lembretes pelo Cliente para pagamentos.</li>
        </ol>
      </div>
    </main>
  );
}
