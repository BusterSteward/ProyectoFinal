import { useState, useEffect, useContext } from "react";
import AppContext from '../../AppContext';
import OptionMenu from "./OptionMenu/OptionMenu";
import './MenuInicial.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAnglesDown, faAnglesUp} from '@fortawesome/free-solid-svg-icons'
import Cookies from 'universal-cookie';

const loggedOptions = ["Iniciar partida","Cargar partida","Ver ranking","Cerrar sesión"]
const unloggedOptions = ["Iniciar sesión", "Registro","Iniciar partida","Ver ranking"]

function MenuInicial({logeado}) {

    const context = useContext(AppContext);
    
    const [activo, setActivo] = useState(0);
    
    const handleAccept = () => {
        let nuevaPagina, text;
        if(logeado){
            text = loggedOptions[activo];
        }
        else {
            text = unloggedOptions[activo];
        }
        switch(text) {

            case "Iniciar partida":
                nuevaPagina = "iniciarPartida";
                break;
            case "Cargar partida":
                nuevaPagina = "cargarPartida";
                break;
            case "Cerrar sesión":
                const cookies = new Cookies();
                cookies.remove('usuario');
                context.setLogged(false)
                nuevaPagina = "inicio";
                break;
            case "Ver ranking":
                nuevaPagina = "ranking";
                break;
            case "Iniciar sesión":
                nuevaPagina = "login";
                break
            case "Registro":
                nuevaPagina = "registro";
                break
           
            default:
                nuevaPagina = "cambiado"
                break;
        }
        context.setPagina(nuevaPagina);
    }

    const handleKeyDown = (e) => {
        switch(e.key) {
            case "ArrowUp":
                handleUp();
                break;
            case "ArrowDown":
                handleDown();
                break;
            case "Enter":
                handleAccept();
                break;
            default:
                console.log("Tecla no soportada");
                break;
        }
    }
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    })

    let optionActive,optionUp,optionDown;
    const handleUp = () => {
        if(logeado){
            if(activo === 0){
                setActivo(loggedOptions.length - 1);
            }
            else {
                setActivo(activo - 1);
            }
        }
        else {
            if(activo === 0){
                setActivo(unloggedOptions.length - 1);
            }
            else {
                setActivo(activo - 1);
            }
        }
    } 
    const handleDown = () => {
        if(logeado){
            if(activo === loggedOptions.length - 1){
                setActivo(0);
            }
            else {
                setActivo(activo + 1);
            }
        
        }
        else {
            if(activo === unloggedOptions.length - 1){
                setActivo(0);
            }
            else {
                setActivo(activo + 1);
            }
        }
    }
    
    if(logeado){
        if(activo === 0) {
            optionDown = <OptionMenu clase="transparente" key={loggedOptions.length - 1} text={loggedOptions[loggedOptions.length - 1]} handleClick={handleUp}/>
        }
        if(activo === loggedOptions.length - 1) {
            optionUp = <OptionMenu clase="transparente" key={0} text={loggedOptions[0]} handleClick={handleDown}/>    
        }
        for(let i = 0; i < loggedOptions.length; i++) {
            if(i === activo) {
                optionActive = <OptionMenu clase="parpadeo" key={i} text={loggedOptions[i]} handleClick={handleAccept}/>
            }
            if(i === activo + 1){
                optionUp = <OptionMenu clase="transparente" key={i} text={loggedOptions[i]} handleClick={handleDown}/>
            }
            if(i === activo - 1){
                optionDown = <OptionMenu clase="transparente" key={i} text={loggedOptions[i]} handleClick={handleUp}/>
            }
        }
    }
    else{
        if(activo === 0) {
            optionDown = <OptionMenu clase="transparente" key={unloggedOptions.length - 1} text={unloggedOptions[unloggedOptions.length - 1]} handleClick={handleUp} />
        }
        if(activo === loggedOptions.length - 1) {
            optionUp = <OptionMenu clase="transparente" key={0} text={unloggedOptions[0]} handleClick={handleDown}/>    
        }
        for(let i = 0; i < unloggedOptions.length; i++) {
            if(i === activo) {
                optionActive = <OptionMenu clase="parpadeo" key={i} text={unloggedOptions[i]} handleClick={handleAccept} />
            }
            if(i === activo + 1){
                optionUp = <OptionMenu clase="transparente" key={i} text={unloggedOptions[i]} handleClick={handleDown}/>
            }
            if(i === activo - 1){
                optionDown = <OptionMenu clase="transparente" key={i} text={unloggedOptions[i]} handleClick={handleUp}/>
            
            }
        }
    }
    return (
        <>
        
            <h2>Infinite Dungeon</h2>
            <div className="menu">
                <FontAwesomeIcon icon={faAnglesUp} className="icono" onClick={handleUp}/>
                {optionDown}
                {optionActive}
                {optionUp}
                <FontAwesomeIcon icon={faAnglesDown} className="icono" onClick={handleDown}/>
            </div>
        </>   
    );
}
export default MenuInicial;