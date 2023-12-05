"use strict";

export class Celda{
     
    #evento;
    constructor(x,y){

        
        //paredes de cada celda
        this.walls =
        {
            "top":true,
            "left":true,
            "right":true,
            "bottom":true
        }
        //posición en el laberinto
        this.position =
        {
            "x":x,
            "y":y
        };
        //me interesa guardar si la celda ha sido visitada para algunas funciones
        this.visited=false;
        this.#evento=null;
    }
    visitar(){
        this.visited=true;
    }
    getEvento(){
        return this.#evento;
    }
    setEvento(evento){
        this.#evento=evento;
    }
    equals(celda){
        return this.position.x==celda.position.x&&this.position.y==celda.position.y;
    }
    static pintarPared(canvas,x1,y1,x2,y2){
        let ctx = canvas.getContext("2d");
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
    }
    pintarParedes(canvas,tam){
        let long_col = canvas.width/tam;
        let long_row = canvas.height/tam;
        let posX=this.position.x,posY=this.position.y;
        
        // celda[0][0] =>   pared arriba    0 0     -> 80 0
        //                  pared abajo     0 80    -> 80 80
        //                  pared izquierda 0 0     -> 0 80
        //                  pared derecha   80 0    -> 80 80 
        if(this.walls.top) {
            Celda.pintarPared(canvas, posX*long_col,posY*long_row,
                                (posX+1)*long_col,posY*long_row);
        }
        if(this.walls.bottom) {
            Celda.pintarPared(canvas, posX*long_col,(posY+1)*long_row,
                                (posX+1)*long_col,(posY+1)*long_row);
        }
        if(this.walls.right) {
            Celda.pintarPared(canvas, (posX+1)*long_col,posY*long_row,
                                (posX+1)*long_col,(posY+1)*long_row);
        }
        if(this.walls.left) {
            Celda.pintarPared(canvas,   posX*long_col,posY*long_row,
                                        posX*long_col,(posY+1)*long_row);
        }
        

    }
    
    

}