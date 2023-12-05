"use strict";

export class Camino{

    
    constructor(celda,lab,padre){
        this.padre=padre;
        this.nodo=celda;
        this.hijos=[];
        let adyacentes=[];
        if(padre!=null){
            let adyacentesAux=lab.dameAdyacentesConMuros(celda);
            adyacentesAux.forEach(element =>{
                if(!element.equals(padre.nodo))
                    adyacentes.push(element);
            });
        }
        else{
            adyacentes=lab.dameAdyacentesConMuros(celda);  
        }
        adyacentes.forEach(element => {
            this.hijos.push(new Camino(element,lab,this));
        });
        
    }
    calcularDistancia(){
        let aux=this;
        let distancia=0;
        while(aux.padre!=null){
            aux=aux.padre;
            distancia++;
        }
        return distancia;
    }
    seleccionarCamino(celda){
        let camino;
        if(this.nodo.equals(celda))
            camino = this;
        else{
            let contador=0;
            while(this.hijos[contador]!=undefined&&camino===undefined){
                camino = this.hijos[contador].seleccionarCamino(celda);
                contador++;
            }
        }
        return camino;
    }
    equals(otro){
        return this.nodo.position.x==otro.nodo.position.x&&this.nodo.position.y==otro.nodo.position.y;
    }
}