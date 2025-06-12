<template>
  <div class="formulario-sintomas">
    <h2>Formulario de Síntomas</h2>

    <div class="acciones-globales">
      <button type="button" @click="seleccionarTodos">Seleccionar todos</button>
      <button type="button" @click="limpiarTodos">Limpiar todos</button>
    </div>

    <form @submit.prevent="submitForm">
      <table class="tabla-sintomas">
        <thead>
          <tr>
            <th>Seleccionar</th>
            <th>Síntoma</th>
            <th>Nivel</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(estado, nombre) in sintomas" :key="nombre">
            <td>
              <input type="checkbox" v-model="estado.activo" />
            </td>
            <td>{{ formatearNombre(nombre) }}</td>
            <td>
              <select v-if="estado.activo" v-model="estado.nivel" required>
                <option value="Leve">Leve</option>
                <option value="Moderado">Moderado</option>
                <option value="Grave">Grave</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <button type="submit">Enviar Síntomas</button>
    </form>

    <HistorialSintomas />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HistorialSintomas from './HistorialSintomas.vue'

// 20 síntomas
const sintomas = ref({
  tos: { activo: false, nivel: 'Leve' },
  fiebre: { activo: false, nivel: 'Leve' },
  dolorMuscular: { activo: false, nivel: 'Leve' },
  dolorCabeza: { activo: false, nivel: 'Leve' },
  dificultadRespirar: { activo: false, nivel: 'Leve' },
  fatiga: { activo: false, nivel: 'Leve' },
  escalofrios: { activo: false, nivel: 'Leve' },
  congestionNasal: { activo: false, nivel: 'Leve' },
  dolorGarganta: { activo: false, nivel: 'Leve' },
  perdidaOlfato: { activo: false, nivel: 'Leve' },
  perdidaGusto: { activo: false, nivel: 'Leve' },
  nauseas: { activo: false, nivel: 'Leve' },
  vomitos: { activo: false, nivel: 'Leve' },
  diarrea: { activo: false, nivel: 'Leve' },
  dolorPecho: { activo: false, nivel: 'Leve' },
  sudoracionExcesiva: { activo: false, nivel: 'Leve' },
  mareos: { activo: false, nivel: 'Leve' },
  palpitaciones: { activo: false, nivel: 'Leve' },
  dolorArticular: { activo: false, nivel: 'Leve' },
  insomnio: { activo: false, nivel: 'Leve' }
})

// Convierte camelCase a "Nombre legible"
const formatearNombre = (str: string) =>
  str.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())

const seleccionarTodos = () => {
  for (const clave in sintomas.value) {
    sintomas.value[clave].activo = true
  }
}

const limpiarTodos = () => {
  for (const clave in sintomas.value) {
    sintomas.value[clave].activo = false
    sintomas.value[clave].nivel = 'Leve'
  }
}

const submitForm = () => {
  const sintomasReportados: Record<string, string> = {}

  for (const clave in sintomas.value) {
    const sintoma = sintomas.value[clave]
    if (sintoma.activo) {
      sintomasReportados[clave] = sintoma.nivel
    }
  }

  const nuevoRegistro = {
    fecha: new Date().toLocaleDateString(),
    sintomas: sintomasReportados
  }

  const historial = localStorage.getItem('historialSintomas')
  const historialParsed = historial ? JSON.parse(historial) : []
  historialParsed.push(nuevoRegistro)
  localStorage.setItem('historialSintomas', JSON.stringify(historialParsed))

  limpiarTodos()
}
</script>

<style scoped>
.formulario-sintomas {
  background-color: #f1f8e9;
  padding: 2rem;
  border-radius: 1rem;
  margin-top: 1rem;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
}

h2 {
  color: #2e7d32;
  margin-bottom: 1.5rem;
  text-align: center;
}

.acciones-globales {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.acciones-globales button {
  background-color: #a5d6a7;
  color: #1b5e20;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.acciones-globales button:hover {
  background-color: #81c784;
}

.tabla-sintomas {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

.tabla-sintomas th,
.tabla-sintomas td {
  border: 1px solid #c8e6c9;
  padding: 0.75rem;
  text-align: left;
}

.tabla-sintomas th {
  background-color: #a5d6a7;
  color: #1b5e20;
}

.tabla-sintomas td select {
  width: 100%;
  padding: 0.3rem;
  border-radius: 0.3rem;
  border: 1px solid #a5d6a7;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  display: block;
  margin: 0 auto;
}

button[type="submit"]:hover {
  background-color: #388e3c;
}
</style>
