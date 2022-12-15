"use strict";

import {Jugador} from "./jugador.js";
import{Laberinto} from "./laberinto.js";

//variables globales
var laberinto,tam=3;
var jugador = new Jugador();

//inicio del juego
function inicializarLaberinto(){
    laberinto=new Laberinto(tam);
    laberinto.generarLaberinto();
    laberinto.pintarLaberinto(canvas);
}

var canvas = document.createElement("canvas");
canvas.setAttribute("width","400");
canvas.setAttribute("height","400");
canvas.style.border = "2px solid black";
document.querySelector("main").appendChild(canvas);

document.getElementById("up").addEventListener("click",()=>{
    jugador.mover(1);
});
document.getElementById("right").addEventListener("click",()=>{
    jugador.mover(2);
});
document.getElementById("down").addEventListener("click",()=>{
    jugador.mover(3);
});
document.getElementById("left").addEventListener("click",()=>{
    jugador.mover(4);
});
inicializarLaberinto();
jugador.seleccionarSalida(laberinto);
