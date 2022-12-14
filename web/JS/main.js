"use strict";

import{Laberinto} from "./laberinto.js";

//variables globales
var laberinto,tam=3;


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
document.body.appendChild(canvas);

inicializarLaberinto();

