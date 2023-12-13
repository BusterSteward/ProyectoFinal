import {useContext} from "react";
import AppContext from "../AppContext";
import "./estilos.css"
import Cookies from "universal-cookie"
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login() {
    
    const context = useContext(AppContext)

    const Logearse = async (e) => {
        e.preventDefault()
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
       
        let url = `http://localhost:3000/usuarios/?email=${email}&password=${password}`;
        try{
            const res = await fetch(url)
            const data = await res.json()

            if(data.ok){
                const cookies = new Cookies()
                cookies.set("usuario", email, {path: "/"})
                context.setLogged(true)
                context.setPagina("inicio")
            }
            else{
                alert("Usuario o contraseña incorrectos")
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
                document.getElementById("email").focus();
            }

        }
        catch(error){
            console.log(error)
            alert("Ha habido algún problema en la conexión con el servidor")
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            document.getElementById("email").focus();
        }
        return false;
        
    }

    const backToMenu = () => {
        context.setPagina("inicio")
    }
    return (
        <div className="login">
            
            <form onSubmit={Logearse}>
            <FontAwesomeIcon icon={faArrowRotateLeft} className="volver" onClick={backToMenu}/><h2>Infinite dungeon</h2>
                <label>Email:<input id="email" type="email" name="email" /></label>
                <label> Password:<input id="password" type="password" name="password" /></label>
                <input type="submit" value="Login"/>
            </form>
        </div>
    );
}

export default Login;