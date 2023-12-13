import './App.css';
import {useState, useEffect, useRef} from "react";
import MenuInicial from './components/MenuInicial/MenuInicial';
import Cambiado from './components/Cambiado.js';
import AppContext from './AppContext';
import Registro from './views/Registro';
import Login from './views/Login';
import Ranking from './views/Ranking';
import GuardarPartida from './views/GuardarPartida';
import CargarPartida from './views/CargarPartida';
import Mapa from './views/Mapa';
import Combate from './views/Combate';
import Dungeon from './views/Dungeon';
import Inventario from './views/Inventario';
import SubirNivel from './views/SubirNivel';
import FondoPantalla from './components/FondoPantalla/fondoPantalla.js';
import Cookies from "universal-cookie";

const audios = require.context("/src/assets/audios", true)
const imagenes = require.context("/src/assets/images", true)

function App() {
  const [pagina, setPagina] = useState("inicio");
  const [logged, setLogged] = useState(false);
  const [audio, setAudio] = useState("explorando");
  const [imagen, setImagen] = useState("portada");

  const music = "./" + audio + ".wav";
  const portada = "./" + imagen + ".png";

  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          // Manejar el error de reproducción automática (puede deberse a políticas del navegador)
          console.error('Error al reproducir audio:', error);
        });
      }
    };

    // Agregar un listener de clic al documento para detectar la interacción del usuario
    document.addEventListener('click', playAudio);

    // Limpieza del efecto al desmontar el componente
    return () => {
      document.removeEventListener('click', playAudio);
    };
  }, []);

  useEffect(() => {
    
    const cookies = new Cookies();
    const usuario = cookies.get("usuario");
    if(usuario){
      setLogged(true)
    }
    else{
      setLogged(false)
    }
  },[])
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
      nodo=<Login/>
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
    "setLogged":setLogged,
    "setAudio":setAudio
  }
  return (
    <div className="App">
      <FondoPantalla></FondoPantalla>
      <audio ref={audioRef} src={audios(music)} autoPlay loop/>
      <AppContext.Provider value={context}>
        {nodo}
        
      </AppContext.Provider> 
    </div>
  );
}
export default App;
