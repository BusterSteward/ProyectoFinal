import './OptionMenu.css';

function OptionMenu({clase, text, handleClick}) {


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
   
    return (
        <button className={clase} onClick={handleClick}>{text}</button>
    );

}

export default OptionMenu;