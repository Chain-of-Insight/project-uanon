<template>
  <div class="pane-s tools">
    <h1>{{ msg }}</h1>
  </div>
  <div class="content-s">
    <div class="tools cipher">
      <router-link to="/tools/cipher">Cipher Tools</router-link>
    </div>
    <div class="tools truth">
      <router-link to="/tools/truth">Weapons of Truth</router-link>
    </div>
    <!--
    <div class="tools qr">
      <router-link to="/tools/qr">QR Tools</router-link>
    </div>
    -->
  </div>
</template>

<script>
export default {
  name: 'Tools',
  data: () => ({
    msg: 'Tools'
  })
}
</script>

<style scoped>
</style>