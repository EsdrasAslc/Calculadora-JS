let parenteses;
let press;
let prePress;
let complete = false;
const display = document.querySelector('#display');

function addDisplay(button) {
    
    
    if (complete === true && Number(button)) {
        clear();
        complete = false;
    }   else if (complete === true && !Number(button)) {
        complete = false;
    }

    if (typeof button === 'number') {
        
        display.value += button;

    } else if (button === '*' || button === '/' || button === '.') {

        if (display.value === '') {
            
            display.value += '0' + button;

        } else if (Number(press)){

            display.value += button;

        } else if (press === '/'){

            
            erase();
            display.value += button;           

        } else if (press === '*') {
            if (button === '/') {
                if (prePress === '*') {
                    erase();
                    erase();
                    display.value += button; 
                }
                erase();
                
                display.value += button; 
            } else {
                display.value += button; 
            }
        }

    } else if (button === '+' || button === '-') {
        
        if (press === '+' || press === '-') {
            
            erase();
            display.value += button;
        } else {
            display.value += button;
        }

    } else if (button === 'PA' || button === 'PF') {

        colchete(button);

    } else if (button === 'C') {

        clear();

    } else if (button === '<<') {

        erase();
        
    } else if (button === '=') {
        if (Number(press)) {
            try {

                display.value = eval(display.value);
                complete = true;

            } catch (error) {
                
                alert('Erro de sintaxe!');
                clear();
                
            }
        } else {
            
            try {
                
                erase();

                display.value = eval(display.value);
                complete = true;

            } catch (error) {

                alert('Erro de sintaxe!');
                clear();

            }
        }
        
    }
    console.log(press);
    prePress = press;
    press = button;
    console.log(press);
}

function erase() {
    display.value = display.value.slice(0, display.value.length - 1);
    const lastPick = display.value.slice(display.value.length - 1, display.value.length);
    press = prePress;
    console.log(lastPick);
}

function clear() {
    display.value = '';
    press = '';

}

function colchete (type) {
    
    if (type === 'PA') {
        if (display.value === '') {
            
            display.value += '(' ;
            parenteses = true;
        } else if (Number(press)) {

            display.value += '*(';
            parenteses = true;

        }
    }

    if (type === 'PF') {
        if (parenteses) {
            display.value += ')';
            parenteses = false;
        } 
    }
}