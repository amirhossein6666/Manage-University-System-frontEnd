<template>
  <div>
    <router-link to="/courses" class="routerlink">
      <button>courses</button>
    </router-link>
    <router-link to="/login" class="routerlink">
      <button>login</button>
    </router-link>
    <router-link to="/faculty" class="routerlink">
      <button>faculty</button>
    </router-link >
    <router-link to="/professor/setGrades">
      <button>professorSetGrades</button>
    </router-link>
    <router-link to="/professor/stuList">
      <button>professorStuList</button>
    </router-link>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style scoped></style>
