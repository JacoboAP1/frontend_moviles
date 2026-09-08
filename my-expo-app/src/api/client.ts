const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8080/oficiar';

let token: string | null = null;

export function setToken(value: string | null): void {
  token = value;
}

export function getToken(): string | null {
  return token;
}

export async function request<T>(path: string, body?: unknown): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      method: body === undefined ? 'GET' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new Error(`No se pudo conectar con ${API_URL}. ¿Está encendido el servidor?`);
  }

  const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;

  if (!response.ok) {
    const message = typeof data['message'] === 'string' ? data['message'] : null;
    throw new Error(message ?? `Error ${response.status} al llamar ${path}`);
  }

  return data as T;
}
