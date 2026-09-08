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

export async function register(username: string, email: string, password: string, roles: Role[] = ['ROLE_WORKER']) {
  const data = await request<AuthResponse>('/auth/register', { username, password, email, roles });
  return { token: data.access_token, roles: data.roles };
}
