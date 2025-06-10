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
          <p>Sintomas: {{ registro.sintomas }}</p>
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
  // Obtener historial de localStorage
  const registrosGuardados = localStorage.getItem('historialSintomas')
  if (registrosGuardados) {
    historial.value = JSON.parse(registrosGuardados)
  }
})

// Almacenar un nuevo registro en el historial
const agregarAlHistorial = (nuevoRegistro: RegistroSintomas) => {
  historial.value.push(nuevoRegistro)
  localStorage.setItem('historialSintomas', JSON.stringify(historial.value))
}
</script>

<style scoped>
.historial {
  padding: 1.5rem;
  margin-top: 2rem;
  background-color: #dd3a3a;
  border-radius: 1rem;
  text-align: center;
}
.sin-registros {
  color: #888;
}
.registro {
  margin: 1rem 0;
  padding: 1rem;
  background-color: #5676b6;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
}
h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}
</style>
