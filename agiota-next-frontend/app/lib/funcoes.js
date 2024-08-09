'use server'

//Funções Utilizadas pelo servidor para Alterar/Adquirir dados à partir da API
export async function listarClientes() {
  try {
    const response = await fetch('http://localhost:8080/api/clientes', {cache: 'no-store'});
    const data = await response.json();
    return data;
  }
  catch (erro) {
    console.error("Clientes não encontrados.");
    return null;
  }
}

export async function listarAgiotas() {
  try {
    const response = await fetch('http://localhost:8080/api/agiotas', {cache: 'no-store'});
    const data = await response.json();
    return data;
  } 
  catch (erro) {
    console.error("Agiotas não encontrados.");
    return null;
  }
}

export async function listarEmprestimosDeAgiota() {
  try {
    const response = await fetch('http://localhost:8080/api/agiotas/' + id + '/emprestimos', {cache: 'no-store'});
    const data = await response.json();
    return data;
  }
  catch(erro) {
    console.error("Empréstimos do Agiota não encontrados.");
    return null;
  }
}

export async function listarEmprestimosDeCliente() {
  try {
    const response = await fetch('http://localhost:8080/api/clientes/' + id + '/emprestimos', {cache: 'no-store'});
    const data = await response.json();
    return data;
  }
  catch(erro) {
    console.error("Empréstimos do Cliente não encontrados.");
    return null;
  }
}

export async function carregarCliente(id) {
  try {
    const clienteData = await fetch ('http://localhost:8080/api/clientes/' + id, { cache: 'no-store' });
    const cliente = await clienteData.json();
    return cliente;
  }
  catch(erro) {
    console.error("Cliente não encontrado.");
    return null;
  }
}

export async function carregarAgiota(id) {
  try {
    const agiotaData = await fetch ('http://localhost:8080/api/agiotas/' + id, { cache: 'no-store' });
    const agiota = await agiotaData.json();
    return agiota;
  }
  catch(erro) {
    console.error("Agiota não encontrado.");
    return null;
  }
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

export async function atualizarCliente(id, cliente_data) {
  try {
    const response = await fetch('http://localhost:8080/api/clientes/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente_data),
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

export async function atualizarAgiota(id, agiota_data) {
  try {
    const response = await fetch('http://localhost:8080/api/agiotas/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agiota_data),
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

export async function removerCliente(id) {
  try {
    const response = await fetch('http://localhost:8080/api/clientes/'+ id, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar o cliente: ${response.statusText}`);
    }

    console.log('Cliente deletado com sucesso');
  } catch (error) {
    console.error('Erro:', error);
  }
}
