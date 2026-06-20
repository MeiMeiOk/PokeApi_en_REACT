import { formatearNombre } from '../utils/formatters.js';

export default function MoveDetail({ movimiento }) {
  const efecto = movimiento.effect_entries.find((entry) => entry.language.name === 'en')?.short_effect || 'Sin descripcion disponible.';

  return (
    <div id="modal-body">
      <div className="detail-header">
        <div className="detail-header-info">
          <span className="card-label">Movimiento</span>
          <h2>{formatearNombre(movimiento.name)}</h2>
          <p><strong>Tipo:</strong> {formatearNombre(movimiento.type?.name || 'sin tipo')}</p>
          <p><strong>Categoria:</strong> {formatearNombre(movimiento.damage_class?.name || 'sin categoria')}</p>
          <p><strong>Poder:</strong> {movimiento.power ?? 'N/A'}</p>
          <p><strong>Precision:</strong> {movimiento.accuracy ?? 'N/A'}</p>
          <p><strong>PP:</strong> {movimiento.pp ?? 'N/A'}</p>
        </div>
      </div>
      <div className="modal-section">
        <h3>Efecto</h3>
        <p>{efecto}</p>
      </div>
      <div className="modal-section">
        <h3>Pokemon que pueden aprenderlo</h3>
        <div className="modal-list">
          {movimiento.learned_by_pokemon.length
            ? movimiento.learned_by_pokemon.map((pokemon) => <span className="modal-chip" key={pokemon.name}>{formatearNombre(pokemon.name)}</span>)
            : <p>No hay Pokemon listados para este movimiento.</p>}
        </div>
      </div>
    </div>
  );
}
