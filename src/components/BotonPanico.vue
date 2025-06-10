<template>
  <div class="boton-panico">
    <button @click="activarPanico" :disabled="enviado" class="boton">
      🚨 Botón de Pánico
    </button>
    <p v-if="enviado" class="mensaje">¡Alerta enviada! Personal médico ha sido notificado.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const enviado = ref(false)

function activarPanico() {
  console.warn('🚨 ¡Botón de pánico activado! Enviar notificación al backend o servicio médico.')
  enviado.value = true

  // Simulación de reseteo del botón tras 10 segundos
  setTimeout(() => {
    enviado.value = false
  }, 10000)
}
</script>

<style scoped>
.boton-panico {
  margin: 2rem auto;
  text-align: center;
}
.boton {
  padding: 1rem 2rem;
  background-color: red;
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
}
.boton:disabled {
  background-color: #999;
  cursor: not-allowed;
}
.mensaje {
  margin-top: 1rem;
  color: #b30000;
  font-weight: bold;
}
</style>
