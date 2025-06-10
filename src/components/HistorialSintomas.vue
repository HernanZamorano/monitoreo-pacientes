<template>
  <div class="historial">
    <h2>Historial de Síntomas</h2>

    <div v-if="historial.length === 0" class="sin-registros">
      <p>No tienes registros anteriores.</p>
    </div>

    <div v-else>
      <ul>
        <li v-for="(registro, index) in historial" :key="index" class="registro">
          <h3>{{ registro.fecha }}</h3>
          <p>Síntomas: {{ formatearSintomas(registro.sintomas) }}</p>
          <SemaforoAlerta :sintomas="registro.sintomas" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SemaforoAlerta from './SemaforoAlerta.vue'

interface RegistroSintomas {
  fecha: string
  sintomas: {
    [key: string]: string
  }
}

const historial = ref<RegistroSintomas[]>([])

onMounted(() => {
  const registrosGuardados = localStorage.getItem('historialSintomas')
  if (registrosGuardados) {
    historial.value = JSON.parse(registrosGuardados)
  }
})

const agregarAlHistorial = (nuevoRegistro: RegistroSintomas) => {
  historial.value.push(nuevoRegistro)
  localStorage.setItem('historialSintomas', JSON.stringify(historial.value))
}

// Función para formatear los síntomas en un string legible
function formatearSintomas(sintomas: Record<string, string>): string {
  return Object.entries(sintomas)
    .map(([clave, valor]) => `${clave}: ${valor}`)
    .join(', ')
}
</script>

<style scoped>
.historial {
  padding: 1.5rem;
  margin-top: 2rem;
  background-color: #e8f5e9; /* verde muy claro */
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.1);
}

h2 {
  color: #2e7d32;
  margin-bottom: 1rem;
}

.sin-registros {
  color: #009999;
  font-style: italic;
}

.registro {
  margin: 1rem 0;
  padding: 1rem;
  background-color: #009999; /* verde pastel */
  border-radius: 0.5rem;
  border: 1px solid #00ec82bc;
  text-align: left;
}

h3 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: #fdfdfd;
}
</style>

