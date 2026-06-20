import { mayus } from './formatters.js';

export const estilosTipos = {
  normal: { color: '#a8a77a' },
  fire: { color: '#ee8130' },
  water: { color: '#6390f0' },
  electric: { color: '#f7d02c' },
  grass: { color: '#7ac74c' },
  ice: { color: '#96d9d6' },
  fighting: { color: '#c22e28' },
  poison: { color: '#a33ea1' },
  ground: { color: '#e2bf65' },
  flying: { color: '#a98ff3' },
  psychic: { color: '#f95587' },
  bug: { color: '#a6b91a' },
  rock: { color: '#b6a136' },
  ghost: { color: '#735797' },
  dragon: { color: '#6f35fc' },
  dark: { color: '#705746' },
  steel: { color: '#b7b7ce' },
  fairy: { color: '#d685ad' }
};

export function obtenerColorTipo(tipo) {
  return estilosTipos[tipo]?.color || '#777';
}

export function TypeBubble({ tipo }) {
  return (
    <span className="tipo-burbuja" style={{ backgroundColor: obtenerColorTipo(tipo) }}>
      <span>{mayus(tipo)}</span>
    </span>
  );
}
