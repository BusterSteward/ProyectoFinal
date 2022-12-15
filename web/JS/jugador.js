"use strict";

export class Jugador{
    constructor(lab){
        this.laberinto=lab;
        this.vida=100;
        this.danio=1;
        this.position={
            "x":-1,
            "y":-1
        }
        this.direction=null;
    }
    mover(dir){
        switch(dir){
            case 1://UP
                this.position.y--;
                this.direction=1;
                break;
            case 2://RIGHT
                this.position.x++;
                this.direction=2;
                break;
            case 3://DOWN
                this.position.y++;
                this.direction=3;
                break;
            case 4://LEFT
                this.position.x--;
                this.direction=4;
                break;
        }
        console.log("x: "+this.position.x+" y: "+this.position.y);
        
    }
    girarse(){
        switch(this.direction){
            case 1:
                this.direction=3;
                break;
            case 2:
                this.direction=4;
                break;
            case 3:
                this.direction=1;
                break;
            case 4:
                this.direction=2;
                break;
        }
        console.log("direccion: "+this.direction);
    }
    seleccionarSalida(){
        let tam=this.laberinto.tamanyo;
        this.position.x=Math.trunc(Math.random()*tam);
        this.position.y=Math.trunc(Math.random()*tam);
        this.direction = Math.trunc(Math.random()*4)+1;
        console.log(this.position);
        console.log(this.direction);
    }
}