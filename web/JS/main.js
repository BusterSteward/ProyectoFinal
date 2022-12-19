"use strict";

import { Interfaz } from "./interfaz.js";
import { Partida } from "./partida.js";

var partida;

var canvas = document.createElement("canvas");
canvas.setAttribute("width","400");
canvas.setAttribute("height","400");
canvas.style.border = "1px solid blue";
document.querySelector("main").appendChild(canvas);

document.getElementById("up").addEventListener("click",()=>{
    partida.getJugador().mover(1);
    Interfaz.refrescarBotones(partida);
});
document.getElementById("right").addEventListener("click",()=>{
    partida.getJugador().mover(2);
    Interfaz.refrescarBotones(partida);
});
document.getElementById("down").addEventListener("click",()=>{
    partida.getJugador().mover(3);
    Interfaz.refrescarBotones(partida);
});
document.getElementById("left").addEventListener("click",()=>{
    partida.getJugador().mover(4);
    Interfaz.refrescarBotones(partida);
});

document.getElementById("girarse").addEventListener("click",()=>{
    partida.getJugador().girarse();
    Interfaz.refrescarBotones(partida);
})
partida = new Partida();

Interfaz.refrescarBotones(partida);
