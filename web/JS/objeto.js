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
    constructor(user,nombre,level,tipo,precio,max,min,peso,durabilidad){
        super(user,nombre,level,tipo,precio);
        this.maxAttack=max;
        this.minAttack=min;
        this.peso=peso;
        this.durabilidad=durabilidad;
    }
    
}
export class Objeto_Armadura extends Objeto{
    constructor(user,nombre,level,tipo,precio,defensa,peso,durabilidad){
        super(user,nombre,level,tipo,precio);
        this.defensa=defensa;
        this.peso=peso;
        this.durabilidad=durabilidad;
    }
}
export class Objeto_Usable extends Objeto{
    constructor(user,nombre,level,tipo,precio,usos){
        super(user,nombre,level,tipo,precio);
        this.usos=usos;
    }
}