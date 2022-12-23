"use strict";

export class Personaje{
    constructor(){
        this.ataque=1;
        this.defensa=0;
        this.agilidad=20;
        this.velocidad=1;
        this.suerte=1;
    }
    atacar(objetivo){
        let clase=objetivo.__proto__.constructor.name;
        let danio,esquiva,golpeCritico;

        esquiva=Personaje.pruebaAgilidad(objetivo.agilidad);

        if(esquiva){
            console.log("El "+clase+" ha esquivado el ataque.");
        }
        else{
            golpeCritico=Personaje.pruebaGolpeCritico(this.suerte);
            danio=this.ataque;
            if(golpeCritico){
                danio*=2;
                console.log("GOLPE CRÍTICO");
            }
            danio-=objetivo.defensa;
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