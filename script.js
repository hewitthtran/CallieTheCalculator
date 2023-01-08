// private var => #
// public var => [nothing]
class Calculator {
    constructor(prevOperandTxtElmnt, currOperandTxtElmnt) {
        this.prevOperandTxtElmnt = prevOperandTxtElmnt;
        this.currOperandTxtElmnt = currOperandTxtElmnt;
        this.clear();
    }

    clear() {
        this.prevOperand = '';
        this.currOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0,-1);
        // slice() method returns shallow copy of portion of array into new array object (end not included) (-1 = last index)
    }

    clickNum(userNum) {
        // .includes function determines whether array includes certain value (boolean)
        if (userNum === '.' && this.currOperand.includes('.')) {
            return;
        }
        this.currOperand = this.currOperand.toString() + userNum.toString();
        // https://stackoverflow.com/questions/15834172/whats-the-difference-in-using-tostring-compared-to-json-stringify => toString different from JSON.stringify
    }
    chooseOperation(userOperation) {
        if (this.currOperand === '') {
            return;
        }
        if (this.prevOperand !== '') {
            this.calc();
        }
        this.operation = userOperation;
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    }

    calc() {
        let calculation;
        const prev = parseFloat(this.prevOperand);
        // parseFloat() function parses string, returns floating point num
        const curr = parseFloat(this.currOperand);
        if (isNaN(prev) || isNaN(curr))
            return;
            // isNAN() function determines whether value is NAN when converted to string
        switch (this.operation) {
            case '+': 
                calculation = prev + curr;
                break;
            case '-':
                calculation = prev - curr;
                break;
            case 'x':
                calculation = prev * curr;
                break;
            case '÷':
                calculation = prev / curr;
                break;
            default:
                return;
        }
        this.currOperand = calculation;
        this.operation = undefined;
        this.prevOperand = '';
    }

    getDisplayNum(number) {
        const stringNum = number.toString();
        const integerDigits = parseFloat(stringNum.split('.')[0]);
        // split(separator [optional], limit [optional]) method splits string into array of substrings
        // 1st num in array is part before the period & 2nd num is part after.
        const decimalDigits = stringNum.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0}); //research maximumFractionDigits
        }
        // toLocaleString('en') method returns string with language-sensitive representation
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }
        else {
            return integerDisplay;
        }
    }

    displayUpdate() {
        this.currOperandTxtElmnt.innerText = this.getDisplayNum(this.currOperand);
        if (this.operation != null) {
            this.prevOperandTxtElmnt.innerText = `${this.getDisplayNum(this.prevOperand)} ${this.operation}`;
        }
        else {
            this.prevOperandTxtElmnt.innerText = '';
        }
    }
}

const buttonsNum = document.querySelectorAll('[dataNum]');
// document.querySelectorAll => get all elements that match certain string (must be inside [])
const buttonsOperation = document.querySelectorAll('[dataOperation]');
const buttonAC = document.querySelector('[dataAC]');
const buttonDEL = document.querySelector('[dataDEL]');
const buttonEqual = document.querySelector('[dataEqual]');
const prevOperandTxtElmnt = document.querySelector('[dataPreviousOperand]');
const currOperandTxtElmnt = document.querySelector('[dataCurrentOperand]');

const calculator = new Calculator(prevOperandTxtElmnt, currOperandTxtElmnt);

buttonsNum.forEach(button => {
    button.addEventListener('click', () => {
        calculator.clickNum(button.innerText);
        calculator.displayUpdate();
    })
})
// forEach method calls function for each element in array
// EventTarget interface > addEventListener method sets up function to be called whenever specified event delivered to target
// HTMLElement interface > innerText property represents rendered text content of node + decendants
buttonsOperation.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.displayUpdate();
    })
})

buttonEqual.addEventListener('click', button => {
    calculator.calc();
    calculator.displayUpdate();
})

buttonAC.addEventListener('click', button => {
    calculator.clear();
    calculator.displayUpdate();
})

buttonDEL.addEventListener('click', button => {
    calculator.delete();
    calculator.displayUpdate();
})
