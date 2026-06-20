# PokeApi en React

Aplicacion web tipo Pokedex creada con React y Vite. Consume datos de la API publica de Pokemon para mostrar Pokemones, movimientos e items en una interfaz interactiva.

## Caracteristicas

- Listado de Pokemones con paginacion.
- Busqueda de Pokemon por nombre o numero.
- Filtros por tipo y generacion.
- Vista de detalle con informacion del Pokemon y linea evolutiva.
- Seccion de movimientos con busqueda y detalle.
- Seccion de items con busqueda y detalle.
- Equipo Pokemon de hasta 6 integrantes.
- Opcion para renombrar Pokemones del equipo.
- Guardado del equipo en `localStorage`.
- Modo claro y modo oscuro.

## Tecnologias utilizadas

- React
- Vite
- JavaScript
- HTML
- CSS
- PokeAPI

## Requisitos

Antes de correr el proyecto necesitas tener instalado:

- Node.js
- npm

Puedes verificarlo con:

```bash
node -v
npm -v
```

## Instalacion

Clona el repositorio:

```bash
git clone https://github.com/MeiMeiOk/PokeApi_en_REACT.git
```

Entra a la carpeta del proyecto:

```bash
cd PokeApi_en_REACT
```

Instala las dependencias:

```bash
npm install
```

## Ejecutar el proyecto

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Despues abre en el navegador la URL que muestre Vite, normalmente:

```text
http://localhost:5173
```

Si PowerShell bloquea `npm`, puedes usar:

```powershell
npm.cmd install
npm.cmd run dev
```

## Crear version de produccion

Para generar los archivos finales:

```bash
npm run build
```

Para previsualizar la version generada:

```bash
npm run preview
```

## Estructura principal

```text
src/
  components/     Componentes visuales de la aplicacion
  services/       Funciones para consumir PokeAPI
  utils/          Funciones auxiliares de formato y estilos
  App.jsx         Componente principal
  main.jsx        Entrada de React
```

## API utilizada

Este proyecto utiliza [PokeAPI](https://pokeapi.co/), una API publica con informacion de Pokemon, movimientos, tipos, generaciones e items.

## Autor

Proyecto creado por MeiMeiOk.
