"use strict";

import {Jugador} from "./jugador.js";
import{Laberinto} from "./laberinto.js";

export class Partida{
    #laberinto;
    #nivel;
    #jugador;

    constructor(){
        this.#nivel=1;
        this.#laberinto=new Laberinto(this.#nivel);
        this.#laberinto.generarLaberinto();
        this.#laberinto.pintarLaberinto();
        this.#jugador=new Jugador(this.#laberinto);
        this.#jugador.seleccionarSalida();
    }

    getLab(){return this.#laberinto}
    getNivel(){return this.#nivel}
    getJugador(){return this.#jugador}

    //actualiza todas las variables necesarias para pasar al siguiente laberinto
    pasarNivel(){
        this.#nivel++;
        this.#laberinto=new Laberinto(this.#nivel);
        this.#laberinto.generarLaberinto();
        this.#laberinto.pintarLaberinto();
        this.#jugador.setLab=this.#laberinto;
        this.#jugador.seleccionarSalida();
    }
}