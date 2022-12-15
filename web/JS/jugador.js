"use strict";

export class Jugador{
    constructor(){
        this.vida=100;
        this.danio=1;
        this.position={
            "x":-1,
            "y":-1
        }
        this.direction=1;
    }
    mover(dir){
        switch(dir){
            case 1://UP
                this.position.y++;
                break;
            case 2://RIGHT
                this.position.x++;
                break;
            case 3://DOWN
                this.position.y--;
                break;
            case 4://LEFT
                this.position.x--;
                break;
        }
        
        
    }
    seleccionarSalida(laberinto){
        let tam=laberinto.tamanyo;
        this.position.x=Math.trunc(Math.random()*tam);
        this.position.y=Math.trunc(Math.random()*tam);
        
    }
}