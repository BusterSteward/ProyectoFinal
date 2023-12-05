import { useContext } from "react";
import AppContext from '../../../AppContext';
import './OptionMenu.css';

function OptionMenu({clase, text}) {

    const context = useContext(AppContext);

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
    const handleClick = () => {
        let nuevaPagina
        switch(text) {

            case "Iniciar partida":
                nuevaPagina = "iniciarPartida";
                break;
            case "Cargar partida":
                nuevaPagina = "cargarPartida";
                break;
            case "Cerrar sesión":
                nuevaPagina = "inicio";
                break;
            case "Ver puntuaciones":
                nuevaPagina = "ranking";
            case "login":
                nuevaPagina = "login";
                break
            case "registro":
                nuevaPagina = "registro";
                break
           
            default:
                nuevaPagina = "cambiado"
                break;
        }
        context.setPagina(nuevaPagina);
    }

    return (
        <button className={clase+" OptionMenu"} onClick={handleClick}>{text}</button>
    );

}

export default OptionMenu;