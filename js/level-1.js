$(document).ready(function() {

    let guess = 0;
    let attempts = 0
    let selectedColor = '';
    $('.game__check__btn').prop("disabled", true).css('cursor', 'not-allowed');
    let clickCount = 0;
    let isSelected = false;
    let answerArray = makeAnswer()
    let tempRay = $('.color-choices'); //array temporal 
    let guessBoxArray = [];
    let nextResult = $($('.first-results')[0]).parent()[0];
    for(let i = 9; i >= 0; i--) {
        guessBoxArray.push(tempRay[i]);    
    }

    // Añadimos un id a cada casilla
    for(let i = 0; i < 10; i++) {
        let guessArray = guessBoxArray[i].getElementsByClassName("color-choice");
        for(let j = 0; j < 4; j++) {
            $(guessArray[j]).attr('id', `g-${i}-${j}`);      
        }
    } 

    //Se dividen las casillas en bloques de 4 X 10
    let masterGuessArray = [[-1, -1, -1, -1],
                            [-1, -1, -1, -1],
                            [-1, -1, -1, -1],
                            [-1, -1, -1, -1],
                            [-1, -1, -1, -1],
                            [-1, -1, -1, -1],
                            [-1, -1, -1, -1],
                            [-1, -1, -1, -1],
                            [-1, -1, -1, -1],
                            [-1, -1, -1, -1]];

    //Función para que el botón check sube de línea
    $('.game__check__btn').click(function() {
        $('.active').removeClass('active');

        // console.log(masterGuessArray[guess]);     //Muestra el resultade la seleccion de cplores del usuario
        // console.log(answerArray);                 //Muestrala aretorio de random

        let resultArray = getResult();
        checkWin(resultArray);
        let resultBox = getResultBox();
        placePegs(resultArray, resultBox);
        guess++
        for(let i = 0; i < 4; i++) {
            $(`#g-${guess}-${i}`).addClass('active');  
        }

        $('.game__check__btn').prop("disabled", true).css('cursor', 'not-allowed');

    });

    // Selección de color
    $('.color').click(function () {
        isSelected = true;
        $('.color').css('width', '35px').css('height', '35px')
        let peg = ($(this))[0];
        selectedColor = $(this).css('background-color');
        
        // switch
        $(peg).css('width', '40px');
        $(peg).css('height', '40px');
        
    });

    // Pasamos color seleccionado a color-choice
    $('.color-choice').click(function() {
        if (isSelected) {

        
            if ($(this).hasClass('active')) {
                $(this).css('background-color', selectedColor);
                let coord =$(this).attr('id');                      
                updateMasterArray(selectedColor, coord);

                //El botón empieza a funcionar cuando todas las casillas tengan  color asignado
                clickCount++;
                if (clickCount === 4) {
                    $('.game__check__btn').prop("disabled", false).css('cursor', 'pointer');
                    clickCount = 0;
                } 
            } 
        }
        
    
    });

    function makeAnswer() {
        let array = [];
        for(let i = 0; i < 4; i++) {
            array.push(Math.floor(Math.random() * 6)); 
        }

        return array; 
    }
  
    function updateMasterArray(col, xy) {


        let array = xy.split('-');
        let x = array[1];
        let y = array[2];
        
        // console.log(array);                           // Refleja el código de color la posición
    
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
        for(let i = 0; i < 4; i++) {
            aArray.push(answerArray[i]);
        }
        
        //black confirmación
        for(let i = 0; i < 4; i++) {
            if(masterGuessArray[guess][i] === aArray[i]){
                resulArray.push('black-confirm');
                aArray[i] = -1;
                masterGuessArray[guess][i] = -2;
            }
           
        } 

        //white confirmación/ compara si los colores de random coinciden con los colores seleccionados
        
        for(let i = 0; i < 4; i++) {
            for(let j = 0; j < 4; j++) {
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

    function getResultBox() {
        let activeResult = nextResult.getElementsByClassName("results")[0];
        nextResult = $(nextResult).prev()[0];
        return activeResult;
    }

    function placePegs(array, box) {
        let pegArray = box.getElementsByClassName("result");

        // console.log(pegArray); 

        for(let i = 0; i < array.length; i++) {
            $(pegArray[i]).addClass(`${array[i]}`);
        }

        $('.white-confirm').css('background', 'none').css('background-color', 'white');
        $('.black-confirm').css('background', 'none').css('background-color', 'black');
    }

    function checkWin(array) {       
        let arrayStr = array.join();
        if(arrayStr === 'black-confirm,black-confirm,black-confirm,black-confirm'){
            window.location.href = '../win.html'
        } else {
            attempts++;
            if (attempts >= 10) {
                alert('UPS, TRY AGAIN')
                window.location.href = '../index.html'
            }
        }

    };   

});