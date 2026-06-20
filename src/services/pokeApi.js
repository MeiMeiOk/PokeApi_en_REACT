import { extraerIdDeUrl } from '../utils/formatters.js';

const urlApi = 'https://pokeapi.co/api/v2/pokemon/';
const urlMovesApi = 'https://pokeapi.co/api/v2/move/';
const urlItemsApi = 'https://pokeapi.co/api/v2/item/';

export const cantidadPorPagina = 50;

async function getJson(url) {
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error('No se pudo cargar la informacion');
  }
  return respuesta.json();
}

export function cargarTipos() {
  return getJson('https://pokeapi.co/api/v2/type/').then((datos) => datos.results);
}

export function cargarGeneraciones() {
  return getJson('https://pokeapi.co/api/v2/generation/').then((datos) => datos.results);
}

export function obtenerPokemonPorNombre(nombre) {
  return getJson(`${urlApi}${encodeURIComponent(nombre)}`).catch(() => null);
}

export async function cargarPokemones({ inicioActual, tipoActual, generacionActual }) {
  let pokemones = [];
  let totalPokemones = 0;

  if (tipoActual || generacionActual) {
    let nombresFiltrados = null;

    if (tipoActual) {
      const datosTipo = await getJson(`https://pokeapi.co/api/v2/type/${tipoActual}`);
      nombresFiltrados = new Set(datosTipo.pokemon.map((entrada) => entrada.pokemon.name));
    }

    if (generacionActual) {
      const datosGeneracion = await getJson(`https://pokeapi.co/api/v2/generation/${generacionActual}`);
      const especiesOrdenadas = [...datosGeneracion.pokemon_species].sort(
        (a, b) => extraerIdDeUrl(a.url) - extraerIdDeUrl(b.url)
      );
      const nombresGeneracion = especiesOrdenadas.map((especie) => especie.name);

      nombresFiltrados = nombresFiltrados
        ? nombresGeneracion.filter((nombre) => nombresFiltrados.has(nombre))
        : nombresGeneracion;
    } else if (nombresFiltrados) {
      nombresFiltrados = Array.from(nombresFiltrados);
    }

    const nombresPaginados = nombresFiltrados.slice(inicioActual, inicioActual + cantidadPorPagina);
    const resultados = await Promise.all(nombresPaginados.map((nombre) => obtenerPokemonPorNombre(nombre)));
    pokemones = resultados.filter(Boolean);
    totalPokemones = nombresFiltrados.length;
  } else {
    const datosLista = await getJson(`${urlApi}?limit=${cantidadPorPagina}&offset=${inicioActual}`);
    totalPokemones = datosLista.count;
    pokemones = await Promise.all(datosLista.results.map((pokemon) => getJson(pokemon.url)));
  }

  return { pokemones, totalPokemones };
}

export function buscarPokemon(textoBusqueda) {
  return getJson(`${urlApi}${encodeURIComponent(textoBusqueda)}`);
}

export async function cargarListaMovimientos() {
  const datos = await getJson('https://pokeapi.co/api/v2/move?limit=24');
  return Promise.all(datos.results.map((movimiento) => getJson(movimiento.url)));
}

export function buscarMovimiento(textoBusqueda) {
  return getJson(`${urlMovesApi}${encodeURIComponent(textoBusqueda)}`);
}

export async function cargarListaItems() {
  const datos = await getJson('https://pokeapi.co/api/v2/item?limit=24');
  return Promise.all(datos.results.map((item) => getJson(item.url)));
}

export function buscarItem(textoBusqueda) {
  return getJson(`${urlItemsApi}${encodeURIComponent(textoBusqueda)}`);
}

export async function cargarDetallePokemon(pokemon) {
  const species = await getJson(pokemon.species.url);
  const evolutionChain = await getJson(species.evolution_chain.url);

  function getEvolutionLine(chain) {
    const line = [];
    function traverse(node) {
      line.push(node.species.name);
      if (node.evolves_to.length > 0) {
        traverse(node.evolves_to[0]);
      }
    }
    traverse(chain);
    return line;
  }

  const line = getEvolutionLine(evolutionChain.chain);
  const index = line.indexOf(pokemon.name.toLowerCase());
  const prevPokemon = index > 0 ? await obtenerPokemonPorNombre(line[index - 1]) : null;
  const nextPokemon = index >= 0 && index < line.length - 1 ? await obtenerPokemonPorNombre(line[index + 1]) : null;

  return { line, prevPokemon, nextPokemon };
}
