<template>
  <div class="semaforo">
    <h2>Estado de Salud</h2>

    <div class="circulo" :class="colorSemaforo"></div>
    <p class="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

interface Props {
  sintomas: {
    [key: string]: string
  }
}

const props = defineProps<Props>()

// Calcula puntaje total
const puntaje = computed(() => {
  const valores = Object.values(props.sintomas)

  return valores.reduce((acc, sintoma) => {
    if (sintoma === 'leve') return acc + 1
    if (sintoma === 'moderado') return acc + 2
    if (sintoma === 'grave') return acc + 3
    return acc
  }, 0)
})

// Determina el color del semáforo según puntaje
const colorSemaforo = computed(() => {
  if (puntaje.value <= 3) return 'verde'
  if (puntaje.value <= 6) return 'amarillo'
  return 'rojo'
})

// Mensaje explicativo
const mensaje = computed(() => {
  switch (colorSemaforo.value) {
    case 'verde':
      return 'Estado leve, sin preocupaciones.'
    case 'amarillo':
      return 'Estado moderado, observe sus síntomas.'
    case 'rojo':
      return 'Estado grave, se recomienda contactar asistencia médica.'
  }
})
</script>

<style scoped>
.semaforo {
  max-width: 400px;
  margin: 2rem auto;
  text-align: center;
  padding: 2rem;
  border-radius: 1rem;
  background-color: #362598;
  border: 1px solid #ccc;
}
.circulo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 1rem auto;
}
.verde {
  background-color: #2ecc71;
}
.amarillo {
  background-color: #f1c40f;
}
.rojo {
  background-color: #e74c3c;
}
.mensaje {
  font-weight: bold;
  font-size: 1.1rem;
}
</style>
