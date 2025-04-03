const API_URL = "http://localhost:3001"; // URL da API

// Função para cadastrar um perfil/morador
export async function cadastrarPerfil(nome, telefone, email, status) {
  const response = await fetch(`${API_URL}/morador/morador/cadastro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome, telefone, email, status }),
  });

  return response.json();
}

// Função para listar os perfis/moradores
export async function listarPerfil() {
  const response = await fetch(`${API_URL}/morador/morador/lista`);
  return response.json();
}

//função para atualizar um perfil/morador
export async function atualizarPerfil(
  idMoradores,
  nome,
  telefone,
  email,
  status
) {
  const response = await fetch(
    `${API_URL}/morador/morador/${idMoradores}/update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, telefone, email, status }),
    }
  );

  return response.json();
}

// Função para deletar um perfil/morador
export async function deletarPerfil(idMoradores) {
  const response = await fetch(
    `${API_URL}/morador/morador/${idMoradores}/delete`,
    {
      method: "DELETE",
    }
  );

  return response.json();
}

// // Função para cadastrar um veiculo
// export async function cadastrarVeiculo(placa, modelo, cor, Moradores_id) {
//   const response = await fetch(`${API_URL}/veiculos/veiculos/cadastro`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ placa, modelo, cor, Moradores_id }),
//   });

//   return response.json();
// }

// // Função para listar os veiculos
// export async function listarVeiculo() {
//   const response = await fetch(`${API_URL}/veiculos/veiculos/lista`);
//   return response.json();
// }

// //função para atualizar um veiculo
// export async function atualizarVeiculo(idVeiculos, placa, modelo, cor) {
//   const response = await fetch(
//     `${API_URL}/veiculos/veiculos/${idVeiculos}/update`,
//     {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ placa, modelo, cor }),
//     }
//   );

//   return response.json();
// }

// // Função para deletar um veiculo
// export async function deletarVeiculo(idMoradores) {
//   const response = await fetch(`${API_URL}/perfil/${idMoradores}/delete`, {
//     method: "DELETE",
//   });

//   return response.json();
// }

// // Função para cadastrar um apartamento
// export async function cadastrarApartamento(placa, modelo, cor, Moradores_id) {
//   const response = await fetch(`${API_URL}/veiculos/veiculos/cadastro`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ placa, modelo, cor, Moradores_id }),
//   });

//   return response.json();
// }

// // Função para listar os apartamentos
// export async function listarApartamento() {
//   const response = await fetch(`${API_URL}/perfil/lista`);
//   return response.json();
// }

// //função para atualizar um apartamento
// export async function atualizarApartamento(
//   idMoradores,
//   nome,
//   telefone,
//   email,
//   status
// ) {
//   const response = await fetch(`${API_URL}/perfil/${idMoradores}/update`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ nome, telefone, email, status }),
//   });

//   return response.json();
// }

// // Função para deletar um apartamento
// export async function deletarApartamento(idMoradores) {
//   const response = await fetch(`${API_URL}/perfil/${idMoradores}/delete`, {
//     method: "DELETE",
//   });

//   return response.json();
// }
