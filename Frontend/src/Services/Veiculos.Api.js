const API_URL = "http://localhost:3001";

// Função para cadastrar um veiculo
export async function cadastrarVeiculo({
  placa,
  modelo,
  cor,
  Box,
  Moradores_id,
}) {
  const response = await fetch(`${API_URL}/veiculos/veiculos/cadastro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ placa, modelo, cor, Box, Moradores_id }),
  });

  return response.json();
}

// Função para listar os veiculos
export async function listarVeiculo() {
  const response = await fetch(`${API_URL}/veiculos/veiculos/lista`);
  return response.json();
}

//função para atualizar um veiculo
export async function atualizarVeiculo(
  idVeiculos,
  placa,
  modelo,
  cor,
  Box,
  Moradores_id
) {
  const response = await fetch(
    `${API_URL}/veiculos/veiculos/${idVeiculos}/update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ placa, modelo, cor, Box, Moradores_id }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Erro na atualização:", errorData);
    throw new Error("Erro ao atualizar veículo");
  }

  return response.json();
}

// Função para deletar um veiculo
export async function deletarVeiculo(idVeiculos) {
  const response = await fetch(
    `${API_URL}/veiculos/veiculos/${idVeiculos}/delete`,
    {
      method: "DELETE",
    }
  );

  return response.json();
}
