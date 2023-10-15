let targetOpen=0;
let targetOne = null;
let targetTwo = null;
let oneResult = null;
let secundResult = null;
let movimientos = 0;
let mostrarMovimientos = document.getElementById('movimientos');
let aciertos = 0;
let mostrarAcierto = document.getElementById('aciertos');
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let mostarTiempo = document.getElementById('t-restantes')
let tiempoRegresivo = null;


let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(()=>{return Math.random() - 0.5});

//funciones
function contarTiempo(){
   tiempoRegresivo = setInterval(() => {
        timer--;
        mostarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivo);
            bloquearTargetas();

        }
        
    }, 1000);
}

function bloquearTargetas(){
    for(let i=0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numbers[i];
        tarjetaBloqueada.disabled = true;
    }
}

function destapar(id){
    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }


    targetOpen++;

    if (targetOpen == 1){
        //muestra el primer nuemro
        targetOne = document.getElementById(id);
        oneResult = numbers[id];
        targetOne.innerHTML = oneResult;

        //si el valor aparece se desabilita la tarjeta
        targetOne.disabled = true;

    }else if(targetOpen == 2){//muestra el segundo numero
        targetTwo = document.getElementById(id);
        secundResult = numbers[id];
        targetTwo.innerHTML = secundResult;

        //se deshabilita la segunda tarjeta
        targetTwo.disabled= true;

        //se incrementa movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(oneResult == secundResult){
            //encerrar el valor de la tarjeta destapada
            targetOpen = 0;
            aciertos++;
            
            mostrarAcierto.innerHTML= `Aciertos: ${aciertos}`;

            if(aciertos == 8){
                clearInterval(tiempoRegresivo);
                mostrarAcierto.innerHTML = `Aciertos: ${aciertos}`;
                mostarTiempo.innerHTML = `Genial! solo Tardaste: ${timerInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
            }
        }else{
            //mostar los valores y taparlos
            setTimeout(()=>{
                targetOne.innerHTML = '';
                targetTwo.innerHTML = '';
                targetOne.disabled = false;
                targetTwo.disabled = false;
                targetOpen = 0;
            },800);
        }

        

    }


}
