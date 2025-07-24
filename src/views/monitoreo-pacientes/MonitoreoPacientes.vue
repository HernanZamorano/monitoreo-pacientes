<!-- src/views/monitoreo-pacientes/MonitoreoPacientes.vue -->
<template>
  <div :class="$style.wrapper">
    <div :class="$style.cardContainer">
      <h2 class="text-center text-success mb-4">Formulario sintomas</h2>
      <hr />

      <TablaSintomas
        :sintomas="sintomas"
        @select-all="seleccionarTodos"
        @clear-all="limpiarTodos"
        @submit-sintomas="submitForm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import TablaSintomas from "@/components/ui/tablas/TablaSintomas.vue";
import { fetchSintomas, SintomaDB } from "@/services/sintomasService";
import { createPacienteSintoma } from "@/services/pacienteSintomaService";
import {
  createRegistroDiario,
  fetchDetalleSintomas,
} from "@/services/historialService";
import $style from "./MonitoreoPacientes.module.scss";

interface SintomaState {
  activo: boolean;
  tipo: "nivel" | "numerico";
  valor: string;
  id: number;
}

const pacienteId = 1; // o dinámico via useRoute()

// El estado de la tabla: clave → objeto con activo, valor, tipo, id
const sintomas = ref<Record<string, SintomaState>>({});

onMounted(async () => {
  // 1) Traer del backend
  const lista = await fetchSintomas();

  // 2) Inicializar el estado con tipo/valor por defecto
  const inicial: Record<string, SintomaState> = {};
  lista.forEach((s: SintomaDB) => {
    // asume que nombre en DB coincide con clave en mock (camelCase)
    inicial[s.nombre] = {
      activo: false,
      valor: s.puntuacion > 1 ? "Leve" : "",
      tipo: ["temperatura", "frecuenciaCardiaca", "saturacionOxigeno"].includes(
        s.nombre
      )
        ? "numerico"
        : "nivel",
      id: s.id,
    };
  });
  sintomas.value = inicial;
});

/** Marca todos como activos */
function seleccionarTodos() {
  Object.values(sintomas.value).forEach((s) => (s.activo = true));
}

/** Limpia todos y resetea valor */
function limpiarTodos() {
  Object.values(sintomas.value).forEach((s) => {
    s.activo = false;
    s.valor = s.tipo === "nivel" ? "Leve" : "";
  });
}

/** Envía al backend */
async function submitForm() {
  const fecha = new Date().toISOString().slice(0, 10);
  const tareas: Promise<any>[] = [];

  Object.values(sintomas.value).forEach((s) => {
    if (s.activo) {
      tareas.push(
        createPacienteSintoma({
          paciente_id: pacienteId,
          fecha,
          sintoma_id: s.id,
          valor: s.valor,
        })
      );
    }
  });

  await Promise.all(tareas);

  // 💡 Ahora calculas la valoración y el estado
  const detalles = await fetchDetalleSintomas(pacienteId, fecha);
  // Calcula la valoración sumando puntuaciones según tipo y valor
  let valoracion = 0;
  detalles.forEach((d) => {
    // Busca el síntoma en la lista para obtener puntuación base
    const sintoma = Object.values(sintomas.value).find(
      (s) => s.id === d.sintoma_id
    );
    let puntaje = sintoma ? 0 : 0;
    if (sintoma) {
      if (sintoma.tipo === "nivel") {
        puntaje =
          d.valor === "Leve"
            ? 1
            : d.valor === "Moderado"
            ? 2
            : d.valor === "Grave"
            ? 3
            : 0;
      } else {
        // Para numéricos, puedes ajustar la lógica según tu negocio
        puntaje = Number(d.valor) ? 1 : 0;
      }
    }
    valoracion += puntaje;
  });
  const estado =
    valoracion < 20 ? "verde" : valoracion < 50 ? "amarillo" : "rojo";

  // Inserta el resumen diario
  await createRegistroDiario({
    paciente_id: pacienteId,
    fecha,
    valoracion,
    estado,
  });

  limpiarTodos();
}
</script>
