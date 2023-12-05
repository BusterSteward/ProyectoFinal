"use strict";

import{Objeto} from "./objeto.js";

export class Inventario{
    #bolsa;
    #equipo;
    constructor(user){
        this.usuario=user;
        this.#bolsa=[];
        this.#equipo=
        {
            "cabeza":null,
            "cuerpo":null,
            "piernas":null,
            "manoIz":null,
            "manoDe":null,
            "amuleto":null,
            "consumibles":[null,null,null]
        }
    }
    calcularMultiplicadorDePeso(){
        let pesoTotal=0,multiplicador=0;
        if(this.#equipo.cabeza!=null){
            pesoTotal+=this.#equipo.cabeza.peso;
        }
        if(this.#equipo.cuerpo!=null){
            pesoTotal+=this.#equipo.cuerpo.peso;
        }
        if(this.#equipo.piernas!=null){
            pesoTotal+=this.#equipo.piernas.peso;
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
            this.#bolsa[tipo] ??=[];
            this.#bolsa[tipo].push(objeto);
        }
            
    }
    equiparObjeto(lugar,objeto){
        switch(lugar){
            case "cabeza":
                this.#equiparCabeza(objeto);
                break;
            case "cuerpo":
                this.#equiparCuerpo(objeto);
                break;
            case "manoIz":
                this.#equiparManoIz(objeto);
                break;
            case "manoDe":
                this.#equiparManoDe(objeto);
                break;
            case "piernas":
                this.#equiparPiernas(objeto);
                break;
            case "amuleto":
                this.#equiparAmuleto(objeto);
                break;
            case "consumibles0":
                this.#equiparConsumible(objeto,0);
                break;
            case "consumibles1":
                this.#equiparConsumible(objeto,1);
                break;
            case "consumibles2":
                this.#equiparConsumible(objeto,2);
                break;
        }
    }
    
    #equiparCabeza(objeto){
        if(objeto.tipo=="cabeza"){
            if(this.#equipo.cabeza!=null){
                guardarObjeto(this.#equipo.cabeza);
            }
            this.#equipo.cabeza=objeto;
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
    #equiparPiernas(objeto){
        if(objeto.tipo=="piernas"){
            if(this.#equipo.piernas!=null){
                this.guardarObjeto(this.#equipo.piernas);
            }
            this.#equipo.piernas=objeto;
        }
    }
    #equiparAmuleto(objeto){
        if(objeto.tipo=="amuleto"){
            if(this.#equipo.amuleto!=null){
                this.guardarObjeto(this.#equipo.amuleto);
            }
            this.#equipo.amuleto=objeto;
        }
    }
    #equiparConsumible(objeto,pos){
        if(objeto.tipo=="consumible"){
            if(this.#equipo.consumibles[pos]!=null){
                this.guardarObjeto(this.#equipo.consumibles[pos]);
            }
            this.#equipo.consumibles[pos]=objeto;
        }
    }
    
}