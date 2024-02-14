let guess = 0;
let attempts = 0;
let selectedColor = '';
document.querySelector('.game__check__btn').disabled = true;
document.querySelector('.game__check__btn').style.cursor = 'not-allowed';
let clickCount = 0;
let isSelected = false;
let answerArray = makeAnswer()
let tempRay = Array.from(document.querySelectorAll('.color-choices'));
let guessBoxArray = [];
let nextResult = document.querySelectorAll('.first-results')[0].parentNode;

for(let i = 9; i >= 0; i--) {
    guessBoxArray.push(tempRay[i]);    
}

// Añadimos un id a cada casilla
for (let i = 0; i < 10; i++) {
    let guessArray = guessBoxArray[i].getElementsByClassName("color-choice");
    for (let j = 0; j < 5; j++) {
        guessArray[j].setAttribute('id', `g-${i}-${j}`);
    }
}
//Se dividen las casillas en bloques de 5 X 10
let masterGuessArray = [[-1, -1, -1, -1, -1],
                        [-1, -1, -1, -1, -1],
                        [-1, -1, -1, -1, -1],
                        [-1, -1, -1, -1, -1],
                        [-1, -1, -1, -1, -1],
                        [-1, -1, -1, -1, -1],
                        [-1, -1, -1, -1, -1],
                        [-1, -1, -1, -1, -1],
                        [-1, -1, -1, -1, -1],
                        [-1, -1, -1, -1, -1]];

//Función para que el botón check sube de línea
document.querySelector('.game__check__btn').addEventListener('click', function() {
    document.querySelector('.active').classList.remove('active');

    // console.log(masterGuessArray[guess]);     // Displays the user selected color result
    // console.log(answerArray);                 // Displays the random answer array

    let resultArray = getResult();
    checkWin(resultArray);
    let resultBox = getResultBox();
    placePegs(resultArray, resultBox);
    guess++;
    for (let i = 0; i < 5; i++) {
        document.getElementById(`g-${guess}-${i}`).classList.add('active');
    }

    document.querySelector('.game__check__btn').disabled = true;
    document.querySelector('.game__check__btn').style.cursor = 'not-allowed';
});

// Selección de color
document.querySelectorAll('.color').forEach(function(element) {
    element.addEventListener('click', function() {
        isSelected = true;
        document.querySelectorAll('.color').forEach(function(colorElem) {
            colorElem.style.width = '35px';
            colorElem.style.height = '35px';
        });
        let peg = this;
        selectedColor = window.getComputedStyle(this).getPropertyValue('background-color');

        // Changing the size of color boxes using CSS
        peg.style.width = '40px';
        peg.style.height = '40px';
    });
});

// Pasamos color seleccionado a color-choice
document.querySelectorAll('.color-choice').forEach(function(element) {
    element.addEventListener('click', function() {
        if (isSelected) {
            if (this.classList.contains('active')) {
                this.style.backgroundColor = selectedColor;
                let coord = this.getAttribute('id');
                updateMasterArray(selectedColor, coord);

                // The button starts working when all boxes have a color assigned
                clickCount++;
                if (clickCount === 5) {
                    document.querySelector('.game__check__btn').disabled = false;
                    document.querySelector('.game__check__btn').style.cursor = 'pointer';
                    clickCount = 0;
                }
            }
        }
    });
});

// Selección de colores de forma aleatoria
function makeAnswer() {
    let array = [];
    for(let i = 0; i < 5; i++) {
        array.push(Math.floor(Math.random() * 6)); 
    }
    return array; 
}

function updateMasterArray(col, xy) {
    let array = xy.split('-');
    let x = array[1];
    let y = array[2];
    
    // console.log(array);
    // Refleja el código de color la posición
    masterGuessArray[x][y]= makeColorANumber(col);
    // console.log(masterGuessArray[0]);
}

function makeColorANumber(col) {
    if(col === 'rgb(164, 91, 220)') return 0;
    if(col === 'rgb(227, 82, 237)') return 1;
    if(col === 'rgb(223, 77, 77)') return 2;
    if(col === 'rgb(229, 136, 60)') return 3;
    if(col === 'rgb(240, 240, 80)') return 4;
    if(col === 'rgb(172, 234, 118)') return 5;
}

function getResult() {
    let resulArray = [];
    let aArray = [];
    for(let i = 0; i < 5; i++) {
        aArray.push(answerArray[i]);
    }
    
    //black confirmación
    for(let i = 0; i < 5; i++) {
        if(masterGuessArray[guess][i] === aArray[i]){
            resulArray.push('black-confirm');
            aArray[i] = -1;
            masterGuessArray[guess][i] = -2;
        }
    } 

    //white confirmación/ compara si los colores de random coinciden con los colores seleccionados
    
    for(let i = 0; i < 5; i++) {
        for(let j = 0; j < 5; j++) {
            if(masterGuessArray[guess][i]=== aArray[j]) {
                resulArray.push('white-confirm');
                aArray[j] = -1;
                masterGuessArray[guess][i] = -2;
            }
        }
    }

    // console.log(aArray);
    // console.log(masterGuessArray[guess]);
    // console.log(resultArray);

    return resulArray
}

//pasar al segiente linia de resultados
function getResultBox() {
    let activeResult = nextResult.getElementsByClassName("results")[0];
    nextResult = nextResult.previousElementSibling;
    return activeResult;
}

function placePegs(array, box) {
    let pegArray = box.getElementsByClassName("result");

    for (let i = 0; i < array.length; i++) {
        pegArray[i].classList.add(array[i]);
    }

    let whiteConfirmEls = box.getElementsByClassName('white-confirm');
    Array.from(whiteConfirmEls).forEach(function(el) {
        el.style.background = 'none';
        el.style.backgroundColor = 'white';
    });

    let blackConfirmEls = box.getElementsByClassName('black-confirm');
    Array.from(blackConfirmEls).forEach(function(el) {
        el.style.background = 'none';
        el.style.backgroundColor = 'black';
    });
}

function checkWin(array) {       
    let arrayStr = array.join();
    if(arrayStr === 'black-confirm,black-confirm,black-confirm,black-confirm,black-confirm'){
        window.location.href = './win.html'
    } else {
        attempts++;
        if (attempts >= 10) {
            alert('UPS, TRY AGAIN')
            window.location.href = './index.html'
        }
    }

};   

