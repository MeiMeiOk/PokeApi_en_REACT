import { useEffect, useState } from 'react';
import Modal from './Modal.jsx';
import { mayus } from '../utils/formatters.js';

export default function RenameModal({ pokemon, onClose, onSave }) {
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    setNombre(pokemon ? pokemon.customName || mayus(pokemon.name) : '');
  }, [pokemon]);

  return (
    <Modal isOpen={Boolean(pokemon)} onClose={onClose} title="Renombrar Pokemon">
      <form id="renameForm" onSubmit={(event) => {
        event.preventDefault();
        onSave(pokemon.id, nombre.trim());
      }}>
        <input id="renameInput" type="text" placeholder="Nuevo nombre" required value={nombre} onChange={(event) => setNombre(event.target.value)} />
        <button type="submit" className="modal-action-button">Guardar nombre</button>
      </form>
    </Modal>
  );
}
