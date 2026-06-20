import Modal from './Modal.jsx';
import { mayus, padPokemonId } from '../utils/formatters.js';
import { TypeBubble } from '../utils/typeStyles.jsx';

export default function TeamModal({ isOpen, equipo, onClose, onRename, onRemove }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mi Equipo">
      <div id="team-body">
        {!equipo.length && <p>No hay Pokemon en el equipo. Agrega uno desde el modal del Pokemon.</p>}
        {equipo.map((pokemon) => {
          const imagen = pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default || '';
          const nombreMostrar = pokemon.customName || mayus(pokemon.name);
          return (
            <div className="team-card" key={pokemon.id}>
              <img src={imagen} alt={pokemon.name} />
              <div className="team-card-info">
                <p><strong>{nombreMostrar}</strong></p>
                <p>#{padPokemonId(pokemon.id)}</p>
                <div className="tipos-pokemon">
                  {pokemon.types.map((tipo) => <TypeBubble key={tipo.type.name} tipo={tipo.type.name} />)}
                </div>
              </div>
              <div className="team-card-actions">
                <button onClick={() => onRename(pokemon.id)}>Renombrar</button>
                <button onClick={() => onRemove(pokemon.id)}>Eliminar</button>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
