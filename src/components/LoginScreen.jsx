import logo from '../../pokedex_img-removebg-preview.png';

export default function LoginScreen({ onLogin }) {
  return (
    <div className="login-screen">
      <form className="login-card" onSubmit={onLogin}>
        <img src={logo} alt="Pokedex" className="login-logo" />
        <h1>Iniciar sesion</h1>
        <input type="text" placeholder="Usuario" required />
        <input type="password" placeholder="Contrasena" required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
