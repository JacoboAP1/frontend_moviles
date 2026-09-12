import { request } from './client';

// TODO: Obtener datos del usuario autenticado
// request('/api/usuarios/ENDPOINT_QUE_DEFINAN')
export async function getMyProfile() {
  // TODO: request('EL BACKEND QUE USTED DEFINA') — GET, el token se envía automático
  return {};
}

// TODO: Actualizar datos del usuario (username, telefono)
// request('/api/usuarios/ENDPOINT_QUE_DEFINAN', { username, telefono }, 'PUT')
export async function updateProfile(data: { username?: string; telefono?: string }) {
  // TODO: request('EL BACKEND QUE USTED DEFINA, data, 'PUT')
  return {};
}
