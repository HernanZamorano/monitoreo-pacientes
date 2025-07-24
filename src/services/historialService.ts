// src/services/historialService.ts
import API from "./api";

export interface RegistroDiario {
  id: number;
  paciente_id: number;
  fecha: string;
  valoracion: number;
  estado: string;
}

export function fetchRegistrosDiarios(
  paciente_id: number
): Promise<RegistroDiario[]> {
  return API.get(`/registros_sintomas_diarios?paciente_id=${paciente_id}`).then(
    (res) => res.data
  );
}

export interface DetalleSintoma {
  paciente_id: number;
  fecha: string;
  sintoma_id: number;
  valor: string;
}

export function fetchDetalleSintomas(
  paciente_id: number,
  fecha: string
): Promise<DetalleSintoma[]> {
  return API.get(
    `/paciente_sintoma?paciente_id=${paciente_id}&fecha=${fecha}`
  ).then((res) => res.data);
}

export function fetchDetallePorPaciente(
  paciente_id: number
): Promise<DetalleSintoma[]> {
  return API.get(`/paciente_sintoma?paciente_id=${paciente_id}`).then(
    (res) => res.data
  );
}

export interface RegistroDiarioPayload {
  paciente_id: number;
  fecha: string;
  valoracion: number;
  estado: string;
}

export function createRegistroDiario(
  payload: RegistroDiarioPayload
): Promise<any> {
  return API.post("/registros_sintomas_diarios", payload).then(
    (res) => res.data
  );
}
