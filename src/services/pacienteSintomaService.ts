// src/services/pacienteSintomaService.ts
import API from './api';

export interface PacienteSintomaPayload {
  paciente_id: number;
  fecha: string;        // 'YYYY-MM-DD'
  sintoma_id: number;
}

export function createPacienteSintoma(
  payload: PacienteSintomaPayload
): Promise<PacienteSintomaPayload> {
  return API.post('/paciente_sintoma', payload).then(res => res.data);
}
