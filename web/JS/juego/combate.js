"use strict";

import { Enemigo } from "./enemigo.js";
import * as Tiradas from "./tiradas.js";

export class Combate{
    constructor(nivel){
        this.enemigos = generarEnemigos(nivel);  
    }

    static generarEnemigos(nivel) {

        let limiteInferior, limiteSuperior, grupoMaximo, tamGrupo, rangoNiveles;
        let enemigos = [];

        if(nivel<3) {
            grupoMaximo = 1;
        } 
        else if(nivel<8){
            grupoMaximo = 2
        }
        else if(nivel < 12) {
            grupoMaximo = 3
        }
        else {
            grupoMaximo = 4
        }

        tamGrupo = Math.trunc((Math.random() * 4) + 1);
        let nivelEnemigoAux;
        for(let i = 1; i <= tamGrupo; i++) {
            limiteInferior = Math.trunc(nivel*0.3);
            limiteSuperior = Math.trunc(nivel*0.7);
            rangoNiveles = limiteSuperior-limiteInferior;
            nivelEnemigoAux = Math.trunc((Math.random()*rangoNiveles) + limiteInferior);

            enemigos.push(new Enemigo(nivelEnemigoAux));
            nivel -= nivelEnemigoAux;
        }
        return enemigos;
    }

    combatir(jugador){
        let huida=false;
        while(jugador.vida>0 && this.enemigo.vida>0 && !huida){
            huida = accionDeCombate(jugador);
            //this.rondaDeAtaques(jugador);
        }
        
        if(huida) return 3;

        if(jugador.vida>0) 
            return 1;
        else 
            return 2;
    }

    rondaDeAtaques(jugador){
        let prueba=Tiradas.pruebaVelocidadEnfrentada(jugador,this.enemigo);
        let orden;
        
        if(prueba){
            orden=[jugador,this.enemigo];
            console.log("El jugador ataca primero");
        }
        else{
            orden=[this.enemigo,jugador];
            console.log("El enemigo ataca primero");
        }
        
        orden[0].atacar(orden[1]);

        if(orden[1].vida>0){
            orden[1].atacar(orden[0]);
        }
    }
    accionDeCombate(jugador){
        let accion;
        let enemigo=this.enemigo;

        accion=prompt(   `Elige una acción:
                        1-Ataque normal
                        2-Ataque fuerte
                        3-Rodar
                        4-Bloquear
                        5-Usar objeto
                        6-Huir`);
        switch(accion){
            case "1":
                rondaDeAtaques(jugador);
                break;
            case "2":
                
                
                jugador.ataqueT=jugador.ataque;
                jugador.velodidadT=-10;
                rondaDeAtaques(jugador);
                jugador.ataqueT=0;
                jugador.velodidadT=0;
                break;
            case "3":
                let multPeso=jugador.penalizacionPeso();
               
                jugador.agilidadT=jugador.agilidad;
                this.enemigo.ataqueT=Math.trunc(Math.random()*enemigo.ataque)+1;
                this.enemigo.atacar(jugador);
                this.enemigo.ataqueT=0;
                break;
            case "4":
                
                jugador.defensaT=Math.trunc(Math.random()*(jugador.defensa/2))+(jugador.defensa/2)+1;
                this.enemigo.atacar(jugador);
                break;
            case "5":
                jugador.usarObjeto(this.enemigo);
                break;
            case "6":
                let huida = Tiradas.pruebaVelocidadEnfrentada(jugador,this.enemigo);
                if(huida){
                    return true;
                }
                else{
                    console.log("No has conseguido huir")
                    this.enemigo.atacar(jugador);
                }
                break;
        }
    }
}