"use strict";

import { Jugador } from "./jugador.js";

export class Enemigo{
    constructor(nivel,boss){
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

        let orden=Enemigo.pruebaVelocidadEnfrentada(jugador,this);
        
        let esquiva=[],golpeCritico=[];
        esquiva[0]=Jugador.pruebaAgilidad(orden[1].agilidad);
        esquiva[1]=Jugador.pruebaAgilidad(orden[0].agilidad);

        golpeCritico[0]=Jugador.pruebaGolpeCritico(orden[0].suerte);
        golpeCritico[1]=Jugador.pruebaGolpeCritico(orden[1].suerte);

        let danio;
        let clase;
        if(orden[0] instanceof Jugador){
            clase="jugador";
        }
        else{
            clase="enemigo";
        }
        if(!esquiva[0]){
            danio=orden[0].ataque;
            if(golpeCritico[0]){
                danio*=2;
                console.log("GOLPE CRÍTICO");
            }
            danio-=orden[1].defensa;
            orden[1].vida-=danio;
            
            console.log("El "+clase+" ha recibido "+danio+" puntos de daño.");
        }
        else{
            console.log("El "+clase+" ha esquivado el ataque.");
        }
        if(orden[1].vida>0){
            if(orden[1] instanceof Jugador){
                clase="jugador";
            }
            else{
                clase="enemigo";
            }
            if(!esquiva[1]){
                danio=orden[1].ataque;
                if(golpeCritico[1]){
                    danio*=2;
                    console.log("GOLPE CRÍTICO");
                }
                danio-=orden[0].defensa;
                orden[0].vida-=danio;
                
                console.log("El "+clase+" ha recibido "+danio+" puntos de daño.");
            }
            else{
                console.log("El "+clase+" ha esquivado el ataque.");
            }
            
        }

    }
    static pruebaVelocidadEnfrentada(jugador,enemigo){
        let tiradaJugador=Math.trunc(Math.random()*20)+1;
        let tiradaEnemigo=Math.trunc(Math.random()*20)+1;
        let res;

        if((tiradaJugador+jugador.velocidad)>(tiradaEnemigo+enemigo.velocidad)){
            res=[jugador,enemigo];
            console.log("El jugador ataca primero.");
        }
        else{
            res=[enemigo,jugador];
            console.log("El enemigo ataca primero.");
        } 
        

        return res;
    }

}