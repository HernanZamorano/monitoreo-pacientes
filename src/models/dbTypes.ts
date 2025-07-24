// src/models/dbTypes.ts

// 1. Enums (clonados de tus CREATE TYPE)
export enum TipoUsuario {
  Administrador = "administrador",
  MedicoFuncionario = "médico/funcionario",
  Paciente = "paciente",
}

export enum TipoUnidad {
  Clinica = "clínica",
  Hospital = "hospital",
  Cesfam = "cesfam",
}

export enum EstadoSemaforo {
  Verde = "verde",
  Amarillo = "amarillo",
  Rojo = "rojo",
}

export enum EstadoAlerta {
  Activa = "Activa",
  Atendida = "Atendida",
  Cancelada = "Cancelada",
}

// 2. Interfaces de tablas principales

/** Usuario básico */
export interface Usuario {
  id: number; // SERIAL PRIMARY KEY
  rut: string; // VARCHAR(12) UNIQUE NOT NULL
  nombre: string; // VARCHAR(100)
  clave?: string; // VARCHAR(255) (puede ser undefined si el usuario tiene 'password' en vez de 'clave')
  password?: string; // Alternativa para compatibilidad con datos legacy
  tipo_usuario: TipoUsuario;
  email: string;
  genero: string;
  fecha_nacimiento: string; // ISO string, snake_case para coincidir con backend
  telefono: string;
  rol?: string; // Opcional, para compatibilidad con datos legacy
}

/** Datos de médico o funcionario */
export interface MedicoFuncionario {
  id: number; // SERIAL PRIMARY KEY
  usuario_id: number; // FK → Usuario.id
  profesion?: string; // VARCHAR(50)
  telefono: string; // VARCHAR(20)
  email: string; // VARCHAR(100) UNIQUE
  unidad_referencia_id: number; // FK → UnidadReferencia.id
}

/** Datos de paciente */
export interface Paciente {
  id: number; // SERIAL PRIMARY KEY
  usuario_id: number; // FK → Usuario.id
  direccion?: string;
  telefono: string; // VARCHAR(20)
  fecha_nacimiento?: string; // DATE (ISO string)
  fecha_diagnostico: string; // DATE (ISO string)
}

/** Relación paciente ↔ médico */
export interface PacienteMedico {
  paciente_id: number; // FK → Paciente.id
  medico_id: number; // FK → MedicoFuncionario.id
}

/** Unidad de referencia */
export interface UnidadReferencia {
  id: number;
  nombre: string;
  direccion: string;
  tipo: TipoUnidad;
  telefono: string;
}

/** Síntoma básico */
export interface Sintoma {
  id: number;
  nombre: string;
  puntuacion: number;
}

/** Registro de síntoma asociado a paciente */
export interface PacienteSintoma {
  paciente_id: number; // FK → Paciente.id
  fecha: string; // DATE (ISO string)
  sintoma_id: number; // FK → Sintoma.id
}

/** Registro diario resumido */
export interface RegistroSintomasDiarios {
  id: number;
  paciente_id: number;
  fecha: string; // DATE
  valoracion: number;
  estado: EstadoSemaforo;
}

/** Indicaciones médicas */
export interface Indicacion {
  id: number;
  paciente_id: number; // FK → Paciente.id
  descripcion: string;
  horarios: string; // VARCHAR(150)
}

/** Bitácora de comentarios */
export interface Bitacora {
  id: number;
  paciente_id: number;
  fecha: string; // TIMESTAMP
  profesional_id?: number; // FK → MedicoFuncionario.id | null
  comentario: string;
}

/** Diagnóstico principal */
export interface Diagnostico {
  id: number;
  paciente_id: number; // FK → Paciente.id
  fecha: string; // DATE
}

/** Patología registrada */
export interface Patologia {
  id: number;
  nombre: string;
}

/** Relación diagnóstico ↔ patología */
export interface DiagnosticoPatologia {
  id: number;
  diagnostico_id: number; // FK → Diagnostico.id
  patologia_id: number; // FK → Patologia.id
}

/** Alerta generada */
export interface Alerta {
  id: number;
  paciente_id: number; // FK → Paciente.id
  fecha: string; // DATE
  motivo: string;
  registro_sintomas_id?: number; // FK → RegistroSintomasDiarios.id
  profesional_notificado?: number; // FK → MedicoFuncionario.id
}

/** Evento de botón de pánico */
export interface BotonPanico {
  id: number;
  paciente_id: number; // FK → Paciente.id
  fecha: string; // TIMESTAMP
  estado_alerta: EstadoAlerta;
  profesional_notificado?: number; // FK → MedicoFuncionario.id
  fecha_atencion?: string; // TIMESTAMP
}
