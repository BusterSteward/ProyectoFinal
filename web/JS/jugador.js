"use strict";

import { Personaje } from "./personaje.js";
import { Inventario } from "./inventario.js";
import { partida } from "./main.js";

export class Jugador extends Personaje{
    constructor(lab){
        super();
        this.laberinto=lab;
        this.vida=100;
        this.vidaMax=100;
        
        this.aguante=0;
        this.estamina=100+(10*this.aguante);
        
        this.nivel=1;
        this.exp=0;
        this.oro=0;

        this.position={
            "x":-1,
            "y":-1
        }
        this.direction=null;
        this.inventario=new Inventario(this);
        
    }
    penalizacionPeso(){
        return this.inventario.calcularMultiplicadorDePeso();
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
        this.estamina-=1;
        if(this.estamina<=0){
            partida.gameOver();
        }
        else{
            let celda=this.getMiCelda();
            switch(dir){
                case 1://UP
                    if(celda.walls.top){
                        console.log("te he pillao con el carrito del helao, tramposillo");
                    }
                    else{
                        this.position.y--;
                        this.direction=1;
                    }
                    
                    break;
                case 2://RIGHT
                    if(celda.walls.right){
                        console.log("te he pillao con el carrito del helao, tramposillo");
                    }
                    else{
                        this.position.x++;
                        this.direction=2;
                    }
                    break;
                case 3://DOWN
                    if(celda.walls.bottom){
                        console.log("te he pillao con el carrito del helao, tramposillo");
                    }
                    else{
                        this.position.y++;
                        this.direction=3;
                    }
                    break;
                case 4://LEFT
                    if(celda.walls.left){
                        console.log("te he pillao con el carrito del helao, tramposillo");
                    }
                    else{
                        this.position.x--;
                        this.direction=4; 
                    }
                    break;
            }
            let nuevaCelda=this.getMiCelda();
            nuevaCelda.getEvento().resolver(this);
            console.log("x: "+this.position.x+" y: "+this.position.y);
        }
        
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
    atacar(objetivo){
        super.atacar(objetivo);
        let multPeso=this.inventario.calcularMultiplicadorDePeso();
        this.estamina-=2*multPeso;
    }
    //incrementa las variables de estadisticas del personaje al subir de nivel y restablece la estamina y salud
    levelUp(){
        this.nivel++;
        this.exp=0;
        let estadistica = prompt("Introduce la estadistica que quieras subir");
        this.subirEstadistica(estadistica);
        this.vida=this.vidaMax;
        this.estamina=100+(10*this.aguante);
    }
    subirEstadistica(estadistica){
        switch(estadistica){
            
            case 1:
                //vida
                this.vidaMax+=10;
                
                break;
            case 2:
                //aguante
                this.aguante++;
                break;
            case 3:
                //ataque
                this.ataque++;
                break;
            case 4:
                //defensa
                this.defensa++;
                break;
            case 5:
                //agilidad
                this.agilidad++;
                break;
            case 6:
                //velocidad
                this.velocidad++;
                break;
            case 7:
                //suerte
                this.suerte++;
                break;
            
        }
    }
    //incrementa la experiencia que gana el personaje
    ganarExp(xp){
        let nextLv=this.nivel*5;
        this.exp+=xp;
        if(this.exp>=nextLv){
            this.levelUp();
        }
        
    }
    ganarOro(oro){
        this.oro+=oro;
    }
    getDireccionContraria(){
        let direccion;
        switch(this.direction){
            case 1:
                direccion=3;
                break;
            case 2:
                direccion=4;
                break;
            case 3:
                direccion=1;
                break;
            case 4:
                direccion=2;
                break;
        }
        return direccion;
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