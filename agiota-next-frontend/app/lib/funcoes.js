'use server'

//Funções Utilizadas pelo servidor para Alterar/Adquirir dados à partir da API
export async function listarClientes() {
    const response = await fetch('http://localhost:8080/api/clientes', {cache: 'no-store'});
    if (!response.ok) {
        throw new Error('Erro ao carregar clientes');
    }
    const data = await response.json();
    return data;
}

export async function listarAgiotas() {
  const response = await fetch('http://localhost:8080/api/agiotas', {cache: 'no-store'});
  if (!response.ok) {
      throw new Error('Erro ao carregar agiotas');
  }
  const data = await response.json();
  return data;
}

export async function listarEmprestimosDeAgiota() {
  const response = await fetch('http://localhost:8080/api/agiotas/' + id + '/emprestimos', {cache: 'no-store'});
  if (!response.ok) {
      throw new Error('Erro ao carregar emprestimos');
  }
  const data = await response.json();
  return data;
}

export async function listarEmprestimosDeCliente() {
  const response = await fetch('http://localhost:8080/api/clientes/' + id + '/emprestimos', {cache: 'no-store'});
  if (!response.ok) {
      throw new Error('Erro ao carregar emprestimos');
  }
  const data = await response.json();
  return data;
}

export async function carregarCliente(id) {
  const clienteData = await fetch ('http://localhost:8080/api/clientes/' + id, { cache: 'no-store' });
  const cliente = await clienteData.json();
  return cliente;
}

export async function carregarAgiota(id) {
  const agiotaData = await fetch ('http://localhost:8080/api/agiotas/' + id, { cache: 'no-store' });
  const agiota = await agiotaData.json();
  return agiota;
}

export async function cadastrarCliente(formData) {
    try {
      const response = await fetch('http://localhost:8080/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if(response.ok){
        const result = await response.json();
        return result;
      } else {
        const errorData = await response.json();
        throw new Error(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
}

export async function cadastrarAgiota(formData) {
    try {
      const response = await fetch('http://localhost:8080/api/agiotas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if(response.ok){
        const result = await response.json();
        return result;
      } else {
        const errorData = await response.json();
        throw new Error(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
}