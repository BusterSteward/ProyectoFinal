"use strict";

import{Objeto} from "./objeto.js";

export class Inventario{
    #bolsa;
    #equipo;
    constructor(user){
        this.usuario=user;
        
        this.#equipo=
        {
            "cuerpo":null,
            "manoIz":null,
            "manoDe":null,
        }
    }
    calcularMultiplicadorDePeso(){
        let pesoTotal=0,multiplicador=0;
       
        if(this.#equipo.cuerpo!=null){
            pesoTotal+=this.#equipo.cuerpo.peso;
        }
        if(this.#equipo.manoIz!=null){
            pesoTotal+=this.#equipo.manoIz.peso;
        }
        if(this.#equipo.manoDe!=null){
            pesoTotal+=this.#equipo.manoDe.peso;
        }
        if(pesoTotal>=10){
            multiplicador++;
            pesoTotal-=10;
        }
        
        return multiplicador + (pesoTotal%5);
    }
    guardarObjeto(objeto){
        if(objeto instanceof Objeto){
            let tipo = objeto.tipo;
            this.#bolsa[tipo] ??= [];
            this.#bolsa[tipo].push(objeto);
        }
            
    }
    equiparObjeto(lugar,objeto){
        switch(lugar){
            
            case "cuerpo":
                this.#equiparCuerpo(objeto);
                break;
            case "manoIz":
                this.#equiparManoIz(objeto);
                break;
            case "manoDe":
                this.#equiparManoDe(objeto);
                break;
        }
    }
    #equiparCuerpo(objeto){
        if(objeto.tipo=="cuerpo"){
            if(this.#equipo.cuerpo!=null){
                guardarObjeto(this.#equipo.cuerpo);
            }
            this.#equipo.cuerpo=objeto;
        }
    }
    #equiparManoIz(objeto){
        if(objeto.tipo=="mano"){
            if(this.#equipo.manoIz!=null){
                guardarObjeto(this.#equipo.manoIz);
            }
            this.#equipo.ManoIz=objeto;
        }
        if(objeto.tipo=="2manos"){
            if(this.#equipo.manoIz!=null){
                guardarObjeto(this.#equipo.manoIz);
            }
            if(this.#equipo.manoDe!=null){
                guardarObjeto(this.#equipo.manoDe);
            }
            this.#equipo.ManoIz=objeto;
            this.#equipo.ManoDe=objeto;
        }
    }
    #equiparManoDe(objeto){
        if(objeto.tipo=="mano"){
            if(this.#equipo.manoDe!=null){
                guardarObjeto(this.#equipo.manoDe);
            }
            this.#equipo.manoDe=objeto;
        }
        if(objeto.tipo=="2manos"){
            if(this.#equipo.manoIz!=null){
                guardarObjeto(this.#equipo.manoIz);
            }
            if(this.#equipo.manoDe!=null){
                guardarObjeto(this.#equipo.manoDe);
            }
            this.#equipo.ManoIz=objeto;
            this.#equipo.ManoDe=objeto;
        }
    }
}