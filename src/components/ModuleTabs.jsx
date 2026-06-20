export default function ModuleTabs({ moduloActual, onChange }) {
  return (
    <div className="modules-bar">
      <div className="module-tabs">
        <button className={`module-tab ${moduloActual === 'pokemon' ? 'active' : ''}`} type="button" onClick={() => onChange('pokemon')}>
          Pokemon
        </button>
        <button className={`module-tab ${moduloActual === 'moves' ? 'active' : ''}`} type="button" onClick={() => onChange('moves')}>
          Movimientos
        </button>
        <button className={`module-tab ${moduloActual === 'items' ? 'active' : ''}`} type="button" onClick={() => onChange('items')}>
          Items
        </button>
      </div>
    </div>
  );
}
