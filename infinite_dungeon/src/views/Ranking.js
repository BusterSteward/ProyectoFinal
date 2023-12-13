import { useState, useRef, useEffect, useContext } from "react";
import  Paginacion from "../components/Paginacion/paginacion.js"
import "./CSS/cargando.css"
import "./CSS/ranking.css"
import {faArrowRotateLeft} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import  AppContext from "../AppContext"
import Cookies from "universal-cookie"

function Ranking({logeado}) {

    const context = useContext(AppContext)
    const [filtro, setFiltro] = useState(false)
    const [numPaginacion, setPaginacion] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const initialized = useRef(false)
    const [data, setData] = useState(null);
    const nRegistros = 8

    console.log("filtro",filtro)
    const fetchData = async () => {
        try {
            setIsLoading(true);
            //const url = "http://localhost:3000/prueba"
            let url = `http://localhost:3000/puntuaciones?numPagina=${numPaginacion}&nRegistros=${nRegistros}`;
            if(filtro) {
                const cookies = new Cookies()
                const usuario = cookies.get("usuario")
                url += `&email=${usuario}`
            }
            console.log("url",url)
            fetch(url).then((res) =>{
                return res.json();
            }).then(datos =>{
                setData(datos);
                setIsLoading(false);
                console.log("Success:", datos)
            });
            //const data = await response.text();
           
            
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    useEffect(() => {
        
        if (!initialized.current) {
            initialized.current = true
            fetchData();
        }
    },[numPaginacion,filtro])
    
    const handleFiltro = () => {
        initialized.current = false;
        setFiltro(!filtro)
        
    }
    const botonFiltro = logeado ? <button className={filtro ? "activo":"NoActivo"} onClick={handleFiltro}>Mis puntuaciones</button>: <></>
    
    let jsx;
    if (isLoading) {
        jsx = 
            <div className="container">
                <div className="camino">
                    <div className="centro"></div>
                    <div className="esfera"></div>
                </div>
                <div className="camino" id="camino2">
                    <div className="esfera" id="esfera2"></div>
                </div>
                <div className="camino" id="camino3">
                    <div className="esfera" id="esfera3"></div>
                </div>
                <div className="camino" id="camino4">
                    <div className="esfera" id="esfera4"></div>
                </div>
                <div className="camino" id="camino5">
                    <div className="esfera" id="esfera5"></div>
                </div>
            </div>
    } else {
        jsx =  <Paginacion numPagina={numPaginacion} setPagina={setPaginacion} nRegistros={nRegistros} datosPeticion={data} referencia={initialized} boton={botonFiltro}></Paginacion>
    } 
    const backToMenu = () => {
        context.setPagina("inicio")
    }

   
    return (
        <>
            <FontAwesomeIcon icon={faArrowRotateLeft}  className="volver" onClick={backToMenu}/>
            {jsx}
        </>
    );
}

export default Ranking;