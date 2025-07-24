<!-- src/components/ui/tablas/TablaSintomas.vue -->
<template>
  <div class="tabla-sintomas-wrapper">
    <h2 class="text-center text-success mb-4">{{ title }}</h2>

    <div class="text-center mb-3">
      <button
        class="btn btn-outline-success me-2"
        type="button"
        @click="$emit('select-all')"
      >
        Seleccionar todos
      </button>
      <button
        class="btn btn-outline-danger"
        type="button"
        @click="$emit('clear-all')"
      >
        Limpiar todos
      </button>
    </div>

    <form @submit.prevent="$emit('submit-sintomas')">
      <table class="table table-striped table-bordered align-middle">
        <thead class="table-success">
          <tr>
            <th>Seleccionar</th>
            <th>Síntoma</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(estado, nombre) in sintomas" :key="nombre">
            <td><input type="checkbox" v-model="estado.activo" /></td>
            <td>{{ formatear(nombre) }}</td>
            <td>
              <template v-if="estado.activo">
                <select
                  v-if="estado.tipo === 'nivel'"
                  v-model="estado.valor"
                  class="form-select form-select-sm"
                  required
                >
                  <option value="Leve">Leve</option>
                  <option value="Moderado">Moderado</option>
                  <option value="Grave">Grave</option>
                </select>

                <input
                  v-else-if="estado.tipo === 'numerico'"
                  type="number"
                  v-model="estado.valor"
                  class="form-control form-control-sm"
                  placeholder="Ingresa valor"
                  required
                />
              </template>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="text-center">
        <button class="btn btn-success" type="submit">Enviar Síntomas</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface Sintoma {
  activo: boolean;
  tipo: "nivel" | "numerico";
  valor: string;
}

const props = defineProps<{
  sintomas: Record<string, Sintoma>;
  title?: string;
}>();

const emit = defineEmits<{
  (e: "select-all"): void;
  (e: "clear-all"): void;
  (e: "submit-sintomas"): void;
}>();

/** Formatea la clave a un título legible */
const formatear = (str: string) =>
  str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
</script>
