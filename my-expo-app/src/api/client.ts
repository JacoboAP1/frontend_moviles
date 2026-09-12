const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8080/oficiar';

let token: string | null = null;

export function setToken(value: string | null): void {
  token = value;
}

export function getToken(): string | null {
  return token;
}

export async function request<T>(
  path: string,
  body?: unknown,
  method?: string,
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      method: method ?? (body === undefined ? 'GET' : 'POST'),
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new Error(`No se pudo conectar con ${API_URL}. ¿Está encendido el servidor?`);
  }

  if (method === 'DELETE' && response.status === 204) {
    return {} as T;
  }

  const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;

  if (!response.ok) {
    const raw =
      typeof data['message'] === 'string' ? data['message'] :
      typeof data['error'] === 'string' ? data['error'] : null;
    const message = raw === 'Bad credentials' ? 'Credenciales incorrectas' : raw;
    throw new Error(message ?? `Error ${response.status} al llamar ${path}`);
  }

  return data as T;
}
