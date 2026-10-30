
<template>
  <div class="sidebar">

    
<button class="menu-principal">
  <RouterLink to="/dashboard">Tableau de Bord</RouterLink>
</button>

    <button
      class="menu-principal"
      @click="afficherCalendrier"
    >
      <span>📅 Calendrier</span>
      <span>{{ calendrierOuvert ? '⌃' : '⌄' }}</span>
    </button>

    <!-- Sous-menus -->
    <div v-if="calendrierOuvert" class="sous-menu">

      <RouterLink to="/dashboard/calendrier">
        Calendrier général
      </RouterLink>

      <RouterLink to="/dashboard/calendrier/evaluations">
        Calendrier des évaluations
      </RouterLink>

      <RouterLink to="/dashboard/calendrier/seances">
        Calendrier des séances
      </RouterLink>

      </div>

      <button class="menu-principal" @click="afficherUe">
        <span> UE/EC</span>
        <span>{{ UeECOuvert ? '⌃' : '⌄'  }}</span>
      </button>

      <div v-if="UeEcOuvert" class="sous-menu">

        <RouterLink to="/dashboard/Ue">Unité d'Enseignements (UE)</RouterLink>

        <RouterLink to="/dashboard/Ec">Eléments constitutifs (EC)</RouterLink>
      </div>

    

  </div>
</template>

<script setup>
import { ref } from 'vue'

const calendrierOuvert = ref(false)
const UeEcOuvert = ref(false)

function afficherCalendrier() {
  calendrierOuvert.value = !calendrierOuvert.value
}
function afficherUe(){
  UeEcOuvert.value = !UeEcOuvert.value
}
</script>

<style scoped>
.menu-principal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
  text-align: left;
}

.sous-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0 8px 25px;
}

.sous-menu a {
  padding: 8px;
  color: inherit;
  text-decoration: none;
  border-radius: 5px;
}

.sous-menu a:hover {
  background-color: #e5e7eb;
  color: #1d4ed8;
}

.sous-menu a.router-link-active {
  color: #2563eb;
  font-weight: bold;
}
</style>