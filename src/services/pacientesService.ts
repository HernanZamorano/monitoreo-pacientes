import API from "./api";
import type { Paciente } from "@/models/dbTypes";

export function fetchPacientes(): Promise<Paciente[]> {
  return API.get("/pacientes").then((res) => res.data);
}

export function fetchPaciente(id: number): Promise<Paciente> {
  return API.get(`/pacientes/${id}`).then((res) => res.data);
}

export function createPaciente(p: Omit<Paciente, "id">): Promise<Paciente> {
  return API.post("/pacientes", p).then((res) => res.data);
}

export function updatePaciente(
  id: number,
  changes: Partial<Paciente>
): Promise<Paciente> {
  return API.patch(`/pacientes/${id}`, changes).then((res) => res.data);
}

export function deletePaciente(id: number): Promise<void> {
  return API.delete(`/pacientes/${id}`).then(() => {});
}
