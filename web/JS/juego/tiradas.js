"use strict";

export default{
    pruebaGolpeCritico(suerte){
        let tirada=Math.trunc(Math.random()*100)+1;
        return tirada<=suerte;
    },
    pruebaAgilidad(agilidad){
        let tirada = Math.trunc(Math.random()*100)+1;
        return tirada<=agilidad;
    },
    pruebaVelocidad(velocidad, dificultad){
        let tirada = Math.trunc(Math.random()*20)+1;
        tirada+=velocidad;
        return tirada>=dificultad;
    },
    pruebaVelocidadEnfrentada(jugador,enemigo){
        let tiradaJugador=Math.trunc(Math.random()*20)+1;
        let tiradaEnemigo=Math.trunc(Math.random()*20)+1;

        return (tiradaJugador+jugador.velocidad+jugador.velodidadT)>(tiradaEnemigo+enemigo.velocidad+enemigo.velodidadT);
    }
}