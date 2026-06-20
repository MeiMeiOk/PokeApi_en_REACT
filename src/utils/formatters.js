export function mayus(texto = '') {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export function formatearNombre(texto = '') {
  return texto
    .split('-')
    .map((parte) => mayus(parte))
    .join(' ');
}

export function normalizarBusquedaApi(texto = '') {
  return texto.trim().toLowerCase().replace(/\s+/g, '-');
}

export function extraerIdDeUrl(url) {
  const partes = url.split('/').filter(Boolean);
  return Number(partes[partes.length - 1]);
}

export function padPokemonId(id) {
  return String(id).padStart(3, '0');
}
