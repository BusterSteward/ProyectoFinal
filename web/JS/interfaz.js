"use strict";

export class Interfaz{

    static borrarElemento(selector){
        let elemento = document.querySelector(selector);

        if(!elemento){
            console.log("El elemento no existe");
        }
        else{
            let padre = elemento.parentNode;
            padre.removeChild(elemento);
        }
        
    }
    static borrarElementos(selector){
        let elementos = document.querySelectorAll(selector);

        if(!elementos){
            console.log("El elemento no existe");
        }
        else{
            elementos.forEach(elemento =>{
                let padre = elemento.parentNode;
                padre.removeChild(elemento);
            });
        }
        
    }
    //muestra u oculta los botones para moverse en función de los muros de la celda y
    //la direccion de la vista del jugador
    static refrescarBotones(partida){
        let laberinto=partida.getLab();
        let jugador=partida.getJugador();
        let celda = laberinto.getCelda(jugador.position.x,jugador.position.y)
        switch(jugador.direction){
            case 1:
                document.getElementById("down").classList.add("ocultar");
                celda.walls.top ?       document.getElementById("up").classList.add("ocultar") :
                                        document.getElementById("up").classList.remove("ocultar");
                celda.walls.left ?      document.getElementById("left").classList.add("ocultar") :
                                        document.getElementById("left").classList.remove("ocultar");
                celda.walls.right ?     document.getElementById("right").classList.add("ocultar") :
                                        document.getElementById("right").classList.remove("ocultar");
                break;
            case 2:
                document.getElementById("left").classList.add("ocultar");
                celda.walls.top ?       document.getElementById("up").classList.add("ocultar") :
                                        document.getElementById("up").classList.remove("ocultar");
                celda.walls.bottom ?    document.getElementById("down").classList.add("ocultar") :
                                        document.getElementById("down").classList.remove("ocultar");
                celda.walls.right ?     document.getElementById("right").classList.add("ocultar") :
                                        document.getElementById("right").classList.remove("ocultar");
                break;
            case 3:
                document.getElementById("up").classList.add("ocultar");
                celda.walls.bottom ?    document.getElementById("down").classList.add("ocultar") :
                                        document.getElementById("down").classList.remove("ocultar");
                celda.walls.left ?      document.getElementById("left").classList.add("ocultar") :
                                        document.getElementById("left").classList.remove("ocultar");
                celda.walls.right ?     document.getElementById("right").classList.add("ocultar") :
                                        document.getElementById("right").classList.remove("ocultar");
                break;
            case 4:
                document.getElementById("right").classList.add("ocultar");
                celda.walls.top ?       document.getElementById("up").classList.add("ocultar") :
                                        document.getElementById("up").classList.remove("ocultar");
                celda.walls.left ?      document.getElementById("left").classList.add("ocultar") :
                                        document.getElementById("left").classList.remove("ocultar");
                celda.walls.bottom ?    document.getElementById("down").classList.add("ocultar") :
                                        document.getElementById("down").classList.remove("ocultar");
                break;
        }
    }
}