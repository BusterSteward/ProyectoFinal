﻿"use strict";

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
    resolver(jugador){
        if(this.resuelto){
            console.log("Sigue sin estar implementado el combate");
        }
        else{
            console.log("Has llegado al final de este piso, todavia no esta implementado el combate, lo sentimos");
            this.resuelto=true;
        }
    }
}
export class Evento_Enemigo extends Evento{
    constructor(nivel){
        super();
    }
    

    resolver(jugador){
        if(this.resuelto){

        }
        else{
            this.resuelto=true;
        }
    }
}
export class Evento_Agua extends Evento{
    constructor(nivel){
        super();
    }

    resolver(jugador){
        if(this.resuelto){

        }
        else{
            this.resuelto=true;
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
            this.resuelto=true;
        }
    }
}
export class Evento_Trampa extends Evento{
    constructor(nivel,tipo){
        super();
    }

    resolver(jugador){
        if(this.resuelto){

        }
        else{
            this.resuelto=true;
        }
    }
}
export class Evento_Pasillo extends Evento{
    constructor(longitud){
        super();
    }

    resolver(jugador){
        if(this.resuelto){
            console.log("Avanzas por un largo pasillo solo para encontrar una habitación vacía");
        }
        else{
            console.log("Avanzas por un largo pasillo solo para encontrar una habitación vacía");
            this.resuelto=true;
        }
    }
}
export class Evento_Portal extends Evento{
    constructor(nivel){
        super();
    }
    resolver(jugador){
        if(this.resuelto){

        }
        else{
            this.resuelto=true;
        }
    }
}
export class Evento_Altar extends Evento{
    constructor(coste){
        super();
    }
    resolver(jugador){
        if(this.resuelto){

        }
        else{
            this.resuelto=true;
        }
    }
    
}
export class Evento_NuevoPiso extends Evento{
    constructor(){
        super();
    }
    resolver(jugador){
        if(this.resuelto){
            console.log("No puedes regresar al piso anterior, la entrada desapareció mágicamente.");
        }
        else{
            console.log("Te has adentrado más en el laberinto, la entrada se cierra a tu paso. Solo puedes continuar.");
            this.resuelto=true;
        }
    }
    
} 
export class Evento_Entrada extends Evento{
    constructor(){
        super();
    }
    resolver(jugador){
        if(this.resuelto){
            console.log("La entrada al laberinto desapareció, ya no se puede salir.");
        }
        else{
            console.log("Te has adentrado en el laberinto infinito, ya no puedes volver atrás.");
            this.resuelto=true;
        }
    }
    
}