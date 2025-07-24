<template>
  <div :class="$style.wrapper">
    <div :class="$style.cardContainer">
      <h2 class="text-center text-success mb-4">Historial de Síntomas</h2>

      <div v-if="!registroHoy" class="alert alert-warning text-center">
        No has registrado tus síntomas hoy. Recuerda hacerlo diariamente.
      </div>

      <b-button
        v-if="historialDiario.length"
        variant="success"
        class="d-block mx-auto mb-3"
        @click="borrarHistorial"
      >
        Borrar historial
      </b-button>

      <div v-if="!historialDiario.length" class="text-center text-muted">
        No tienes registros anteriores.
      </div>

      <b-table
        v-else
        :items="historialCompleto"
        :fields="fields"
        responsive="sm"
        striped
        bordered
        small
      >
        <!-- Columna Síntomas: listamos clave:valor -->
        <template #cell(sintomas)="row">
          <ul :class="$style.sintomaLista">
            <li
              v-for="(valor, nombre) in row.item.sintomas"
              :key="nombre"
              :class="$style.sintomaItem"
            >
              <span :class="$style.sintomaNombre">{{
                formatearNombre(nombre)
              }}</span
              >: {{ valor }}
            </li>
          </ul>
        </template>

        <!-- Columna Estado: renderizamos el SemaforoNivel -->
        <template #cell(estado)="row">
          <SemaforoAlerta :sintomas="row.item.sintomas" />
        </template>
      </b-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import {
  fetchRegistrosDiarios,
  fetchDetalleSintomas,
  fetchDetallePorPaciente,
  RegistroDiario,
  DetalleSintoma,
} from "@/services/historialService";
import { fetchSintomas, SintomaDB } from "@/services/sintomasService"; // ← importa esto
import { BTable, BButton } from "bootstrap-vue-3";
import SemaforoAlerta from "@ui/semaforo-nivel/SemaforoNivel.vue";
import axios from "axios"; // ← aquí

interface TablaItem {
  id: number;
  fecha: string;
  sintomas: Record<string, string>;
  estado: string;
}

const pacienteId = 1; // obtén dinámico si es necesario
const historialDiario = ref<RegistroDiario[]>([]);
const detalle = ref<DetalleSintoma[]>([]);
const registroHoy = ref(false);
const sintomasList = ref<SintomaDB[]>([]); // ← almacena todos los síntomas

const formatearNombre = (str: string | number) => {
  const s = String(str);
  return s.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
};

const nombrePorId = computed(() => {
  const m = new Map<number, string>();
  sintomasList.value.forEach((s) => m.set(s.id, s.nombre));
  return m;
});

onMounted(async () => {
  // 0) trae lista de síntomas para el lookup
  sintomasList.value = await fetchSintomas();

  // 1) trae resumen diario (opcional, si quieres semáforo)
  historialDiario.value = await fetchRegistrosDiarios(pacienteId);

  // 2) trae TODOS los síntomas reportados por el paciente
  detalle.value = await fetchDetallePorPaciente(pacienteId);

  // 3) bandera hoy (opcional)
  registroHoy.value = historialDiario.value.some(
    (r) => r.fecha === new Date().toISOString().slice(0, 10)
  );
});

const borrarHistorial = async () => {
  for (const r of historialDiario.value) {
    await axios.delete(
      `http://localhost:3001/registros_sintomas_diarios/${r.id}`
    );
  }
  historialDiario.value = [];
  registroHoy.value = false;
};

// Agrupa detalle.value por fecha
const historialCompleto = computed(() => {
  const grupos: Record<string, Record<string, string>> = {};
  detalle.value.forEach((d) => {
    const fecha = d.fecha;
    if (!grupos[fecha]) grupos[fecha] = {};
    grupos[fecha][nombrePorId.value.get(d.sintoma_id)!] = d.valor;
  });
  // conviertes a un array de objetos { fecha, sintomas }
  return Object.entries(grupos).map(([fecha, sintomas]) => ({
    fecha,
    sintomas,
  }));
});

// 4) Combina para la tabla
const tablaItems = computed<TablaItem[]>(() =>
  historialDiario.value.map((r) => {
    const sintomasHoy = detalle.value
      .filter((d) => d.fecha === r.fecha)
      .reduce((acc, d) => {
        const nombre =
          nombrePorId.value.get(d.sintoma_id) ?? `#${d.sintoma_id}`;
        acc[nombre] = d.valor;
        return acc;
      }, {} as Record<string, string>);

    return {
      id: r.id,
      fecha: r.fecha,
      sintomas: sintomasHoy,
      estado: r.estado,
    };
  })
);

const fields = [
  { key: "fecha", label: "Fecha" },
  { key: "sintomas", label: "Síntomas" },
  { key: "estado", label: "Estado" },
];
</script>

<style module src="./HistorialSintomas.module.scss" lang="scss" />
