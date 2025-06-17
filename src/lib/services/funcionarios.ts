import { getAuthToken } from './auth';

export interface Funcionario {
	id_funcionario: number;
	codigo_funcionario: string;
	cargo: string;
	id_supervisor?: number;
	nome: string;
	cpf: string;
	data_nascimento: string;
	telefone: string;
	cep: string;
	local: string;
	numero_casa: number;
	bairro: string;
	cidade: string;
	estado: string;
}

export interface Endereco {
	cep: string;
	local: string;
	numero_casa: number;
	bairro: string;
	cidade: string;
	estado: string;
}

export interface CreateFuncionarioRequest {
	nome: string;
	cpf: string;
	data_nascimento: string;
	telefone: string;
	senha: string;
	codigo_funcionario: string;
	cargo: 'ESTAGIARIO' | 'ATENDENTE' | 'GERENTE';
	id_supervisor?: number;
	endereco: Endereco;
}

export async function getFuncionarios(): Promise<{
	count: number;
	data: Funcionario[];
}> {
	const token = getAuthToken();

	const response = await fetch('http://localhost:8080/api/v1/funcionarios', {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || 'Failed to fetch funcionarios');
	}

	return response.json();
}

export async function createFuncionario(
	data: CreateFuncionarioRequest
): Promise<void> {
	const token = getAuthToken();

	const response = await fetch('http://localhost:8080/api/v1/funcionarios', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || 'Failed to create funcionario');
	}
}
