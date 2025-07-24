// src/services/usuariosService.ts
import API from './api';
import type { Usuario } from '@/models/dbTypes';

export function fetchUsuarios(): Promise<Usuario[]> {
  return API.get('/usuarios').then(res => res.data);
}

export function fetchUsuario(id: number): Promise<Usuario> {
  return API.get(`/usuarios/${id}`).then(res => res.data);
}

export function createUsuario(usuario: Omit<Usuario, 'id'>): Promise<Usuario> {
  return API.post('/usuarios', usuario).then(res => res.data);
}

export function updateUsuario(id: number, changes: Partial<Usuario>): Promise<Usuario> {
  return API.patch(`/usuarios/${id}`, changes).then(res => res.data);
}

export function deleteUsuario(id: number): Promise<void> {
  return API.delete(`/usuarios/${id}`).then(() => {});
}
