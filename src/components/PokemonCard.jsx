import { mayus, padPokemonId } from '../utils/formatters.js';
import { obtenerColorTipo, TypeBubble } from '../utils/typeStyles.jsx';

export default function PokemonCard({ pokemon, onClick }) {
  const imagen = pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default || '';
  const primerTipo = pokemon.types[0]?.type.name || 'normal';

  return (
    <article className="pokemon-card" style={{ borderColor: obtenerColorTipo(primerTipo), cursor: 'pointer' }} onClick={onClick}>
      <img src={imagen} alt={pokemon.name} />
      <h2>{mayus(pokemon.name)}</h2>
      <div className="pokemon-info">
        <div><strong>Numero:</strong> #{padPokemonId(pokemon.id)}</div>
        <div className="tipos-pokemon">
          {pokemon.types.map((tipo) => <TypeBubble key={tipo.type.name} tipo={tipo.type.name} />)}
        </div>
      </div>
    </article>
  );
}
