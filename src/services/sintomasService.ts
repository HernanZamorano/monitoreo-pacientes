// src/services/sintomasService.ts
import API from "./api";

export interface SintomaDB {
  id: number;
  nombre: string;
  puntuacion: number;
}

export function fetchSintomas(): Promise<SintomaDB[]> {
  return API.get("/sintomas").then((res) => res.data);
}
