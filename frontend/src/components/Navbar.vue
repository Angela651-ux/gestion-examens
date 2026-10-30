<template>
  <nav class="navbar">

    <div class="logo">
      Gestion des Examens
    </div>

    <div class="navbar-right">
      <span>🔔</span>
      <span>👤</span>
    </div>

  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.navbar {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  background-color: #2563eb;
  color: white;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.navbar-right {
  display: flex;
  gap: 20px;
}
</style>