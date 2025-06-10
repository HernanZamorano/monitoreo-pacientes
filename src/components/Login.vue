<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin" class="form">
      <div class="form-group">
        <label for="rut">RUT:</label>
        <input id="rut" v-model="rut" type="text" placeholder="12.345.678-9" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input id="password" v-model="password" type="password" placeholder="••••••••" required />
      </div>
      <div class="form-group">
        <button type="submit">Ingresar</button>
      </div>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const rut = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleLogin = () => {
  if (!validateRut(rut.value)) {
    errorMessage.value = 'RUT inválido'
    return
  }

  if (password.value.length < 6) {
    errorMessage.value = 'La contraseña debe tener al menos 6 caracteres'
    return
  }

  // Simulamos login correcto
  if (rut.value === '12.345.678-9' && password.value === '123456') {
    router.push('/dashboard')
  } else {
    errorMessage.value = 'Credenciales incorrectas'
  }
}

// Valida formato básico de RUT
function validateRut(rut: string): boolean {
  return /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$/.test(rut)
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 0 10px #ddd;
}
.form-group {
  margin-bottom: 16px;
}
input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  width: 100%;
  padding: 10px;
  background: #2e86de;
  color: rgb(208, 61, 61);
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.error {
  color: red;
  margin-top: 8px;
}
</style>
