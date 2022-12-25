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
        this.recomensaOro=Math.trunc(Math.random()*nivel*((Math.trunc(Math.random()*4))+1))+1;
        //posibilidad de drop
        //array de objetos dropeables
    }
    estaVivo(){
        return this.vida>0;
    }
    
    combate(jugador){
        let huida=false;
        while(jugador.vida>0 && jugador.estamina>0 && this.vida>0 || huida){
            huida = Personaje.accionDeCombate(jugador,this);
            //this.rondaDeAtaques(jugador);
        }
        
        if(huida) return 3;

        if(jugador.vida>0 && jugador.estamina>0) 
            return 1;
        else 
            return 2;


    }
    atacar(jugador){
        super.atacar(jugador);
        jugador.agilidadT=0;
        jugador.defensaT=0;
    }
    rondaDeAtaques(jugador){

        let prueba=Personaje.pruebaVelocidadEnfrentada(jugador,this);
        let orden;
        
        if(prueba){
            orden=[jugador,this];
            console.log("El jugador ataca primero");
        }
        else{
            orden=[this,jugador];
            console.log("El enemigo ataca primero");
        }
        
        orden[0].atacar(orden[1]);

        if(orden[1].vida>0){
            orden[1].atacar(orden[0]);
        }

    }
    

}