// src/composables/useUsuarios.ts
import { ref } from 'vue';
import * as service from '@/services/usuariosService';
import type { Usuario } from '@/models/dbTypes';

export function useUsuarios() {
  const usuarios = ref<Usuario[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function load() {
    loading.value = true;
    try {
      usuarios.value = await service.fetchUsuarios();
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  return { usuarios, loading, error, load };
}
