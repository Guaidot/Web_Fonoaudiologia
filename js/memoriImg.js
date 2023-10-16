


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
let timer = 60;
let timerInicial = 60;
let mostarTiempo = document.getElementById('t-restantes')
let tiempoRegresivo = null;
let btn_iniciar = document.querySelector('.btn_iniciar');

let winAudio = new Audio ('../sounds/coins.mp3');
let jump = new Audio ('../sounds/jump.mp3');
let interface = new Audio ('../sounds/interface.mp3');
let perder = new Audio ('../sounds/perder.mp3');
let success = new Audio ('../sounds/success.mp3');


src="https://cdn.jsdelivr.net/npm/sweetalert2@11";

let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(()=>{return Math.random() - 0.5});

//funciones

btn_iniciar.addEventListener('click',()=>{
   location.reload();
});



function contarTiempo(){
   tiempoRegresivo = setInterval(() => {
        timer--;
        mostarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivo);
            bloquearTargetas();
            perder.play();
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Has Perdido',
                showConfirmButtom : true,
            });
            
        }        
    }, 1000);
}

function bloquearTargetas(){
    for(let i=0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML =`<img src="../images/animalesMarinos/${numbers[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;        
    }
}

function destapar(id){
    if(temporizador == false){
        contarTiempo();
        temporizador = true;        
    }


    if (targetOpen == 0){
        //muestra el primer nuemro
        targetOne = document.getElementById(id);
        oneResult = numbers[id];
        targetOne.innerHTML = `<img src="../images/animalesMarinos/${oneResult}.png" alt="">`;
        success.play();

        //si el valor aparece se desabilita la tarjeta
        targetOne.disabled = true;
        targetOpen++;


    }else if(targetOpen == 1){//muestra el segundo numero
        targetTwo = document.getElementById(id);
        secundResult = numbers[id];
        targetTwo.innerHTML = `<img src="../images/animalesMarinos/${secundResult}.png" alt="">`;
        

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
            winAudio.play();

            if(aciertos == 8){
                interface.play();
                clearInterval(tiempoRegresivo);
                mostrarAcierto.innerHTML = `Aciertos: ${aciertos}`;
                mostarTiempo.innerHTML = `Genial! solo Tardaste: ${timerInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Has Ganado',
                    showConfirmButtom : true,
                });
            }
        }else{
            jump.play();
            //mostar los valores y taparlos
            setTimeout(()=>{
                targetOne.innerHTML = '';
                targetTwo.innerHTML = '';
                targetOne.disabled = false;
                targetTwo.disabled = false;
                targetOpen = 0;
            },600);
        }        

    }

}
