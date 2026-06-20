import logo from '../../pokedex_img-removebg-preview.png';
import darkIcon from '../../pokebolaobscuro.png';
import lightIcon from '../../pokebolaclara.png';
import { mayus } from '../utils/formatters.js';

export default function Navbar({
  moduloActual,
  tipos,
  generaciones,
  tipoActual,
  generacionActual,
  isDarkMode,
  onHome,
  onSearchPokemon,
  onSearchMove,
  onSearchItem,
  onTypeChange,
  onGenerationChange,
  onShowTeam,
  onToggleDarkMode
}) {
  const modeIcon = isDarkMode ? lightIcon : darkIcon;
  const modeAlt = isDarkMode ? 'modo claro' : 'modo obscuro';

  function submitSearch(event, callback) {
    event.preventDefault();
    const texto = new FormData(event.currentTarget).get('search') || '';
    callback(texto);
    event.currentTarget.reset();
  }

  return (
    <header className="navbar">
      <button className="logo-button" type="button" aria-label="Ir a la primera pagina" onClick={onHome}>
        <img src={logo} alt="Imagen de la Pokedex" />
      </button>

      <div className="top-controls">
        <form
          className={`search-container ${moduloActual !== 'pokemon' ? 'hidden' : ''}`}
          onSubmit={(event) => submitSearch(event, onSearchPokemon)}
        >
          <input type="text" name="search" placeholder="Buscar Pokemon..." />
          <select value={tipoActual} onChange={(event) => onTypeChange(event.target.value)}>
            <option value="">Todos los tipos</option>
            {tipos.map((tipo) => (
              <option key={tipo.name} value={tipo.name}>
                {mayus(tipo.name)}
              </option>
            ))}
          </select>
          <select value={generacionActual} onChange={(event) => onGenerationChange(event.target.value)}>
            <option value="">Todas las generaciones</option>
            {generaciones.map((generacion, index) => (
              <option key={generacion.name} value={generacion.name}>
                Generacion {index + 1}
              </option>
            ))}
          </select>
          <button type="button" onClick={onShowTeam}>Ver equipo</button>
          <button type="button" className="dark-mode-button" onClick={onToggleDarkMode}>
            <img src={modeIcon} alt={modeAlt} className="img-modo" />
          </button>
        </form>

        <form
          className={`search-container ${moduloActual !== 'moves' ? 'hidden' : ''}`}
          onSubmit={(event) => submitSearch(event, onSearchMove)}
        >
          <input type="text" name="search" placeholder="Buscar movimiento..." />
          <button type="button" className="dark-mode-button" onClick={onToggleDarkMode}>
            <img src={modeIcon} alt={modeAlt} className="img-modo" />
          </button>
        </form>

        <form
          className={`search-container ${moduloActual !== 'items' ? 'hidden' : ''}`}
          onSubmit={(event) => submitSearch(event, onSearchItem)}
        >
          <input type="text" name="search" placeholder="Buscar item..." />
          <button type="button" className="dark-mode-button" onClick={onToggleDarkMode}>
            <img src={modeIcon} alt={modeAlt} className="img-modo" />
          </button>
        </form>
      </div>
    </header>
  );
}
