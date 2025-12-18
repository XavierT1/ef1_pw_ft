<template>
  <PokemonView />
</template>

<script>
import PokemonView from './views/PokemonView.vue'

export default {
  name: 'App',
  components: {
    PokemonView
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}
</style>