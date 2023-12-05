"use strict";

const COLORES=[
    "black",
    "blue",
    "red",
    "green"
]
let mapas=[];
let mapaSeleccionado=0;
let xAnterior, yAnterior;
let cv=document.querySelector("canvas");
let herramienta="lapiz", color=0;

document.getElementById("limpiar").addEventListener("click",limpiar)
document.getElementById("goma").addEventListener("click",()=>{ seleccionarHerramienta("goma") });
document.getElementById("lapiz").addEventListener("click",()=>{ seleccionarHerramienta("lapiz") });
document.getElementById("prev").addEventListener("click",()=>{ cambiarPagina(mapaSeleccionado-1) });
document.getElementById("next").addEventListener("click",()=>{ cambiarPagina(mapaSeleccionado+1) });

cv.addEventListener("mouseup",guardarContexto);
cv.addEventListener("mouseleave",guardarContexto);
cv.addEventListener("mousemove", function(e){

    if(e.buttons === 1){
        let ctx = cv.getContext("2d");
        let rect = cv.getBoundingClientRect();
        let scaleX = cv.width / rect.width;
        let scaleY = cv.height / rect.height;
        let x = (e.clientX - rect.left) * scaleX;
        let y = (e.clientY - rect.top) * scaleY;
        switch(herramienta){
            case "lapiz":
                if(xAnterior!=undefined &&yAnterior!=undefined){
                    ctx.globalCompositeOperation="source-over";
                    ctx.strokeStyle=COLORES[color];
                    ctx.beginPath();
                    ctx.moveTo(xAnterior, yAnterior);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                    console.log("hola")
                }
                xAnterior=x;
                yAnterior=y;
                break;
            case "goma":
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, Math.PI * 2);
                ctx.globalCompositeOperation = "destination-out";
                ctx.fill();
                break;
        }
    }
    else{
        xAnterior=undefined;
        yAnterior=undefined;
    } 
});
function limpiar(){
    cv.width=cv.width;
    guardarContexto();
}
function cambiarPagina(pagina){
    if(pagina >= 0 && pagina < 9){
        mapaSeleccionado = pagina;
        let nPagina = document.getElementById("npagina");
        nPagina.innerHTML=""+(pagina+1)
        let ctx = cv.getContext("2d");
        let data=mapas[mapaSeleccionado];
        cv.width=cv.width;
        if(data !== undefined){
            ctx.putImageData(data,0,0);
        }
    }
}
function guardarContexto(){
    let ctx = cv.getContext("2d");
    mapas[mapaSeleccionado] = ctx.getImageData(0,0,cv.width,cv.height);
}
function cambiarColor(){
    let lapiz = document.getElementById("imgLapiz")
  if(color==3){
    color=0;
  }
  else
    color++;

    lapiz.src = "./IMAGENES/"+COLORES[color]+"_lapiz.png"
  console.log(color)
}
function seleccionarHerramienta(herramientaP){
    let botones = document.querySelectorAll(".boton-diario")
    botones.forEach(boton => {
        boton.classList.remove("selected")
        if(boton.id==herramientaP){
            boton.classList.add("selected");
        }
    });
    
    if(herramienta==herramientaP && herramienta=="lapiz"){
        console.log("hola")
        cambiarColor();
    }
    else
        herramienta=herramientaP;
    
    
        
};