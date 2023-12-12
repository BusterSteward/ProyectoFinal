import {useContext} from "react";
import AppContext from "../AppContext";
import "./estilos.css"
import Cookies from "universal-cookie"
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Registro() {

    const context = useContext(AppContext)

    const Registrarse = async (e) => {
        e.preventDefault()
        let email = document.getElementById("email").value;
        let nombre = document.getElementById("nombre").value;
        let password = document.getElementById("password").value;
       
        let url = `http://localhost:3000/usuarios`;
        try{
            const res = await fetch(url,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "email":email,
                        "nombre":nombre,
                        "password":password
                    })
            })
            const data = await res.json()

            if(data.ok){
                const cookies = new Cookies()
                cookies.set("usuario", email, {path: "/"})
                context.setLogged(true)
                context.setPagina("inicio")
            }
            else{
                alert("Este usuario ya ha sido registrado")
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
                document.getElementById("nombre").value = "";
                document.getElementById("email").focus();
            }

        }
        catch(error){
            console.log(error)
            alert("Ha habido algún problema en la conexión con el servidor")
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            document.getElementById("nombre").value = "";
            document.getElementById("email").focus();
        }
        return false;
        
    }

    const backToMenu = () => {
        context.setPagina("inicio")
    }
    return (
        <div className="login">
            
            <form onSubmit={Registrarse}>
            <FontAwesomeIcon icon={faArrowRotateLeft} className="icono" onClick={backToMenu}/><h2>Infinite dungeon</h2>
                <label>Email:<input id="email" type="email" name="email" /></label>
                <label>Nombre:<input id="nombre" type="text" name="nombre" /></label>
                <label> Password:<input id="password" type="password" name="password" /></label>
                <input type="submit" value="Registrarse"/>
            </form>
        </div>
    );
}

export default Registro;