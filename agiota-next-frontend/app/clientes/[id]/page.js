import Link from "next/link";
import { carregarCliente } from "@/app/lib/funcoes";

export default async function FindCliente({params}) {
    const cliente = await carregarCliente(params.id);
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
            <Link href="#">Atualizar</Link>
            <Link href="#">Apagar</Link>
        </main>
      );
}