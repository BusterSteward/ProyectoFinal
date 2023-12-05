import './App.css';
import {useState} from "react";
import MenuInicial from './components/MenuInicial/MenuInicial';
import Cambiado from './components/Cambiado.js';
import AppContext from './AppContext';

function App() {
  const [pagina, setPagina] = useState("inicio");
  const [logged, setLogged] = useState(false);

  /*
  paginas que se podran visualizar:
  inicio{
    logeado
    nologeado
  }
  registro
  login
  ranking -> si esta logeado aparece la opcion de ver solamente tus partidas
  IniciarPartida{
    dungeon
    mapa
    combate
    inventario
    subirNivel
  }
  GuardarPartida (Solo logeado)
  CargarPartida (Solo logeado)
  */
  let nodo;
  switch(pagina){
    case "inicio":
      nodo=<MenuInicial logeado={logged}></MenuInicial>
      break;
    case "registro":
      nodo=<Registro></Registro>
      break;
    case "login":
      nodo=<Login></Login>
      break;
    case "ranking":
      nodo=<Ranking logeado={logged}></Ranking>
      break;
    case "GuardarPartida":
      nodo=<GuardarPartida></GuardarPartida>
      break;
    case "CargarPartida":
      nodo=<CargarPartida></CargarPartida>
      break;
    case "mapa":
      nodo=<Mapa></Mapa>
      break;
    case "combate":
      nodo=<Combate></Combate>
      break;
    case "dungeon":
      nodo=<Dungeon></Dungeon>
      break;
    case "inventario":
      nodo=<Inventario></Inventario>
      break;
    case "subirNivel":
      nodo=<SubirNivel></SubirNivel>
      break;
    
    default:
      nodo=<Cambiado></Cambiado>
      break;
  }
  const context = {
    "setPagina":setPagina,
    "setLogged":setLogged
  }
  return (
    <div className="App">
      <AppContext.Provider value={context}>
        {nodo}
      </AppContext.Provider> 
    </div>
  );
}
export default App;
