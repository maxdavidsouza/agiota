import Link from "next/link";
import { carregarCliente } from "@/app/lib/funcoes";

export default async function FindCliente({params}) {
    const cliente = await carregarCliente(params.id);
    if(cliente != null) {
      return (
        <main className="flex flex-col items-center">
            <h1>Cliente {params.id}</h1>
            <p>Nome: {cliente.nome}</p>
            <h1>Login {cliente.login.id}</h1>
            <p>Email: {cliente.login.email}</p>
            <p>Senha: {cliente.login.senha}</p>
            <h1>Endereço {cliente.endereco.id}</h1>
            <p>CEP: {cliente.endereco.cep}</p>
            <p>Número: {cliente.endereco.numero}</p>
            <p>Rua: {cliente.endereco.rua}</p>
            <p>Bairro: {cliente.endereco.bairro}</p>
            <p>Cidade: {cliente.endereco.cidade}</p>
            <p>Estado: {cliente.endereco.estado}</p>
            <Link href={`/clientes/${cliente.id}/emprestimos`}>Ver Empréstimos Aceitos</Link>
            <Link href={`/clientes/${cliente.id}/lembretes`}>Ver Lembretes Feitos</Link>
            <Link href={`/clientes/${cliente.id}/mensagens/recebidas`}>Ver Mensagens Recebidas</Link>
            <Link href={`/clientes/update/${cliente.id}`}>Atualizar</Link>
            <Link href={`/clientes/delete/${cliente.id}`}>Apagar</Link>
        </main>
      );
    } else {
      return (
        <main className="flex flex-col items-center">
            <h1>Cliente não encontrado.</h1>
        </main>
      )
    }
}