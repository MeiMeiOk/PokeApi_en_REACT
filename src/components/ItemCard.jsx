import { formatearNombre } from '../utils/formatters.js';

export default function ItemCard({ item, onClick }) {
  return (
    <article className="pokemon-card info-card" onClick={onClick}>
      <span className="card-label">Item</span>
      <img src={item.sprites?.default || ''} alt={item.name} />
      <h2>{formatearNombre(item.name)}</h2>
      <div className="pokemon-info">
        <div><strong>Costo:</strong> {item.cost || 0}</div>
        <div><strong>Categoria:</strong> {formatearNombre(item.category?.name || 'sin categoria')}</div>
        <div><strong>Atributos:</strong> {item.attributes.length || 0}</div>
      </div>
    </article>
  );
}
