<template>
  <div :class="$style.profileView">
    <div :class="$style.cardContainer">
      <h2 class="text-center text-success mb-4">Perfil del paciente</h2>
      <hr />
      <CardMiPerfil v-if="paciente" :paciente="paciente" :show="true" />
      <div v-else>Cargando paciente…</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import CardMiPerfil from "@/components/ui/card/mi-perfil/CardMiPerfil.vue";
import type { Usuario } from "@/models/dbTypes";
import { fetchUsuario } from "@/services/usuariosService";
import $style from "./PerfilPaciente.module.scss";

const paciente = ref<Usuario | null>(null);
const pacienteId = 1; // O usa useRoute() para hacerlo dinámico

onMounted(async () => {
  try {
    const data = await fetchUsuario(pacienteId);
    paciente.value = {
      ...data,
      fechaNacimiento: data.fecha_nacimiento as string,
    } as Usuario;
  } catch (err) {
    console.error("Error cargando paciente", err);
  }
});
</script>
