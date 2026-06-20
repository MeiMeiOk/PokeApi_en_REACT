import { formatearNombre } from '../utils/formatters.js';

export default function MoveCard({ movimiento, onClick }) {
  return (
    <article className="pokemon-card info-card" onClick={onClick}>
      <span className="card-label">Movimiento</span>
      <h2>{formatearNombre(movimiento.name)}</h2>
      <div className="pokemon-info">
        <div><strong>Tipo:</strong> {formatearNombre(movimiento.type?.name || 'sin tipo')}</div>
        <div><strong>Categoria:</strong> {formatearNombre(movimiento.damage_class?.name || 'sin categoria')}</div>
        <div><strong>Poder:</strong> {movimiento.power ?? 'N/A'}</div>
        <div><strong>Precision:</strong> {movimiento.accuracy ?? 'N/A'}</div>
      </div>
    </article>
  );
}
