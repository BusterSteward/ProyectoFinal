"use strict";

export class Jugador{
    constructor(lab){
        this.laberinto=lab;
        this.vida=100;
        
        this.aguante=1;
        this.estamina=100+(10*this.aguante);
        this.danio=1;
        this.ataque=1;
        this.defensa=1;
        this.agilidad=1;
        this.suerte=1;
        this.nivel=1;
        this.exp=0;
        this.position={
            "x":-1,
            "y":-1
        }
        this.direction=null;
    }
    setLab(lab){
        this.laberinto=lab;
    }
    //devuelve la celda actual en la que se encuentra el jugador
    getMiCelda(){
        return this.laberinto.getCelda(this.position.x,this.position.y);
    }
    //mueve al jugador en de una celda a otra
    mover(dir){
        let celda=this.getMiCelda();
        switch(dir){
            case 1://UP
                if(celda.walls.top){
                    console.log("te he pillao con el carrito del helao, tramposillo");
                }
                else{
                    this.position.y--;
                    this.direction=1;
                    let nuevaCelda=this.getMiCelda();
                    nuevaCelda.resolver();
                }
                
                break;
            case 2://RIGHT
                if(celda.walls.right){
                    console.log("te he pillao con el carrito del helao, tramposillo");
                }
                else{
                    this.position.x++;
                    this.direction=2;
                    let nuevaCelda=this.getMiCelda();
                    nuevaCelda.resolver();

                }
                break;
            case 3://DOWN
                if(celda.walls.bottom){
                    console.log("te he pillao con el carrito del helao, tramposillo");
                }
                else{
                    this.position.y++;
                    this.direction=3;
                    let nuevaCelda=this.getMiCelda();
                    nuevaCelda.resolver();

                }
                break;
            case 4://LEFT
                if(celda.walls.left){
                    console.log("te he pillao con el carrito del helao, tramposillo");
                }
                else{
                    this.position.x--;
                    this.direction=4;
                    let nuevaCelda=this.getMiCelda();
                    nuevaCelda.resolver();
                }
                break;
        }
        console.log("x: "+this.position.x+" y: "+this.position.y);
        
    }
    //invierte la dirección en la que está mirando el jugador
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
    //incrementa las variables de estadisticas del personaje al subir de nivel
    levelUp(){
        this.nivel++;

    }
    //incrementa la experiencia que gana el personaje
    ganarExp(xp){
        let nextLv=nivel*5;
        this.exp+=xp;
        if(this.exp>=nextLv){
            this.levelUp();
        }
        
    }
    //selecciona la casilla inicial del jugador
    seleccionarSalida(){
        let tam=this.laberinto.tamanyo;
        this.position.x=Math.trunc(Math.random()*tam);
        this.position.y=Math.trunc(Math.random()*tam);
        this.direction = Math.trunc(Math.random()*4)+1;
        console.log(this.position);
        console.log(this.direction);
    }
}