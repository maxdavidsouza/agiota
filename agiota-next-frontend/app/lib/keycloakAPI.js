'use server'

export async function getToken() {
    const tokenUrl = process.env.KEYCLOAK_BACKEND_CLIENT_TOKEN_ENDPOINT;
    const clientId = process.env.KEYCLOAK_BACKEND_CLIENT_ID;
    const clientSecret = process.env.KEYCLOAK_BACKEND_CLIENT_SECRET;

    // Codifica client_id e client_secret em Base64
    const credentials = btoa(`${clientId}:${clientSecret}`);

    const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${credentials}`,
        },
        body: new URLSearchParams({
            grant_type: "client_credentials",
            scope: "openid offline_access",
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorText}`);
    }

    const data = await response.json();
    //console.log("TOKEN DO BACKEND: " + data.access_token);
    return data.access_token; // Retorna o access token
}

export async function cadastrarUsuarioNoKeycloak(firstName, username, password, roleName) {
    const tokenDeAcesso = await getToken();
    const userSettings = {
        username: username,
        email: username,
        emailVerified: false,
        enabled: true,
        firstName: firstName,
        lastName: "",
        credentials: [{
            type: 'password',
            value: password,
            temporary: false,
        }]
    };

    console.log('JSON enviado: ', JSON.stringify(userSettings));

    try {
        const response = await fetch(
            `${process.env.KEYCLOAK_API}/users`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${tokenDeAcesso}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userSettings),
            }
        );

        //Relacionando o Usuário com as Roles Existentes
        const clientId = await getClientIdByName("agiota-frontend");
        console.log("CLIENT ID: " + clientId);
        const userId = await getUserIdByEmail(username);
        console.log("USER ID: " + userId);
        const roleId = await getRoleByNameAndClientId(roleName, clientId);
        console.log("ROLE ID: " + roleId);
        await linkARoleToAUser(userId, clientId, roleId, roleName);

    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function atualizarUsuarioNoKeycloak(oldEmail, newName, newEmail, newPassword) {
    const userId = await getUserIdByEmail(oldEmail);
    const clientId = await getClientIdByName("agiota-frontend");
    const tokenDeAcesso = await getToken();
    const urlUser = `${process.env.KEYCLOAK_API}/users/${userId}`;

    // Passo 1: Obter as roles atuais do usuário
    const urlUserRoles = `${process.env.KEYCLOAK_API}/users/${userId}/role-mappings/clients/${clientId}`;
    const rolesResponse = await fetch(urlUserRoles, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenDeAcesso}`,
            'Content-Type': 'application/json'
        }
    });

    if (!rolesResponse.ok) {
        console.error('Error fetching user roles');
        return;
    }

    const existingRoles = await rolesResponse.json();
    
    console.log('Current roles:', existingRoles);

    // Passo 2: Atualizar o e-mail do usuário
    const updatedUserData = {
        firstName: newName,
        email: newEmail
    };

    const responseUserUpdate = await fetch(urlUser, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${tokenDeAcesso}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUserData)
    });

    if (!responseUserUpdate.ok) {
        const errorData = await responseUserUpdate.json();
        console.error('Error updating user email:', errorData);
        return;
    }

    console.log('User email updated successfully');

    // Passo 3: Atualizar a senha do usuário
    const urlPassword = `${process.env.KEYCLOAK_API}/users/${userId}/reset-password`;

    const updatedPasswordData = {
        type: "password",
        value: newPassword,
        temporary: false
    };

    const responsePasswordUpdate = await fetch(urlPassword, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${tokenDeAcesso}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPasswordData)
    });

    if (!responsePasswordUpdate.ok) {
        const errorData = await responsePasswordUpdate.json();
        console.error('Error updating user password:', errorData);
        return;
    }

    console.log('User password updated successfully');

    // Passo 4: Reatribuir as roles ao usuário (caso tenham sido perdidas)
    const urlAssignRoles = `${process.env.KEYCLOAK_API}/users/${userId}/role-mappings/clients/{clientId}`;
    const responseRoleAssignment = await fetch(urlAssignRoles, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${tokenDeAcesso}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(existingRoles)
    });

    if (!responseRoleAssignment.ok) {
        const errorData = await responseRoleAssignment.json();
        console.error('Error reassigning user roles:', errorData);
        return;
    }

    console.log('User roles re-assigned successfully');
}

export async function removerUsuarioNoKeycloak(email) {
    const userId = await getUserIdByEmail(email);
    const url = `${process.env.KEYCLOAK_API}/users/${userId}`;
    const tokenDeAcesso = await getToken();

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${tokenDeAcesso}`,
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log(`User with ID ${userId} deleted successfully.`);
    } else {
        const errorData = await response.json();
        console.error(`Error deleting user with ID ${userId}:`, errorData);
    }
}

export async function getUserIdByEmail(email) {
    const url = `${process.env.KEYCLOAK_API}/users?email=${encodeURIComponent(email)}`;
    const tokenDeAcesso = await getToken();
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenDeAcesso}`,
            'Content-Type': 'application/json'
        }
    });

    const users = await response.json();

    if (users.length > 0) {
        const userId = users[0].id;
        return userId;
    } else {
        console.log('No user found with the provided email.');
        return null;
    }
}

export async function getClientIdByName(clientName) {
    const url = `${process.env.KEYCLOAK_API}/clients`;
    const tokenDeAcesso = await getToken();
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenDeAcesso}`,
            'Content-Type': 'application/json'
        }
    });

    const clients = await response.json();
    const client = clients.find(client => client.clientId === clientName);

    if (client) {
        const clientId = client.id;
        return clientId;
    } else {
        console.log('No client found with the provided name.');
        return null;
    }
}

export async function getRoleByNameAndClientId(roleName, clientId) {
    const url = `${process.env.KEYCLOAK_API}/clients/${clientId}/roles`;
    const tokenDeAcesso = await getToken();
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenDeAcesso}`,
            'Content-Type': 'application/json'
        }
    });

    const roles = await response.json();
    // Adicione esta linha para verificar a estrutura dos dados retornados
    console.log('Roles data:', roles);
    const role = roles.find(role => role.name === roleName);

    if (role) {
        const roleId = role.id;
        return roleId;
    } else {
        console.log('No role found with the provided name.');
        return null;
    }
}

export async function linkARoleToAUser(userId, clientId, roleId, roleName) {
    const url = `${process.env.KEYCLOAK_API}/users/${userId}/role-mappings/clients/${clientId}`;
    const tokenDeAcesso = await getToken();
    console.log(url);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${tokenDeAcesso}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
            id: roleId,
            name: roleName
        }])
    });

    if (response.status != 204) {
        throw new Error(`Failed to assign role. Status: ${response.status}`);
    } else {
        console.log('Role assigned successfully.');
        return null;
    }
}