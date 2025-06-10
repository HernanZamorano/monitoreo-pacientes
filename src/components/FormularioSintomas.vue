<template>
  <div class="formulario-sintomas">
    <h2>Formulario de Síntomas</h2>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="tos">Tos</label>
        <select v-model="sintomas.tos" id="tos" required>
          <option value="Leve">Leve</option>
          <option value="Moderado">Moderado</option>
          <option value="Grave">Grave</option>
        </select>
      </div>

      <div class="form-group">
        <label for="fiebre">Fiebre</label>
        <select v-model="sintomas.fiebre" id="fiebre" required>
          <option value="Leve">Leve</option>
          <option value="Moderado">Moderado</option>
          <option value="Grave">Grave</option>
        </select>
      </div>

      <div class="form-group">
        <label for="dolorMuscular">Dolor Muscular</label>
        <select v-model="sintomas.dolorMuscular" id="dolorMuscular" required>
          <option value="Leve">Leve</option>
          <option value="Moderado">Moderado</option>
          <option value="Grave">Grave</option>
        </select>
      </div>

      <button type="submit">Enviar Síntomas</button>
    </form>

    <HistorialSintomas />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HistorialSintomas from './HistorialSintomas.vue'

const sintomas = ref({
  tos: 'Leve',
  fiebre: 'Leve',
  dolorMuscular: 'Leve'
})

const submitForm = () => {
  const nuevoRegistro = {
    fecha: new Date().toLocaleDateString(),
    sintomas: sintomas.value
  }

  const historial = localStorage.getItem('historialSintomas')
  const historialParsed = historial ? JSON.parse(historial) : []
  historialParsed.push(nuevoRegistro)
  localStorage.setItem('historialSintomas', JSON.stringify(historialParsed))

  sintomas.value = {
    tos: 'Leve',
    fiebre: 'Leve',
    dolorMuscular: 'Leve'
  }
}
</script>

<style scoped>
.formulario-sintomas {
  background-color: #f1f8e9; /* verde muy claro */
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

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #388e3c;
  font-weight: 500;
}

select {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #a5d6a7;
  background-color: #ffffff;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
  font-weight: bold;
}

button:hover {
  background-color: #a6caa8;
}
</style>

