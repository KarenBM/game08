 //selectores css
let btnRef = document.querySelectorAll(".board__cell");
let popupRef = document.querySelector(".popup"); 
let newgameBtn = document.querySelector(".popup__restart-btn");
let restartBtn = document.querySelector(".game-restart-btn");
let msgRef = document.getElementById("message");

let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];
//el jugador x debe iniciar primero
let xTurn = true;
let count = 0;

const desabilitarBotones = () => {
    btnRef.forEach((element) => (element.disabled = true));
    popupRef.classList.remove("hide");
};
//aqui se reinicia el juego
const abilitarbotones = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    //aqui se desabilita el pop up
    popupRef.classList.add("hide");
};
//funcion de ganar
const funcionGanar = (letter) => {
    desabilitarBotones();
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Ganó";
    } else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Ganó";
    }
};
//time over
const timeOverFunction = () => {
    desabilitarBotones();
    msgRef.innerHTML = "&#x1F60E; <br> Time over";
};
//comienza un nuevo juego
newgameBtn.addEventListener("click", () => {
    count = 0;
    abilitarbotones();
});
//se reinicia el juego
restartBtn.addEventListener("click", () => {  //listener para que ejecute abilitar boton
    count = 0;
    abilitarbotones();
});


const winChecker = () => {
    //opciones de gane
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        //verifica si los elementos fueron selecciones
        //valida si 3 elementos son los mismos y llama a la funcion ganar
        if (element1 != "" && (element2 != "") & (element3 != "")) {
            if (element1 == element2 && element2 == element3) {
                funcionGanar(element1);
            }
        }
    }
};
//Muestra X o O segun el click. Evento que responde al click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            //Display X
            element.innerText = "X";
            element.disabled = true;
        } else {
            xTurn = true;
            //Display Y
            element.innerText = "O";
            element.disabled = true;
        }
        //Incrementa el contador del click
        count += 1;
        if (count == 9) {
            timeOverFunction();
        }
        //revisa si gana en cada click
        winChecker();
    });
});
//abilita los botones y desabilita el pop up cuando carga la pagina
window.onload = abilitarbotones;