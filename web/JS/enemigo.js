"use strict";

import { Personaje } from "./personaje.js";

export class Enemigo extends Personaje{
    constructor(nivel,boss){
        super();
        let limiteAgilidad=25;
        if(boss){
            nivel+=3;
            limiteAgilidad=40;
        }
        this.vida=Math.trunc(Math.random()*(nivel*5));
        if(this.vida<(nivel*5))
            this.vida=nivel*5;

        this.ataque=Math.trunc(Math.random()*nivel)+1;
        this.defensa=Math.trunc(Math.random()*nivel);
        this.agilidad=Math.trunc(Math.random()*nivel);
        if(this.agilidad>limiteAgilidad){
            this.agilidad=limiteAgilidad;
        }
        this.velocidad=Math.trunc(Math.random()*nivel);
        this.suerte=Math.trunc(Math.random()*nivel);
        this.recompensaExp=Math.trunc(Math.random()*nivel)+nivel;
        //posibilidad de drop
        //array de objetos dropeables
    }
    estaVivo(){
        return this.vida>0;
    }
    combate(jugador){
        while(jugador.vida>0&&this.vida>0){
            this.rondaDeAtaques(jugador);
        }
        return jugador.vida>0;
    }
    rondaDeAtaques(jugador){

        let orden=Personaje.pruebaVelocidadEnfrentada(jugador,this);
        
        orden[0].atacar(orden[1]);

        if(orden[1].vida>0){
            orden[1].atacar(orden[0]);
        }

    }
    

}