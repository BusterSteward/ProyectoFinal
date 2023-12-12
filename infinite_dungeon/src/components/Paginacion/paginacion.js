import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Paginacion({numPagina, setPagina}) {
    const handleBefore = () => {
        if(numPagina > 1){
            setPagina(numPagina - 1);
        }
    }
    const handleAfter = () => {
        setPagina(numPagina + 1);
    }
    return (
        <div className="Paginacion">
            <FontAwesomeIcon icon={faAngleDoubleLeft} className="icono" onClick={handleBefore}/>
            <span>{numPagina}</span>
            <FontAwesomeIcon icon={faAngleDoubleRight} className="icono" onClick={handleAfter}/>
        </div>
    )
}

export default Paginacion;