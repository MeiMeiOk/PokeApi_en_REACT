import { cantidadPorPagina } from '../services/pokeApi.js';

export default function Pagination({ inicioActual, totalPokemones, onPrevious, onNext }) {
  const paginaActual = Math.floor(inicioActual / cantidadPorPagina) + 1;
  const totalPaginas = Math.ceil(totalPokemones / cantidadPorPagina);

  if (!totalPokemones) return null;

  return (
    <div className="paginacion">
      {inicioActual > 0 && <button onClick={onPrevious}>Anterior</button>}
      <span id="pageInfo">Pagina {paginaActual} de {totalPaginas}</span>
      {inicioActual + cantidadPorPagina < totalPokemones && <button onClick={onNext}>Siguientes</button>}
    </div>
  );
}
