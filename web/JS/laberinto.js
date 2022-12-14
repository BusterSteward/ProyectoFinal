"use strict";
import { Celda } from "./celda.js";

export class Laberinto{

    constructor(tam){
        this.tamanyo=tam;
        this.cells=new Array(tam);
        for(let i=0;i<tam;i++){
            this.cells[i]=new Array(tam);
        }
        for(let i=0;i<tam;i++){
            for(let j=0;j<tam;j++){
                this.cells[i][j]=new Celda(i,j);
            }
        }
    }
    getCelda(x,y){
        return this.cells[x][y];
    }

    dameAdyacentesNoVisitados(celda){
        let noVisitados=new Array();
        let x=celda.position.x,y=celda.position.y;

        if(x>0){
            if(this.cells[x-1][y].visited==false){
                noVisitados.push(this.cells[x-1][y]);
            }
        }
        if(x<(this.tamanyo-1)){
            if(this.cells[x+1][y].visited==false){
                noVisitados.push(this.cells[x+1][y]);
            }
        }
        if(y>0){
            if(this.cells[x][y-1].visited==false){
                noVisitados.push(this.cells[x][y-1]);
            }
        }
        if(y<(this.tamanyo-1)){
            if(this.cells[x][y+1].visited==false){
                noVisitados.push(this.cells[x][y+1]);
            }
        }
        return noVisitados;
    }

    seleccionarPosicionInicial(){
        let posX,posY;
        posX = Math.trunc(Math.random()*this.tamanyo);
        posY = Math.trunc(Math.random()*this.tamanyo);
        let posiciones={
            "x":posX,
            "y":posY
        }
        return posiciones;
    }

    borrarMuro(actual,siguiente){
        let pos_Actual_X,pos_Actual_Y,pos_Siguiente_X,pos_Siguiente_Y;
        pos_Actual_X=actual.position.x;
        pos_Actual_Y=actual.position.y;
        pos_Siguiente_X=siguiente.position.x;
        pos_Siguiente_Y=siguiente.position.y;

        let diff_X,diff_Y;

        diff_X=pos_Actual_X-pos_Siguiente_X;
        diff_Y=pos_Actual_Y-pos_Siguiente_Y;

       
       if(diff_X==1){// diff_X = 1 => nos hemos ido a la izquierda
            actual.walls.left=false;
            siguiente.walls.right=false;
       }
       else if(diff_X==-1){//diff_X = -1 => nos hemos ido a la derecha
            actual.walls.right=false;
            siguiente.walls.left=false;
       }
       else if(diff_Y==1){//diff_Y = 1 => nos hemos ido arriba
            actual.walls.top=false;
            siguiente.walls.bottom=false;
       }
       else if(diff_Y==-1){//diff_Y = -1 => nos hemos ido abajo
            
            actual.walls.bottom=false;
            siguiente.walls.top=false;
       }

    }
    elegirCamino(caminos){
        let indice = Math.trunc(Math.random()*caminos.length);
        return caminos[indice];
    }
    generarLaberinto(){
        
        let stack=new Array();


        let posiciones = this.seleccionarPosicionInicial();

        let actual = this.cells[posiciones.x][posiciones.y];
        actual.visitar();
        stack.push(actual);
        while(stack.length>0){
            actual=stack.pop();
            let noVisitados = this.dameAdyacentesNoVisitados(actual);
            if(noVisitados.length>0){
                stack.push(actual);
                let siguiente = this.elegirCamino(noVisitados);
                this.borrarMuro(actual,siguiente);
                actual=siguiente;
                actual.visitar();
                stack.push(actual);
            }    
        }
    }
    pintarLaberinto(canvas){
        for(let i=0;i<this.cells.length;i++){
            for(let j=0;j<this.cells.length;j++){
                this.cells[i][j].pintarParedes(canvas,this.cells.length);
            }
        }
    }
}