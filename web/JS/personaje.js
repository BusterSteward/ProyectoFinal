"use strict";

export class Personaje{
    constructor(){
        this.ataque=1;
        this.defensa=0;
        this.agilidad=20;
        this.velocidad=1;
        this.suerte=1;

        this.agilidadT=0;
        this.ataqueT=0;
        this.defensaT=0;
        this.velodidadT=0;
        this.suerteT=0;

    }
    atacar(objetivo){
        let clase=objetivo.__proto__.constructor.name;
        let danio,esquiva,golpeCritico;

        esquiva=Personaje.pruebaAgilidad(objetivo.agilidad+objetivo.agilidadT);

        if(esquiva){
            console.log("El "+clase+" ha esquivado el ataque.");
        }
        else{
            golpeCritico=Personaje.pruebaGolpeCritico(this.suerte+this.suerteT);
            danio=this.ataque+this.ataqueT;
            if(golpeCritico){
                danio*=2;
                console.log("GOLPE CRÍTICO");
            }
            danio-=objetivo.defensa+objetivo.defensaT;
            objetivo.vida-=danio;
            
            console.log("El "+clase+" ha recibido "+danio+" puntos de daño.");
        } 
    }
    static pruebaGolpeCritico(suerte){
        let tirada=Math.trunc(Math.random()*100)+1;
        return tirada<=suerte;
    }
    static pruebaAgilidad(agilidad){
        let tirada = Math.trunc(Math.random()*100)+1;
        return tirada<=agilidad;
    }
    static pruebaVelocidad(velocidad, dificultad){
        let tirada = Math.trunc(Math.random()*20)+1;
        tirada+=velocidad;
        return tirada>=dificultad;
    }
    static pruebaVelocidadEnfrentada(jugador,enemigo){
        let tiradaJugador=Math.trunc(Math.random()*20)+1;
        let tiradaEnemigo=Math.trunc(Math.random()*20)+1;

        return (tiradaJugador+jugador.velocidad+jugador.velodidadT)>(tiradaEnemigo+enemigo.velocidad+enemigo.velodidadT);
    }
    static accionDeCombate(jugador,enemigo){
        let accion;
        accion=prompt(   `Elige una acción:
                        1-Ataque normal
                        2-Ataque fuerte
                        3-Rodar
                        4-Bloquear
                        5-Usar objeto
                        6-Huir`);
        switch(accion){
            case "1":
                enemigo.rondaDeAtaques(jugador);
                break;
            case "2":
                jugador.estamina-=3;
                jugador.ataqueT=jugador.ataque;
                jugador.velodidadT=-10;
                enemigo.rondaDeAtaques(jugador);
                jugador.ataqueT=0;
                jugador.velodidadT=0;
                break;
            case "3":
                jugador.estamina-=3;
                jugador.agilidadT=jugador.agilidad;
                enemigo.ataqueT=Math.trunc(Math.random()*enemigo.ataque)+1;
                enemigo.atacar(jugador);
                enemigo.ataqueT=0;
                break;
            case "4":
                jugador.estamina-=1;
                jugador.defensaT=Math.trunc(Math.random()*(jugador.defensa/2))+(jugador.defensa/2)+1;
                enemigo.atacar(jugador);
                break;
            case "5":
                jugador.usarObjeto(enemigo);
                break;
            case "6":
                let huida = Personaje.pruebaVelocidadEnfrentada(jugador,enemigo);
                if(huida){
                    return true;
                }
                else{
                    console.log("No has conseguido huir")
                    enemigo.atacar(jugador);
                }
                break;
        }
    }
}