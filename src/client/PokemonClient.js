import axios from "axios";

const consumirApi = async (idPokemon) => {
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`).then(r => r.data);
    
    return {
        nombre: data.name,
        imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idPokemon}.svg`
    };
}

export async function obtenerPokemonFachada(idPokemon) {
    return await consumirApi(idPokemon);
}