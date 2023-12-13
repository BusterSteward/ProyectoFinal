import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./paginacion.css"

function Paginacion({numPagina, setPagina, nRegistros, datosPeticion, referencia, boton}) {
    const nRows = datosPeticion.datos.count
    const rows = datosPeticion.datos.rows
    const lastPage = Math.ceil(nRows / nRegistros);
    const handleBefore = () => {
        if(numPagina > 1){
            referencia.current = false;
            setPagina(numPagina - 1);
        }
    }
    const handleAfter = () => {
        if(numPagina < lastPage){
            referencia.current = false;
            setPagina(numPagina + 1);
        }
    }

    console.log("datospeticion",rows)

    const body = 
        <tbody>
            {
                rows.map((row, index) => {
                    return <tr className={ index % 2 == 0 ? "" :"impar"}>
                        <td>{row.Usuario.nombre}</td>
                        <td>{row.puntos}</td>
                        <td className="fecha">{row.fecha}</td>
                        <td>{row.salas}</td>
                    </tr>
                })
            }
        </tbody>
    return (
        <>
            <h2>Ranking</h2>
            {boton}
            <div className="Paginacion">
                <table>
                    <thead>
                        <tr>
                            <th>Jugador</th>
                            <th>Puntos</th>
                            <th>Fecha</th>
                            <th>Salas</th>
                        </tr>
                    </thead>
                    {body}  
                </table>
                <div className="botoneraPaginacion">
                    <FontAwesomeIcon icon={faAngleDoubleLeft} className="icono" onClick={handleBefore}/>
                    <span>{numPagina}</span>
                    <FontAwesomeIcon icon={faAngleDoubleRight} className="icono" onClick={handleAfter}/>

                </div>
            </div>
        </>
    )
}

export default Paginacion;