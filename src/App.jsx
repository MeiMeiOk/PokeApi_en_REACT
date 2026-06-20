import { useEffect, useMemo, useState } from 'react';
import LoginScreen from './components/LoginScreen.jsx';
import Navbar from './components/Navbar.jsx';
import ModuleTabs from './components/ModuleTabs.jsx';
import PokemonSection from './components/PokemonSection.jsx';
import MoveSection from './components/MoveSection.jsx';
import ItemSection from './components/ItemSection.jsx';
import Modal from './components/Modal.jsx';
import PokemonDetail from './components/PokemonDetail.jsx';
import MoveDetail from './components/MoveDetail.jsx';
import ItemDetail from './components/ItemDetail.jsx';
import TeamModal from './components/TeamModal.jsx';
import RenameModal from './components/RenameModal.jsx';
import Toast from './components/Toast.jsx';
import {
  buscarItem,
  buscarMovimiento,
  buscarPokemon,
  cargarDetallePokemon,
  cargarGeneraciones,
  cargarListaItems,
  cargarListaMovimientos,
  cargarPokemones,
  cargarTipos,
  cantidadPorPagina
} from './services/pokeApi.js';
import { normalizarBusquedaApi } from './utils/formatters.js';

const equipoKey = 'pokedexEquipo';

