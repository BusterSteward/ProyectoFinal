import { useEffect, useState } from "react";
import  Paginacion from "../components/Paginacion/paginacion.js"

function Ranking() {

    const [numPagina, setPagina] = useState(1);
    const registrosPorPagina = 2
    
    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const url = "http://localhost:3000/prueba"
                //const url = `http://localhost:3000/puntuaciones?numPagina=${numPagina}&registrosPorPagina=${registrosPorPagina}`;
                const response = await fetch(url);
                const data = await response.text();
                console.log("Success:", data);
                
            } catch (error) {
                console.error("Error:", error);
            }
        };
        
         fetchData();

    },[])

    return (
        <>
            <h2>Tabla de puntuaciones</h2>
            <Paginacion numPagina={numPagina} setPagina={setPagina}></Paginacion>
        </>
    );
}

export default Ranking;