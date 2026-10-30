
<template>
  <div class="dashboard-layout">
    <Navbar />
  

      <div class="dashboard-body">
      <!-- Menu vertical à gauche -->
      <sidebar />

    <main class="main-content">
      <router-view />
    </main>
  </div>
  </div>
</template>

<script >

import Navbar from '@/components/Navbar.vue';
import sidebar from '@/components/sidebar.vue';

export default {
  name: 'dashboardLayout',
  components:{
    Navbar,
    sidebar
   
  }
}
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
}

.dashboard-body {
  display: flex;
  min-height: calc(100vh - 60px);
}

.main-content {
  flex: 1;
  padding: 20px;
  min-width: 0;
}
</style>