function cargarEquipoGuardado() {
  const equipoGuardado = localStorage.getItem(equipoKey);
  return equipoGuardado ? JSON.parse(equipoGuardado) : [];
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [moduloActual, setModuloActual] = useState('pokemon');
  const [tipos, setTipos] = useState([]);
  const [generaciones, setGeneraciones] = useState([]);
  const [tipoActual, setTipoActual] = useState('');
  const [generacionActual, setGeneracionActual] = useState('');
  const [inicioActual, setInicioActual] = useState(0);
  const [totalPokemones, setTotalPokemones] = useState(0);
  const [pokemones, setPokemones] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [items, setItems] = useState([]);
  const [pokemonStatus, setPokemonStatus] = useState({ tipo: 'loading', texto: 'Cargando Pokemones...' });
  const [moveStatus, setMoveStatus] = useState({ tipo: 'loading', texto: 'Cargando movimientos...' });
  const [itemStatus, setItemStatus] = useState({ tipo: 'loading', texto: 'Cargando items...' });
  const [equipo, setEquipo] = useState(cargarEquipoGuardado);
  const [toast, setToast] = useState({ visible: false, texto: '', tipo: 'success' });
  const [modal, setModal] = useState(null);
  const [teamOpen, setTeamOpen] = useState(false);
  const [renameId, setRenameId] = useState(null);
  const [evolutionData, setEvolutionData] = useState(null);
  const pokemonRenombrar = useMemo(() => equipo.find((pokemon) => pokemon.id === renameId), [equipo, renameId]);

  useEffect(() => {
    Promise.all([cargarTipos(), cargarGeneraciones()])
      .then(([tiposCargados, generacionesCargadas]) => {
        setTipos(tiposCargados);
        setGeneraciones(generacionesCargadas);
      })
      .catch(() => mostrarToast('No se pudieron cargar filtros.', 'error'));
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem(equipoKey, JSON.stringify(equipo));
  }, [equipo]);

  useEffect(() => {
    setPokemonStatus({ tipo: 'loading', texto: 'Cargando Pokemones...' });
    cargarPokemones({ inicioActual, tipoActual, generacionActual })
      .then(({ pokemones, totalPokemones }) => {
        setPokemones(pokemones);
        setTotalPokemones(totalPokemones);
        setPokemonStatus(pokemones.length ? null : { tipo: 'error', texto: 'No hay Pokemones para mostrar.' });
      })
      .catch(() => setPokemonStatus({ tipo: 'error', texto: 'No se pudieron cargar los Pokemones.' }));
  }, [inicioActual, tipoActual, generacionActual]);

  useEffect(() => {
    setMoveStatus({ tipo: 'loading', texto: 'Cargando movimientos...' });
    cargarListaMovimientos()
      .then((lista) => {
        setMovimientos(lista);
        setMoveStatus(lista.length ? null : { tipo: 'error', texto: 'No hay movimientos para mostrar.' });
      })
      .catch(() => setMoveStatus({ tipo: 'error', texto: 'No se pudieron cargar los movimientos.' }));

    setItemStatus({ tipo: 'loading', texto: 'Cargando items...' });
    cargarListaItems()
      .then((lista) => {
        setItems(lista);
        setItemStatus(lista.length ? null : { tipo: 'error', texto: 'No hay items para mostrar.' });
      })
      .catch(() => setItemStatus({ tipo: 'error', texto: 'No se pudieron cargar los items.' }));
  }, []);

  function mostrarToast(texto, tipo = 'success') {
    setToast({ visible: true, texto, tipo });
    window.setTimeout(() => setToast({ visible: false, texto: '', tipo }), 2500);
  }

  function entrarAlPrograma(event) {
    event.preventDefault();
    setIsLoggedIn(true);
  }

  function volverInicio() {
    setModuloActual('pokemon');
    setInicioActual(0);
    setTipoActual('');
    setGeneracionActual('');
  }

  function cambiarTipo(tipo) {
    setTipoActual(tipo);
    setInicioActual(0);
  }

  function cambiarGeneracion(generacion) {
    setGeneracionActual(generacion);
    setInicioActual(0);
  }

  function buscarPokemonPorTexto(texto) {
    const textoBusqueda = texto.trim().toLowerCase();
    if (!textoBusqueda) {
      setPokemonStatus({ tipo: 'error', texto: 'Escribe el nombre o el numero de un Pokemon.' });
      setTotalPokemones(0);
      return;
    }

    setPokemonStatus({ tipo: 'loading', texto: 'Buscando Pokemon...' });
    buscarPokemon(textoBusqueda)
      .then((pokemon) => {
        setPokemones([pokemon]);
        setTotalPokemones(0);
        setPokemonStatus(null);
      })
      .catch(() => setPokemonStatus({ tipo: 'error', texto: 'No se encontro ese Pokemon.' }));
  }

  function buscarMovimientoPorTexto(texto) {
    const textoBusqueda = normalizarBusquedaApi(texto);
    if (!textoBusqueda) {
      setMoveStatus({ tipo: 'error', texto: 'Escribe el nombre de un movimiento.' });
      return;
    }

    setMoveStatus({ tipo: 'loading', texto: 'Buscando movimiento...' });
    buscarMovimiento(textoBusqueda)
      .then((movimiento) => {
        setMovimientos([movimiento]);
        setMoveStatus(null);
      })
      .catch(() => setMoveStatus({ tipo: 'error', texto: 'No se encontro ese movimiento.' }));
  }

  function buscarItemPorTexto(texto) {
    const textoBusqueda = normalizarBusquedaApi(texto);
    if (!textoBusqueda) {
      setItemStatus({ tipo: 'error', texto: 'Escribe el nombre de un item.' });
      return;
    }

    setItemStatus({ tipo: 'loading', texto: 'Buscando item...' });
    buscarItem(textoBusqueda)
      .then((item) => {
        setItems([item]);
        setItemStatus(null);
      })
      .catch(() => setItemStatus({ tipo: 'error', texto: 'No se encontro ese item.' }));
  }

  function abrirPokemon(pokemon) {
    setModal({ tipo: 'pokemon', data: pokemon });
    setEvolutionData(null);
    cargarDetallePokemon(pokemon)
      .then(setEvolutionData)
      .catch(() => setEvolutionData({ line: [pokemon.name], prevPokemon: null, nextPokemon: null }));
  }

  function agregarAlEquipo(pokemon) {
    if (equipo.find((item) => item.id === pokemon.id)) {
      mostrarToast('Este Pokemon ya esta en el equipo.', 'warning');
      return;
    }
    if (equipo.length >= 6) {
      mostrarToast('El equipo ya tiene 6 Pokemon.', 'warning');
      return;
    }
    setEquipo([...equipo, { ...pokemon, customName: pokemon.customName || '' }]);
    mostrarToast('Pokemon agregado al equipo.', 'success');
  }

  function eliminarDelEquipo(pokemonId) {
    setEquipo(equipo.filter((pokemon) => pokemon.id !== pokemonId));
  }

  function guardarNuevoNombre(pokemonId, nuevoNombre) {
    setEquipo(equipo.map((pokemon) => (
      pokemon.id === pokemonId ? { ...pokemon, customName: nuevoNombre } : pokemon
    )));
    setRenameId(null);
  }

  return (
    <>
      {!isLoggedIn && <LoginScreen onLogin={entrarAlPrograma} />}
      {isLoggedIn && (
        <>
          <Toast toast={toast} />
          <Navbar
            moduloActual={moduloActual}
            tipos={tipos}
            generaciones={generaciones}
            tipoActual={tipoActual}
            generacionActual={generacionActual}
            isDarkMode={isDarkMode}
            onHome={volverInicio}
            onSearchPokemon={buscarPokemonPorTexto}
            onSearchMove={buscarMovimientoPorTexto}
            onSearchItem={buscarItemPorTexto}
            onTypeChange={cambiarTipo}
            onGenerationChange={cambiarGeneracion}
            onShowTeam={() => setTeamOpen(true)}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          />
          <ModuleTabs moduloActual={moduloActual} onChange={setModuloActual} />

          <main>
            <PokemonSection
              hidden={moduloActual !== 'pokemon'}
              pokemones={pokemones}
              status={pokemonStatus}
              inicioActual={inicioActual}
              totalPokemones={totalPokemones}
              onOpenPokemon={abrirPokemon}
              onPrevious={() => setInicioActual(Math.max(0, inicioActual - cantidadPorPagina))}
              onNext={() => setInicioActual(inicioActual + cantidadPorPagina)}
            />
            <MoveSection
              hidden={moduloActual !== 'moves'}
              movimientos={movimientos}
              status={moveStatus}
              onOpenMove={(movimiento) => setModal({ tipo: 'move', data: movimiento })}
            />
            <ItemSection
              hidden={moduloActual !== 'items'}
              items={items}
              status={itemStatus}
              onOpenItem={(item) => setModal({ tipo: 'item', data: item })}
            />
          </main>

          <TeamModal
            isOpen={teamOpen}
            equipo={equipo}
            onClose={() => setTeamOpen(false)}
            onRename={setRenameId}
            onRemove={eliminarDelEquipo}
          />
          <RenameModal pokemon={pokemonRenombrar} onClose={() => setRenameId(null)} onSave={guardarNuevoNombre} />
          <Modal isOpen={Boolean(modal)} onClose={() => setModal(null)}>
            {modal?.tipo === 'pokemon' && (
              <PokemonDetail
                pokemon={modal.data}
                evolutionData={evolutionData}
                onAddTeam={agregarAlEquipo}
                onOpenPokemon={abrirPokemon}
              />
            )}
            {modal?.tipo === 'move' && <MoveDetail movimiento={modal.data} />}
            {modal?.tipo === 'item' && <ItemDetail item={modal.data} />}
          </Modal>
        </>
      )}
    </>
  );
}
