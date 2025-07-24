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
        @submit="submitForm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import TablaSintomas from "@/components/ui/tablas/TablaSintomas.vue";
import sintomasData from "@/components/mocks/data/sintomas.js";
import { createPacienteSintoma } from "@/services/pacienteSintomaService";
import $style from "./MonitoreoPacientes.module.scss";

interface Sintoma {
  activo: boolean;
  tipo: "nivel" | "numerico";
  valor: string;
  id: number; // Debe estar presente en los datos
}

// Adaptar los mocks para incluir id (temporal, hasta que los mocks tengan id real)
const sintomas = ref<Record<string, Sintoma>>(
  Object.fromEntries(
    Object.entries(sintomasData.value).map(([k, v], idx) => [
      k,
      Object.assign({}, v, { id: idx + 1 }) as Sintoma,
    ])
  )
);

const pacienteId = 1; // TODO: obtener dinámicamente según el paciente autenticado

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
  const acciones: Promise<any>[] = [];

  Object.values(sintomas.value).forEach((s) => {
    if (s.activo) {
      acciones.push(
        createPacienteSintoma({
          paciente_id: pacienteId,
          fecha,
          sintoma_id: s.id,
        })
      );
    }
  });

  try {
    await Promise.all(acciones);
    limpiarTodos();
  } catch (e) {
    console.error("Error al guardar síntomas:", e);
  }
}
</script>
