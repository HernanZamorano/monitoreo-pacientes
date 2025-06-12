<template>
  <div class="historial">
    <h2>Historial de Síntomas</h2>

    <div v-if="historial.length === 0" class="sin-registros">
      <p>No tienes registros anteriores.</p>
    </div>

    <div v-else>
      <ul class="historial-lista">
        <li v-for="(registro, index) in historial" :key="index" class="registro">
          <h3>{{ registro.fecha }}</h3>

          <table class="tabla-historial">
            <thead>
              <tr>
                <th>Síntoma</th>
                <th>Nivel</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(valor, nombre) in registro.sintomas" :key="nombre">
                <td>{{ formatearNombre(nombre) }}</td>
                <td>{{ valor }}</td>
              </tr>
            </tbody>
          </table>

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

const formatearNombre = (str: string) =>
  str.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())
</script>

<style scoped>
.historial {
  padding: 1.5rem;
  margin-top: 2rem;
  background-color: #e8f5e9;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.1);
}

h2 {
  color: #2e7d32;
  margin-bottom: 1rem;
  text-align: center;
}

.sin-registros {
  color: #388e3c;
  font-style: italic;
  text-align: center;
}

.historial-lista {
  list-style: none;
  padding: 0;
  margin: 0;
}

.registro {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #c8e6c9;
  border-radius: 0.5rem;
  border: 1px solid #a5d6a7;
}

h3 {
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  color: #2e7d32;
  text-align: left;
}

.tabla-historial {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.tabla-historial th,
.tabla-historial td {
  border: 1px solid #a5d6a7;
  padding: 0.6rem;
  text-align: left;
}

.tabla-historial th {
  background-color: #a5d6a7;
  color: #1b5e20;
}
</style>
