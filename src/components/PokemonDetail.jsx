import { formatearNombre, mayus, padPokemonId } from '../utils/formatters.js';
import { TypeBubble } from '../utils/typeStyles.jsx';

export default function PokemonDetail({ pokemon, evolutionData, onAddTeam, onOpenPokemon }) {
  const imagenPrincipal = pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default || '';
  const spriteDefault = pokemon.sprites.front_default || '';
  const spriteShiny = pokemon.sprites.front_shiny || '';
  const habilidades = pokemon.abilities.map((ability) => mayus(ability.ability.name)).join(', ');
  const baseMoves = pokemon.moves
    .map((move) => {
      const niveles = move.version_group_details
        .filter((detalle) => detalle.move_learn_method.name === 'level-up')
        .map((detalle) => detalle.level_learned_at)
        .filter((nivel) => nivel > 0);
      return { nombre: move.move.name, nivel: niveles.length ? Math.min(...niveles) : 999 };
    })
    .sort((a, b) => a.nivel - b.nivel || a.nombre.localeCompare(b.nombre))
    .slice(0, 10)
    .map((move) => formatearNombre(move.nombre));
  const movesHtml = baseMoves.length
    ? baseMoves.join(', ')
    : pokemon.moves.slice(0, 10).map((move) => formatearNombre(move.move.name)).join(', ');
  const line = evolutionData?.line || [];

  return (
    <div id="modal-body">
      <div className="detail-header">
        <img src={imagenPrincipal} alt={pokemon.name} className="main-artwork" />
        <div className="detail-header-info">
          <h2>{mayus(pokemon.name)}</h2>
          <p><strong>ID:</strong> #{padPokemonId(pokemon.id)}</p>
          <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
          <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
          <p><strong>Habilidades:</strong> {habilidades}</p>
        </div>
      </div>

      <div className="pokemon-info">
        <div className="tipos-pokemon">
          {pokemon.types.map((tipo) => <TypeBubble key={tipo.type.name} tipo={tipo.type.name} />)}
        </div>

        <div className="sprite-section">
          <div className="sprite-card">
            <img src={spriteDefault} alt={`Sprite base ${pokemon.name}`} />
            <p>Sprite Base</p>
          </div>
          <div className="sprite-card">
            <img src={spriteShiny} alt={`Sprite shiny ${pokemon.name}`} />
            <p>Sprite Shiny</p>
          </div>
        </div>

        <div className="stats-section">
          <h3>Estadisticas Base</h3>
          {pokemon.stats.map((stat) => {
            const nombre = mayus(stat.stat.name.replace('-', ' '));
            const valor = stat.base_stat;
            const porcentaje = Math.min(100, (valor / 255) * 100);
            return (
              <div className="stat-bar" key={stat.stat.name}>
                <span className="stat-name">{nombre}</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${porcentaje}%` }} />
                </div>
                <span className="stat-value">{valor}</span>
              </div>
            );
          })}
        </div>

        <div className="additional-info">
          <h3>Movimientos de Base</h3>
          <p>{movesHtml}</p>
          <h3>Evoluciones</h3>
          <div className="evolutions">
            {line.length === 1 && <p>Este Pokemon no tiene evoluciones.</p>}
            {evolutionData?.prevPokemon && (
              <EvolutionItem pokemon={evolutionData.prevPokemon} label="Anterior" className="evolution-prev" onClick={onOpenPokemon} />
            )}
            {line.length > 1 && <EvolutionItem pokemon={pokemon} label="Actual" className="evolution-current" />}
            {evolutionData?.nextPokemon && (
              <EvolutionItem pokemon={evolutionData.nextPokemon} label="Siguiente" className="evolution-next" onClick={onOpenPokemon} />
            )}
          </div>
        </div>

        <button className="modal-action-button" onClick={() => onAddTeam(pokemon)}>Agregar al equipo</button>
      </div>
    </div>
  );
}

function EvolutionItem({ pokemon, label, className, onClick }) {
  const imagen = pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default || '';

  return (
    <div className={`evolution-item ${className}`} title={mayus(pokemon.name)} onClick={() => onClick?.(pokemon)}>
      <img src={imagen} alt={pokemon.name} />
      <span>{mayus(pokemon.name)} ({label})</span>
    </div>
  );
}
