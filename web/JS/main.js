"use strict";

import {Jugador} from "./jugador.js";
import{Laberinto} from "./laberinto.js";

//variables globales
var laberinto,tam=4;


//inicio del juego
function inicializarLaberinto(){
    laberinto=new Laberinto(tam);
    laberinto.generarLaberinto();
    laberinto.pintarLaberinto(canvas);
}
function refrescarBotones(){
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

var canvas = document.createElement("canvas");
canvas.setAttribute("width","400");
canvas.setAttribute("height","400");
canvas.style.border = "2px solid black";
document.querySelector("main").appendChild(canvas);

document.getElementById("up").addEventListener("click",()=>{
    jugador.mover(1);
    refrescarBotones();
});
document.getElementById("right").addEventListener("click",()=>{
    jugador.mover(2);
    refrescarBotones();
});
document.getElementById("down").addEventListener("click",()=>{
    jugador.mover(3);
    refrescarBotones();
});
document.getElementById("left").addEventListener("click",()=>{
    jugador.mover(4);
    refrescarBotones();
});

document.getElementById("girarse").addEventListener("click",()=>{
    jugador.girarse();
    refrescarBotones();
})
inicializarLaberinto();
var jugador = new Jugador(laberinto);
jugador.seleccionarSalida(laberinto);
refrescarBotones();
