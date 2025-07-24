<!-- src/components/layouts/Sidebar.vue -->
<template>
  <aside
    class="sidebar-custom d-flex flex-column vh-100 bg-white border-end p-3"
  >
    <!-- Logo (opcional) -->
    <div class="text-center mb-4">
      <img
        src="@/assets/vara-de-asclepio.png"
        alt="Logo"
        style="height: 48px"
      />
    </div>
    <hr />
    <!-- Menú dinámico -->
    <nav class="flex-grow-1">
      <ul class="nav flex-column">
        <li v-for="item in items" :key="item.id" class="nav-item mb-1">
          <a
            href="javascript:void(0)"
            class="nav-link btn btn-light w-100 text-start d-flex align-items-center"
            :class="{ active: isActive(item.path) }"
            @click="navigate(item.path)"
          >
            <HugeiconsIcon
              v-if="item.icon"
              :icon="item.icon"
              class="me-2"
              :size="25"
              color="#065e06"
              :stroke-width="1.5"
            />
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>

    <hr />
    <!-- Acciones en el pie -->
    <div class="mt-auto">
      <ul class="nav flex-column">
        <!-- <li class="nav-item mb-1">
          <a
            href="javascript:void(0)"
            class="nav-link btn btn-light w-100 text-start d-flex align-items-center"
            @click="navigate('/profile')"
          >
            <HugeiconsIcon
              :icon="AccountSetting01Icon"
              class="me-2"
              :size="25"
              color="#065e06"
              :stroke-width="1.5"
            />
            Mi perfil
          </a>
        </li> -->
        <li class="nav-item">
          <a
            href="javascript:void(0)"
            class="nav-link btn btn-light w-100 text-start d-flex align-items-center"
            @click="logout"
          >
            <HugeiconsIcon
              :icon="LogoutSquare02Icon"
              class="me-2"
              :size="25"
              color="#b00"
              :stroke-width="1.5"
            />
            Salir
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { HugeiconsIcon } from "@hugeicons/vue";
import {
  AccountSetting01Icon,
  LogoutSquare02Icon,
} from "@hugeicons/core-free-icons";

interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: any;
}

// Única llamada a defineProps
enum Props {
  items = "items",
}
const props = defineProps<{ items: MenuItem[] }>();
const { items } = props;

const router = useRouter();
const route = useRoute();

function navigate(path: string) {
  router.push(path);
}

function logout() {
  router.push("/");
}

function isActive(path: string): boolean {
  return route.path === path;
}
</script>

<style scoped>
.sidebar-custom {
  width: 270px;
  min-width: 220px;
  max-width: 320px;
  transition: width 0.2s;
}

/* Personaliza el estado “active” de Bootstrap si quieres otro color */
.nav-link.active {
  background-color: #e9ecef;
  font-weight: 600;
}
</style>
