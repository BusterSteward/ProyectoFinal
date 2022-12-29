"use strict";

export class Inventario{
    constructor(user){
        this.usuario=user;
        this.bolsa=[];
        this.equipo=
        {
            "cabeza":null,
            "cuerpo":null,
            "piernas":null,
            "manoIz":null,
            "manoDe":null,
            "amuleto":null,
            "anillos":[],
            "consumibles":[]
        }
    }
}