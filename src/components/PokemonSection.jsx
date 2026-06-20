import PokemonCard from './PokemonCard.jsx';
import Pagination from './Pagination.jsx';

export default function PokemonSection({ hidden, pokemones, status, inicioActual, totalPokemones, onOpenPokemon, onPrevious, onNext }) {
  return (
    <section className={`module-section ${hidden ? 'hidden' : ''}`}>
      <div className="pokemon-container">
        {status && <div className={`pokemon-card ${status.tipo}`}>{status.texto}</div>}
        {!status && pokemones.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={() => onOpenPokemon(pokemon)} />
        ))}
      </div>
      {!status && (
        <Pagination
          inicioActual={inicioActual}
          totalPokemones={totalPokemones}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      )}
    </section>
  );
}
