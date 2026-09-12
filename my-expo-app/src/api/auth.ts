import type { Role } from '../types';
import { request } from './client';

interface AuthResponse {
  token_type: string;
  roles: Role[];
  access_token: string;
}

export async function login(email: string, password: string) {
  const data = await request<AuthResponse>('/auth/login', { email, password });
  return { token: data.access_token, roles: data.roles };
}

interface RegisterParams {
  username: string;
  email: string;
  password: string;
  telefono: string;
  roles: Role[];
  perfilIds?: number[];
}

export async function register(params: RegisterParams) {
  const body: Record<string, unknown> = {
    username: params.username,
    email: params.email,
    password: params.password,
    telefono: params.telefono,
    roles: params.roles,
  };

  if (params.perfilIds?.length) {
    body.perfilIds = params.perfilIds;
  }

  const data = await request<AuthResponse>('/auth/register', body);
  return { token: data.access_token, roles: data.roles };
}
