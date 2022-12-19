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
    setLab(lab){
        this.laberinto=lab;
    }
    getMiCelda(){
        return this.laberinto.getCelda(this.position.x,this.position.y);
    }
    mover(dir){
        switch(dir){
            case 1://UP
                if(this.getMiCelda().walls.top){
                    console.log("te he pillao con el carrito del helao, tramposillo");
                }
                else{
                    this.position.y--;
                    this.direction=1;
                }
                
                break;
            case 2://RIGHT
                if(this.getMiCelda().walls.right){
                    console.log("te he pillao con el carrito del helao, tramposillo");
                }
                else{
                    this.position.x++;
                    this.direction=2;

                }
                break;
            case 3://DOWN
                if(this.getMiCelda().walls.bottom){
                    console.log("te he pillao con el carrito del helao, tramposillo");
                }
                else{
                    this.position.y++;
                    this.direction=3;

                }
                break;
            case 4://LEFT
                if(this.getMiCelda().walls.left){
                    console.log("te he pillao con el carrito del helao, tramposillo");
                }
                else{
                    this.position.x--;
                    this.direction=4;

                }
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