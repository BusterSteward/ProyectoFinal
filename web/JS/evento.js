"use strict";

class Evento{
    resuelto;
    constructor(){
        this.resuelto=false;
    }
    
}

export class Evento_Boss extends Evento{

    constructor(nivel){
        super();
    }
    resolver(){
        if(this.resuelto){

        }
        else{

        }
    }
}
export class Evento_Enemigo extends Evento{
    constructor(nivel){
        super();
    }
    

    resolver(){
        if(this.resuelto){

        }
        else{

        }
    }
}
export class Evento_Agua extends Evento{
    constructor(nivel){
        super();
    }

    resolver(){
        if(this.resuelto){

        }
        else{

        }
    }
}
export class Evento_Cofre extends Evento{
    constructor(nivel){
        super();
    }

    resolver(){
        if(this.resuelto){

        }
        else{

        }
    }
}
export class Evento_Trampa extends Evento{
    constructor(nivel,tipo){
        super();
    }

    resolver(){
        if(this.resuelto){

        }
        else{

        }
    }
}
export class Evento_Pasillo extends Evento{
    constructor(longitud){
        super();
    }

    resolver(){
        if(this.resuelto){

        }
        else{

        }
    }
}
export class Evento_Portal extends Evento{
    constructor(nivel){
        super();
    }
    resolver(){
        if(this.resuelto){

        }
        else{

        }
    }
}
export class Evento_Altar extends Evento{
    constructor(coste){
        super();
    }
    resolver(){
        if(this.resuelto){

        }
        else{

        }
    }
    
}