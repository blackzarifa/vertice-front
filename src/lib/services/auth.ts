export interface LoginRequest {
	cpf: string;
	senha: string;
}

export interface FuncionarioLoginInfo {
	id: number;
	nome: string;
	codigoFuncionario: string;
	cargo: string;
}

export interface LoginResponse {
	token: string;
	funcionario: FuncionarioLoginInfo;
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
	const response = await fetch('http://localhost:8080/api/v1/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(credentials)
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || 'Login failed');
	}

	return response.json();
}

export function getAuthToken(): string | null {
	return sessionStorage.getItem('token');
}

export function getFuncionario(): FuncionarioLoginInfo | null {
	const data = sessionStorage.getItem('funcionario');
	return data ? JSON.parse(data) : null;
}

export function clearAuth(): void {
	sessionStorage.removeItem('token');
	sessionStorage.removeItem('funcionario');
}

export function isAuthenticated(): boolean {
	return !!getAuthToken();
}

export async function requestOTP(cpf: string): Promise<void> {
	const response = await fetch(
		'http://localhost:8080/api/v1/auth/otp/request',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ cpf })
		}
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || 'Failed to request OTP');
	}
}

export async function verifyOTP(cpf: string, otp: string): Promise<void> {
	const response = await fetch('http://localhost:8080/api/v1/auth/otp/verify', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ cpf, otp })
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || 'Invalid OTP');
	}
}
