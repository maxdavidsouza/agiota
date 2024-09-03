'use server'

//Deve ser alterado de acordo com o novo token gerado (DEBUG)
const tokenDeAcesso = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJCWFYtWFFMZDlXTXI4NjBnMGpXWjBKTHlqRWR4RFBwaGp5SGVVYm1VM1FrIn0.eyJleHAiOjE3MjUzNDA2ODksImlhdCI6MTcyNTM0MDM4OSwianRpIjoiYWIwYTVmYmItNjJiNC00YWMyLWJhYmYtOWJhNTU2YmJhZTY3IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgxL3JlYWxtcy9zcHJpbmdib290LWFnaW90YS1yZWFsbSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI0OGQwYzYyZS00YjlkLTRhNjEtOTg0NS1hYzkzN2U3MzMxZDEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZ2lvdGEtYmFja2VuZCIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtc3ByaW5nYm9vdC1hZ2lvdGEtcmVhbG0iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBvZmZsaW5lX2FjY2VzcyBwcm9maWxlIGVtYWlsIiwiY2xpZW50SG9zdCI6IjE3Mi4xOC4wLjEiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImNsaWVudElkIjoiYWdpb3RhLWJhY2tlbmQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtYWdpb3RhLWJhY2tlbmQiLCJjbGllbnRBZGRyZXNzIjoiMTcyLjE4LjAuMSJ9.o1o5agZkaN2hJE_EW1Ah4tcbsCerVl57L7mZiX0uVWo5ddUOwYlV6dsZFdxU5J2xvRNbVh5rL_YTazKTp3xMiPwD5wxQGmSyUfeS6QB7i7garVBbbXG55o4zNn_eB8YRsb8HUZTkBj_N5eEt3vsW1EXdN6XlZFJcooKNtmChcJ5mv3aJrFXuNugRq2yiahlnEL7mhzmOyy2HVfuI-D5XaE-dDa2h1Ml5OgJmcYQYmSbDFAt4TxQ2_-xmHqIvo3XdlfchA5pNEI6vtYBTleIFV8r3U57lO-VzvOVmOezeJnOx_FaDzpfUytfHHCw443bijkz7fL4SWZSuyHaq-eV31w';

//Funções Utilizadas pelo servidor para Alterar/Adquirir dados à partir da API
export async function listarClientes() {
  try {
    const response = await fetch('http://localhost:8080/api/clientes', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
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
    const response = await fetch('http://localhost:8080/api/agiotas', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
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
    const response = await fetch('http://localhost:8080/api/agiotas/' + agiota_id + '/emprestimos', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
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
    const response = await fetch('http://localhost:8080/api/clientes/' + cliente_id + '/emprestimos', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
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
    const response = await fetch('http://localhost:8080/api/emprestimos-publicados', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    const data = await response.json();
    return data;
  }
  catch(erro) {
    console.error("Empréstimos Públicos não encontrados.");
    return null;
  }
}

export async function listarLembretes(cliente_id) {
  try {
    const response = await fetch('http://localhost:8080/api/clientes/' + cliente_id + '/lembretes', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    const data = await response.json();
    return data;
  }
  catch(erro) {
    console.error("Lembretes não foram encontrados.");
    return null;
  }
}

export async function carregarCliente(id) {
  try {
    const clienteData = await fetch ('http://localhost:8080/api/clientes/' + id, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
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
    const agiotaData = await fetch ('http://localhost:8080/api/agiotas/' + id, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
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
    const emprestimoData = await fetch ('http://localhost:8080/api/agiotas/' + agiota_id + '/emprestimos/' + emprestimo_id, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
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
    const emprestimoData = await fetch ('http://localhost:8080/api/clientes/' + cliente_id + '/emprestimos/' + emprestimo_id, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
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
    const emprestimoData = await fetch ('http://localhost:8080/api/emprestimos-publicados/' + emprestimo_id, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
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
    const emprestimoData = await fetch ('http://localhost:8080/api/emprestimos/' + emprestimo_id + '/parcelas/' + parcela_id, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
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
          'Authorization': `Bearer ${tokenDeAcesso}`,
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
          'Authorization': `Bearer ${tokenDeAcesso}`,
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

  try {
    const response = await fetch('http://localhost:8080/api/agiotas/'+agiota_id+'/emprestimos', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
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

export async function cadastrarPagamento(cliente_id, emprestimo_id, parcela_id, formData) {

  console.log('JSON enviado: ', JSON.stringify(formData, null, 2));

  try {
    const response = await fetch('http://localhost:8080/api/clientes/'+cliente_id+'/emprestimos/'+emprestimo_id+'/parcelas/'+parcela_id+'/pagamentos', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
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

export async function cadastrarLembrete(cliente_id, emprestimo_id, parcela_id, formData) {

  console.log('JSON enviado: ', JSON.stringify(formData, null, 2));

  try {
    const response = await fetch('http://localhost:8080/api/clientes/'+cliente_id+'/emprestimos/'+emprestimo_id+'/parcelas/'+parcela_id+'/gerar-lembrete', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
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
        'Authorization': `Bearer ${tokenDeAcesso}`,
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
        'Authorization': `Bearer ${tokenDeAcesso}`,
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
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json',
      },
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
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json',
      },
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
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json',
      },
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
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar o empréstimo: ${response.statusText}`);
    }

    console.log('Empréstimo deletado com sucesso');
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function removerLembrete(lembrete_id) {
  try {
    const response = await fetch('http://localhost:8080/api/mensagens/'+ lembrete_id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenDeAcesso}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar o lembrete: ${response.statusText}`);
    }

    console.log('Lembrete deletado com sucesso');
  } catch (error) {
    console.error('Erro:', error);
  }
}