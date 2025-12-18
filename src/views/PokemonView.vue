<template>
  <div class="contenedor-principal">
    
    <div v-if="!juegoTerminado" class="encabezado">
      <h2>Puntaje: {{ puntaje }}</h2>
      <h2>Intento: {{ intentos }}</h2>
    </div>

    <div v-if="!juegoTerminado" class="tablero">
      <Casino 
        v-for="(item, index) in casillas" 
        :key="index"
        :imagenSrc="item.imagen"
        :texto="item.texto"
      />
    </div>

    <div v-if="!juegoTerminado" class="botonera">
      <button @click="jugar" class="boton-jugar">JUGAR</button>
    </div>

    <div v-if="juegoTerminado" class="pantalla-final">
        
        <div v-if="!gano" class="mensaje-derrota">
            <h2>Has utilizado tus 5 intentos</h2>
            <h2>El juego ha terminado, inténtalo nuevamente</h2>
        </div>

        <div v-if="gano" class="mensaje-victoria">
            <h2>Puntaje: {{ puntaje }}</h2>
            <h2>Felicitaciones has ganado un premio de $10.000,00</h2>
        </div>
        
        <div class="botonera-final">
            <button @click="reiniciar" class="boton-nuevo">Nuevo Juego</button>
        </div>
    </div>

  </div>
</template>

<script>
import Casino from '@/components/Casino.vue';
// VERIFICA QUE TU CARPETA SE LLAME 'clients' (plural)
import { obtenerPokemonFachada } from '@/clients/PokemonClient.js';

export default {
  components: {
    Casino
  },
  data() {
    return {
      puntaje: 0,
      intentos: 0,
      juegoTerminado: false,
      gano: false,
      imagenDefecto: 'https://dummyimage.com/250x250',
      casillas: [
        { imagen: 'https://dummyimage.com/250x250', texto: 'XXXXXXXXX' },
        { imagen: 'https://dummyimage.com/250x250', texto: 'XXXXXXXXX' },
        { imagen: 'https://dummyimage.com/250x250', texto: 'XXXXXXXXX' }
      ],
      pokemonIds: [1, 4, 7, 25, 133] 
    }
  },
  methods: {
    async jugar() {
      this.intentos++;

      let nombresObtenidos = [];

      for (let i = 0; i < 3; i++) {
        try {
          const randomId = this.pokemonIds[Math.floor(Math.random() * this.pokemonIds.length)];
          const respuesta = await obtenerPokemonFachada(randomId);
          
          this.casillas[i].imagen = respuesta.imagen;
          this.casillas[i].texto = respuesta.nombre;

          nombresObtenidos.push(respuesta.nombre);
        } catch (error) {
          console.error(error);
        }
      }

      const [n1, n2, n3] = nombresObtenidos;

      if (n1 === n2 && n2 === n3) {
        this.puntaje += 5;
      } else if (n1 === n2 || n1 === n3 || n2 === n3) {
        this.puntaje += 2;
      } else {
        this.puntaje += 0;
      }
    },

    reiniciar() {
      this.puntaje = 0;
      this.intentos = 0;
      this.juegoTerminado = false;
      this.gano = false;
      
      this.casillas = [
        { imagen: this.imagenDefecto, texto: 'XXXXXXXXX' },
        { imagen: this.imagenDefecto, texto: 'XXXXXXXXX' },
        { imagen: this.imagenDefecto, texto: 'XXXXXXXXX' }
      ];
    }
  },
  watch: {
    puntaje(nuevoValor) {
      if (nuevoValor >= 10) {
        this.juegoTerminado = true;
        this.gano = true;
      }
    },
    intentos(nuevoValor) {
      if (nuevoValor >= 5 && this.puntaje < 10) {
        this.juegoTerminado = true;
        this.gano = false;
      }
    }
  }
}
</script>

<style scoped>
.contenedor-principal {
  text-align: center;
  font-family: Arial, sans-serif;
  margin-top: 20px;
}

.encabezado {
  display: flex;
  justify-content: center;
  gap: 150px;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: bold;
}

.tablero {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.boton-jugar, .boton-nuevo {
  padding: 10px 50px;
  font-size: 1.2rem;
  border: 3px solid black;
  background-color: white;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
}

.botonera-final {
    margin-top: 20px;
}

.mensaje-derrota {
    color: red;
    font-weight: bold;
    padding: 20px;
    border: 2px solid red;
    display: inline-block;
}

.mensaje-victoria {
    color: blue;
    font-weight: bold;
    padding: 20px;
    border: 2px solid blue;
    display: inline-block;
}
</style>