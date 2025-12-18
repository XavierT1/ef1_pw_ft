<template>
  <div class="casilla">
    <div class="imagen-contenedor">
      <img :src="imagenSrc" alt="Juego" class="imagen-casilla">
    </div>
    <p class="texto-casilla">{{ texto }}</p>
  </div>
</template>

<script>
export default {
  props: ['imagenSrc', 'texto']
}
</script>

<style scoped>
.casilla {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  margin: 10px;
  display: inline-block; 
  width: 250px;
}

.imagen-contenedor {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
}

.imagen-casilla {
  width: 200px;
  height: 200px;
  object-fit: contain;
}

.texto-casilla {
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 10px;
  text-transform: uppercase;
  color: black;
}
</style>