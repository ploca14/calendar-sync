<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession();
</script>

<template>
  <div>
    {{ loggedIn }}
    {{ user }}
    <Button @click="clear">Log out</Button>
  </div>
</template>

<style scoped></style>
