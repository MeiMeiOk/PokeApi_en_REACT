import MoveCard from './MoveCard.jsx';

export default function MoveSection({ hidden, movimientos, status, onOpenMove }) {
  return (
    <section className={`module-section ${hidden ? 'hidden' : ''}`}>
      <div className="pokemon-container">
        {status && <div className={`pokemon-card ${status.tipo}`}>{status.texto}</div>}
        {!status && movimientos.map((movimiento) => (
          <MoveCard key={movimiento.name} movimiento={movimiento} onClick={() => onOpenMove(movimiento)} />
        ))}
      </div>
    </section>
  );
}
