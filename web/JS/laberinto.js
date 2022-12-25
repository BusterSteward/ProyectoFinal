"use strict";
import { Celda } from "./celda.js";
import { Camino } from "./camino.js";
import{Evento_Boss,Evento_Pasillo,Evento_Agua,Evento_Cofre,Evento_Trampa,Evento_Altar,Evento_Enemigo,Evento_Entrada,Evento_NuevoPiso,Evento_Portal} from "./evento.js";

const min=3;
export class Laberinto{
    
    constructor(tam){
        this.piso=tam;
        tam=min+tam;
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
    //devuelve una celda del laberinto situada en x e y
    getCelda(x,y){
        return this.cells[x][y];
    }

    //devuelve un array de celdas adyacentes a la celda pasada por parametro que no 
    //hayan sido visitadas por el algoritmo de generación de laberintos
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

    dameAdyacentesConMuros(celda){
        let adyacentes=[];
        if(!celda.walls.top){
            adyacentes.push(this.cells[celda.position.x][celda.position.y-1]);
        }
        if(!celda.walls.right){
            adyacentes.push(this.cells[celda.position.x+1][celda.position.y]);

        }
        if(!celda.walls.bottom){
            adyacentes.push(this.cells[celda.position.x][celda.position.y+1]);

        }
        if(!celda.walls.left){
            adyacentes.push(this.cells[celda.position.x-1][celda.position.y]);

        }
        return adyacentes;
    }
    //selecciona una posicion aleatoria dentro del laberinto
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

    //borra las paredes que conectan las 2 celdas pasadas por parametro
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
    //selecciona una celda aleatoria dentro del array pasado por parametro
    elegirCamino(caminos){
        let indice = Math.trunc(Math.random()*caminos.length);
        return caminos[indice];
    }
    //genera un laberinto aleatorio de forma procedural
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
    //devuelve un array con las celdas en las que puedo meter la salida del laberinto
    dameSalidasPosibles(){
        let salidas=[];
        for(let i=0;i<this.tamanyo;i++){
            for(let j=0;j<this.tamanyo;j++){
                if(this.dameAdyacentesConMuros(this.cells[i][j]).length==1){
                    salidas.push(this.cells[i][j]);
                }
            }
        }
        return salidas;
    }
    //coloca el final del laberinto a una distancia mínima de la posicion inicial, pasada por parámetro
    introducirFinal(entrada,distancia){
        let salidasPosibles=this.dameSalidasPosibles();
        let caminos=new Camino(entrada,this,null);
        salidasPosibles = Laberinto.filtrarPorDistancia(salidasPosibles,distancia,caminos);
        let salida = salidasPosibles[Math.trunc(Math.random()*salidasPosibles.length)];
        salida.setEvento(new Evento_Boss(this.piso));
        console.log("Salida del laberinto: x: "+salida.position.x+" y: "+salida.position.y);

    }
    //elimina del array de posiciones posibles para la salida las posiciones que estén demasiado cerca de la posicion 
    //del jugador
    static filtrarPorDistancia(salidasPosibles,distancia,caminos){
        let nuevasSalidas=[];
        let camino;
        for(let i=0;i<salidasPosibles.length;i++){
            camino=caminos.seleccionarCamino(salidasPosibles[i]);
            if(camino.calcularDistancia()>=distancia)
                nuevasSalidas.push(salidasPosibles[i]);
        }
        return nuevasSalidas;
    }
    introducirEventos(){
        let numEventos=(this.tamanyo*this.tamanyo)-2;
        
        for(let i=0;i<this.tamanyo;i++){
            for(let j=0;j<this.tamanyo;j++){
                if(this.getCelda(i,j).getEvento()==null){
                    this.getCelda(i,j).setEvento(new Evento_Enemigo(1));
                }
            }
        }
    }
    //pinta el laberinto en un canvas
    pintarLaberinto(){
        let canvas = document.querySelector("canvas");
        for(let i=0;i<this.cells.length;i++){
            for(let j=0;j<this.cells.length;j++){
                this.cells[i][j].pintarParedes(canvas,this.cells.length);
            }
        }
    }
}