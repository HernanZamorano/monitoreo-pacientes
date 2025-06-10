<template>
  <div class="formulario-sintomas">
    <h2>Formulario de Síntomas</h2>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="tos">Tos</label>
        <select v-model="sintomas.tos" id="tos" required>
          <option value="leve">Leve</option>
          <option value="moderado">Moderado</option>
          <option value="grave">Grave</option>
        </select>
      </div>

      <div class="form-group">
        <label for="fiebre">Fiebre</label>
        <select v-model="sintomas.fiebre" id="fiebre" required>
          <option value="leve">Leve</option>
          <option value="moderado">Moderado</option>
          <option value="grave">Grave</option>
        </select>
      </div>

      <div class="form-group">
        <label for="dolorMuscular">Dolor Muscular</label>
        <select v-model="sintomas.dolorMuscular" id="dolorMuscular" required>
          <option value="leve">Leve</option>
          <option value="moderado">Moderado</option>
          <option value="grave">Grave</option>
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

// Definición de síntomas y su estructura
const sintomas = ref({
  tos: 'leve',
  fiebre: 'leve',
  dolorMuscular: 'leve'
})

// Lógica para manejar el envío del formulario
const submitForm = () => {
  // Crear un nuevo registro con la fecha actual
  const nuevoRegistro = {
    fecha: new Date().toLocaleDateString(),
    sintomas: sintomas.value
  }

  // Guardar el registro en el historial en localStorage
  const historial = localStorage.getItem('historialSintomas')
  const historialParsed = historial ? JSON.parse(historial) : []
  historialParsed.push(nuevoRegistro)
  localStorage.setItem('historialSintomas', JSON.stringify(historialParsed))

  // Limpiar el formulario después de enviar
  sintomas.value = {
    tos: 'leve',
    fiebre: 'leve',
    dolorMuscular: 'leve'
  }
}
</script>

<style scoped>
.formulario-sintomas {
  background-color: #9c4747;
  padding: 2rem;
  border-radius: 1rem;
  margin-top: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

select {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #7d3333;
}

button {
  background-color: #4CAF50;
  color: rgb(225, 86, 86);
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background-color: #45a049;
}
</style>
