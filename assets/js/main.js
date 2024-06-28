let parenteses = 0;
let press;
let prePress;
let complete = false;
const display = document.querySelector('#display');

document.addEventListener('keypress', (e) => {
    

    if (Number(e.key)) {
        addDisplay(Number(e.key));
    } else if (e.key === '0') {
        addDisplay(0);
    } else if( e.key === '+' || e.key === '*' || e.key === '/' || e.key === '-' || e.key === '.') {
        addDisplay(e.key);
    } else if (e.key === 'Enter') {
        addDisplay('=');
    } else if (e.key === '(') {
        addDisplay('PA');
    } else if (e.key === ')') {
        addDisplay('PF');
    } else if (e.key === ',') {
        addDisplay('.');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
        addDisplay('<<')
    }
})

function addDisplay(button) {
    
    
    if (complete === true && Number(button)) {
        clear();
        complete = false;
    }   else if (complete === true && !Number(button)) {
        complete = false;
    }

    if (typeof button == 'number') {
        
        display.value += button;

    } else if (button === '*' || button === '/' || button === '.') {

        if (display.value === '') {
            
            display.value += '0' + button;

        } else if (Number(press)){

            display.value += button;

        } else if (prePress !== '*' && press === '*'){ 
            display.value += button;

        } else if (press === '*' || press === '/') {
            erase();
            display.value += button;
        } else if (button === '*') {
            display.value += button;
        } else if (button === '/'){
            display.value += button;           
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
        if (parenteses > 0) {
            for (let i = 0; i < parenteses; i++){
                display.value += ')'
                console.log(display.value)
            }
            parenteses = 0;
        }

        if (press === undefined){
        clear();
        return;
        }

        if (press === '=') {
            clear();
            return;
        }

        if (press === '') {
            clear();
            return;
        }
        if (Number(press)) {
            try {
                
                display.value = eval(display.value);
                complete = true;

            } catch (error) {
                
                alert(`Erro de sintaxe!`);
                clear();
                
            }
        } else {
            
            if (press === 'PF' ){
                display.value = eval(display.value);
                complete = true;
                
            } else {
                try {
                
                    erase();
    
                    display.value = eval(display.value);
                    complete = true;
    
                } catch (error) {
    
                    alert(`Erro de sintaxe!`);
                    clear();
    
                }
            }


            
        }
        
    }
    prePress = press;
    press = button;
}

function erase() {
    display.value = display.value.slice(0, display.value.length - 1);
    const lastPick = display.value.slice(display.value.length - 1, display.value.length);
    press = prePress;
}

function clear() {
    display.value = '';
    press = '';

}

function colchete (type) {
    
    if (type === 'PA') {
        if (display.value === '') {
            
            display.value += '(' ;
            parenteses++
        } else if (Number(press)) {

            display.value += '*(';
            parenteses++

        } else if (!Number(press)) {
            display.value += '('

            parenteses++
        }
    }

    if (type === 'PF') {
        if (parenteses > 0) {
            display.value += ')';
            parenteses--
            } 
    }
}