import ItemCard from './ItemCard.jsx';

export default function ItemSection({ hidden, items, status, onOpenItem }) {
  return (
    <section className={`module-section ${hidden ? 'hidden' : ''}`}>
      <div className="pokemon-container">
        {status && <div className={`pokemon-card ${status.tipo}`}>{status.texto}</div>}
        {!status && items.map((item) => (
          <ItemCard key={item.name} item={item} onClick={() => onOpenItem(item)} />
        ))}
      </div>
    </section>
  );
}
