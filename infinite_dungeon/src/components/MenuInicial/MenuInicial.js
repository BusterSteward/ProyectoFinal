import { useState } from "react";
import OptionMenu from "./OptionMenu/OptionMenu";

const loggedOptions = ["Iniciar partida","Cargar partida","Ver ranking","Cerrar sesión"]
const unloggedOptions = ["Iniciar sesión", "Registro","Iniciar partida","Ver ranking"]

function MenuInicial({logeado}) {

    const [activo, setActivo] = useState(0);

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
        for(let i = 0; i < loggedOptions.length; i++) {
            if(i === activo) {
                optionActive = <OptionMenu clase="parpadeo" key={i} text={loggedOptions[i]} />
            }
            if(i === activo + 1){
                optionUp = <OptionMenu clase="transparente" key={i} text={loggedOptions[i]} />
            }
            if(i === activo - 1){
                optionDown = <OptionMenu clase="transparente" key={i} text={loggedOptions[i]} />
            
            }
        }
    }
    else{
        for(let i = 0; i < unloggedOptions.length; i++) {
            if(i === activo) {
                optionActive = <OptionMenu clase="parpadeo" key={i} text={unloggedOptions[i]} />
            }
            if(i === activo + 1){
                optionUp = <OptionMenu clase="transparente" key={i} text={unloggedOptions[i]} />
            }
            if(i === activo - 1){
                optionDown = <OptionMenu clase="transparente" key={i} text={unloggedOptions[i]} />
            
            }
        }
    }
    return (
        <>
            <h2>Infinite Dungeon</h2>
            {optionUp}
            {optionActive}
            {optionDown}
        </>   
    );
}
export default MenuInicial;