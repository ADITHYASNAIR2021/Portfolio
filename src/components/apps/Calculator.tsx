import { useState } from 'react';
import { Delete } from 'lucide-react';

type Operation = '+' | '-' | '×' | '÷' | null;

export const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState<number | null>(null);
    const [operation, setOperation] = useState<Operation>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [history, setHistory] = useState<string>('');

    const inputDigit = (digit: string) => {
        if (waitingForOperand) {
            setDisplay(digit);
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? digit : display + digit);
        }
    };

    const inputDot = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
        } else if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const clear = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(false);
        setHistory('');
    };

    const clearEntry = () => {
        setDisplay('0');
    };

    const toggleSign = () => {
        const value = parseFloat(display);
        setDisplay(String(-value));
    };

    const inputPercent = () => {
        const value = parseFloat(display);
        setDisplay(String(value / 100));
    };

    const performOperation = (nextOperation: Operation) => {
        const inputValue = parseFloat(display);

        if (previousValue === null) {
            setPreviousValue(inputValue);
            setHistory(`${inputValue} ${nextOperation}`);
        } else if (operation) {
            const result = calculate(previousValue, inputValue, operation);
            setDisplay(String(result));
            setPreviousValue(result);
            setHistory(`${result} ${nextOperation}`);
        }

        setWaitingForOperand(true);
        setOperation(nextOperation);
    };

    const calculate = (a: number, b: number, op: Operation): number => {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '×': return a * b;
            case '÷': return b !== 0 ? a / b : 0;
            default: return b;
        }
    };

    const performEquals = () => {
        if (operation && previousValue !== null) {
            const inputValue = parseFloat(display);
            const result = calculate(previousValue, inputValue, operation);
            setHistory(`${previousValue} ${operation} ${inputValue} =`);
            setDisplay(String(result));
            setPreviousValue(null);
            setOperation(null);
            setWaitingForOperand(true);
        }
    };

    const handleBackspace = () => {
        if (display.length > 1) {
            setDisplay(display.slice(0, -1));
        } else {
            setDisplay('0');
        }
    };

    const performScientific = (fn: (n: number) => number) => {
        const value = parseFloat(display);
        setDisplay(String(fn(value)));
        setWaitingForOperand(true);
    };

    const buttonClass = (type: 'number' | 'operator' | 'function' | 'equals' | 'zero') => {
        const base = "flex items-center justify-center text-xl md:text-2xl font-medium rounded-full transition-all active:scale-95 select-none ";
        switch (type) {
            case 'number':
                return base + "bg-[#333333] hover:bg-[#444444] text-white w-full h-full aspect-square";
            case 'zero':
                return base + "bg-[#333333] hover:bg-[#444444] text-white w-full h-full aspect-[2/1] rounded-full pl-6 !justify-start";
            case 'operator':
                return base + "bg-[#FF9F0A] hover:bg-[#FFB340] text-white w-full h-full aspect-square";
            case 'function':
                return base + "bg-[#A5A5A5] hover:bg-[#B5B5B5] text-black w-full h-full aspect-square";
            case 'equals':
                return base + "bg-[#FF9F0A] hover:bg-[#FFB340] text-white w-full h-full aspect-square";
        }
    };

    return (
        <div className="w-full h-full bg-black flex flex-col p-4 md:p-6 select-none">

            {/* Display Area */}
            <div className="flex-1 min-h-[120px] flex flex-col justify-end items-end mb-4 px-2">
                <div className="text-right text-gray-500 text-lg h-8 mb-1 truncate w-full">
                    {history}
                </div>
                <div className="text-right text-white text-6xl md:text-8xl font-light truncate w-full leading-none">
                    {display.length > 9 ? parseFloat(display).toExponential(4) : display}
                </div>
            </div>

            {/* Buttons Container */}
            <div className="w-full max-w-[400px] md:max-w-[500px] mx-auto flex flex-col justify-end flex-1">
                {/* Scientific Keys - Hidden on Mobile */}
                <div className="hidden md:grid grid-cols-5 gap-3 mb-3">
                    <button onClick={() => performScientific(Math.sin)} className={buttonClass('function') + " !text-white !bg-[#2a2a2c] !text-base"}>sin</button>
                    <button onClick={() => performScientific(Math.cos)} className={buttonClass('function') + " !text-white !bg-[#2a2a2c] !text-base"}>cos</button>
                    <button onClick={() => performScientific(Math.tan)} className={buttonClass('function') + " !text-white !bg-[#2a2a2c] !text-base"}>tan</button>
                    <button onClick={() => performScientific(Math.sqrt)} className={buttonClass('function') + " !text-white !bg-[#2a2a2c] !text-base"}>√</button>
                    <button onClick={() => performScientific(n => n * n)} className={buttonClass('function') + " !text-white !bg-[#2a2a2c] !text-base"}>x²</button>
                </div>

                {/* Extra Functions Row (Mobile/Desktop) */}
                <div className="grid grid-cols-4 gap-3 mb-3">
                    <button onClick={clearEntry} className={buttonClass('function') + " !bg-[#3a3a3c] !text-white text-base"}>CE</button>
                    <button onClick={handleBackspace} className={buttonClass('function') + " !bg-[#3a3a3c] !text-white"} title="Backspace">
                        <Delete size={20} />
                    </button>
                    <button onClick={() => performScientific(Math.log10)} className={buttonClass('function') + " !bg-[#3a3a3c] !text-white text-base"}>log</button>
                    <button onClick={() => performScientific(Math.log)} className={buttonClass('function') + " !bg-[#3a3a3c] !text-white text-base"}>ln</button>
                </div>

                {/* Main Keypad */}
                <div className="grid grid-cols-4 gap-3 md:gap-4 w-full">
                    <button onClick={clear} className={buttonClass('function')}>AC</button>
                    <button onClick={toggleSign} className={buttonClass('function')}>±</button>
                    <button onClick={inputPercent} className={buttonClass('function')}>%</button>
                    <button onClick={() => performOperation('÷')} className={buttonClass('operator')}>÷</button>

                    <button onClick={() => inputDigit('7')} className={buttonClass('number')}>7</button>
                    <button onClick={() => inputDigit('8')} className={buttonClass('number')}>8</button>
                    <button onClick={() => inputDigit('9')} className={buttonClass('number')}>9</button>
                    <button onClick={() => performOperation('×')} className={buttonClass('operator')}>×</button>

                    <button onClick={() => inputDigit('4')} className={buttonClass('number')}>4</button>
                    <button onClick={() => inputDigit('5')} className={buttonClass('number')}>5</button>
                    <button onClick={() => inputDigit('6')} className={buttonClass('number')}>6</button>
                    <button onClick={() => performOperation('-')} className={buttonClass('operator')}>−</button>

                    <button onClick={() => inputDigit('1')} className={buttonClass('number')}>1</button>
                    <button onClick={() => inputDigit('2')} className={buttonClass('number')}>2</button>
                    <button onClick={() => inputDigit('3')} className={buttonClass('number')}>3</button>
                    <button onClick={() => performOperation('+')} className={buttonClass('operator')}>+</button>

                    <div className="col-span-2">
                        <button onClick={() => inputDigit('0')} className={buttonClass('zero')}>0</button>
                    </div>
                    <button onClick={inputDot} className={buttonClass('number')}>.</button>
                    <button onClick={performEquals} className={buttonClass('equals')}>=</button>
                </div>
            </div>
        </div>
    );
};
