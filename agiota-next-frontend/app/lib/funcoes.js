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

export async function listarEmprestimosDeAgiota(agiota_id) {
  try {
    const response = await fetch('http://localhost:8080/api/agiotas/' + agiota_id + '/emprestimos', {cache: 'no-store'});
    const data = await response.json();
    return data;
  }
  catch(erro) {
    console.error("Empréstimos do Agiota não encontrados.");
    return null;
  }
}

export async function listarEmprestimosDeCliente(cliente_id) {
  try {
    const response = await fetch('http://localhost:8080/api/clientes/' + cliente_id + '/emprestimos', {cache: 'no-store'});
    const data = await response.json();
    return data;
  }
  catch(erro) {
    console.error("Empréstimos do Cliente não encontrados.");
    return null;
  }
}

export async function listarEmprestimosPublicos() {
  try {
    const response = await fetch('http://localhost:8080/api/emprestimos-publicados', {cache: 'no-store'});
    const data = await response.json();
    return data;
  }
  catch(erro) {
    console.error("Empréstimos Públicos não encontrados.");
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

export async function carregarEmprestimoDeAgiota(agiota_id, emprestimo_id) {
  try {
    const emprestimoData = await fetch ('http://localhost:8080/api/agiotas/' + agiota_id + '/emprestimos/' + emprestimo_id, { cache: 'no-store' });
    const emprestimo = await emprestimoData.json();
    return emprestimo;
  }
  catch(erro) {
    console.error("Empréstimo de agiota não encontrado.");
    return null;
  }
}

export async function carregarEmprestimoDeCliente(cliente_id, emprestimo_id) {
  try {
    const emprestimoData = await fetch ('http://localhost:8080/api/clientes/' + cliente_id + '/emprestimos/' + emprestimo_id, { cache: 'no-store' });
    const emprestimo = await emprestimoData.json();
    return emprestimo;
  }
  catch(erro) {
    console.error("Empréstimo de cliente não encontrado.");
    return null;
  }
}

export async function carregarEmprestimoPublico(emprestimo_id) {
  try {
    const emprestimoData = await fetch ('http://localhost:8080/api/emprestimos-publicados/' + emprestimo_id, { cache: 'no-store' });
    const emprestimo = await emprestimoData.json();
    return emprestimo;
  }
  catch(erro) {
    console.error("Empréstimo Público não encontrado.");
    return null;
  }
}

export async function carregarParcela(emprestimo_id, parcela_id) {
  try {
    const emprestimoData = await fetch ('http://localhost:8080/api/emprestimos/' + emprestimo_id + '/parcelas/' + parcela_id, { cache: 'no-store' });
    const emprestimo = await emprestimoData.json();
    return emprestimo;
  }
  catch(erro) {
    console.error("Empréstimo Público não encontrado.");
    return null;
  }
}

export async function cadastrarCliente(formData) {

    console.log('JSON enviado:', JSON.stringify(formData, null, 2)); 

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

    console.log('JSON enviado:', JSON.stringify(formData, null, 2));

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

export async function cadastrarEmprestimo(agiota_id, formData) {

  console.log('JSON enviado: ', JSON.stringify(formData, null, 2));
  console.log('Id enviado: ',agiota_id);

  try {
    const response = await fetch('http://localhost:8080/api/agiotas/'+agiota_id+'/emprestimos', {
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

export async function darEmprestimo(id, emprestimo_id) {
  try {
    const response = await fetch('http://localhost:8080/api/agiotas/' + id + '/emprestimos-publicados/' + emprestimo_id + '/firmar-emprestimo', {
      method: 'PUT',
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

export async function pedirEmprestimo(id, emprestimo_id) {
  try {
    const response = await fetch('http://localhost:8080/api/clientes/' + id + '/emprestimos-publicados/' + emprestimo_id + '/firmar-emprestimo', {
      method: 'PUT',
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

export async function removerEmprestimo(agiota_id, emprestimo_id) {
  try {
    const response = await fetch('http://localhost:8080/api/agiotas/'+ agiota_id + '/emprestimos/' + emprestimo_id, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar o empréstimo: ${response.statusText}`);
    }

    console.log('Empréstimo deletado com sucesso');
  } catch (error) {
    console.error('Erro:', error);
  }
}
