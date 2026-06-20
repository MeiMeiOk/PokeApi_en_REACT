import { formatearNombre } from '../utils/formatters.js';

export default function ItemDetail({ item }) {
  const efecto = item.effect_entries.find((entry) => entry.language.name === 'en')?.short_effect || 'Sin descripcion disponible.';

  return (
    <div id="modal-body">
      <div className="detail-header">
        <img src={item.sprites?.default || ''} alt={item.name} className="main-artwork" />
        <div className="detail-header-info">
          <span className="card-label">Item</span>
          <h2>{formatearNombre(item.name)}</h2>
          <p><strong>Costo:</strong> {item.cost || 0}</p>
          <p><strong>Categoria:</strong> {formatearNombre(item.category?.name || 'sin categoria')}</p>
          <p><strong>Fling Power:</strong> {item.fling_power ?? 'N/A'}</p>
        </div>
      </div>
      <div className="modal-section">
        <h3>Efecto</h3>
        <p>{efecto}</p>
      </div>
      <div className="modal-section">
        <h3>Atributos</h3>
        <div className="modal-list">
          {item.attributes.length
            ? item.attributes.map((atributo) => <span className="modal-chip" key={atributo.name}>{formatearNombre(atributo.name)}</span>)
            : <p>Este item no tiene atributos listados.</p>}
        </div>
      </div>
    </div>
  );
}
