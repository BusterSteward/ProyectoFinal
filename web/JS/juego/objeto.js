"use strict";

export class Objeto{
    constructor(user,nombre,level,tipo,precio){
        this.nombre=nombre;
        this.usuario=user;
        this.level=level;
        this.tipo=tipo;
        this.precio=precio;
        this.sprite="../IMAGENES/Objetos/"+nombre+".png";
    }

}
export class Objeto_Arma extends Objeto{
    constructor(user,nombre,level,tipo,precio,ataque,peso){
        super(user,nombre,level,tipo,precio);
        this.ataque=ataque;
        this.peso=peso;
    }
    
}
export class Objeto_Armadura extends Objeto{
    constructor(user,nombre,level,tipo,precio,defensa,peso){
        super(user,nombre,level,tipo,precio);
        this.defensa=defensa;
        this.peso=peso;
       
    }
}