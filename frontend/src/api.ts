import type { Caracteristica, FormData } from './types';

const API_URL = 'http://localhost:3000/caracteristicas';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    let message = `Error HTTP ${response.status}`;

    try {
      const body = await response.json();
      if (Array.isArray(body.message)) {
        message = body.message.join(', ');
      } else if (body.message) {
        message = body.message;
      }
    } catch {
      // La respuesta puede no tener JSON.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const api = {
  getAll: () => request<Caracteristica[]>(API_URL),

  create: (data: FormData) =>
    request<Caracteristica>(API_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<FormData>) =>
    request<Caracteristica>(`${API_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  remove: (id: number) =>
    request<void>(`${API_URL}/${id}`, {
      method: 'DELETE',
    }),
};
