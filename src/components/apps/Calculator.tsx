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

    const buttonClass = (type: 'number' | 'operator' | 'function' | 'equals') => {
        const base = "flex items-center justify-center text-xl font-medium rounded-full transition-all active:scale-95 ";
        switch (type) {
            case 'number':
                return base + "bg-[#333333] hover:bg-[#444444] text-white";
            case 'operator':
                return base + "bg-[#FF9F0A] hover:bg-[#FFB340] text-white";
            case 'function':
                return base + "bg-[#A5A5A5] hover:bg-[#B5B5B5] text-black";
            case 'equals':
                return base + "bg-[#FF9F0A] hover:bg-[#FFB340] text-white";
        }
    };

    return (
        <div className="w-full h-full bg-[#1C1C1C] flex flex-col p-4">
            <div className="text-right text-gray-500 text-sm h-6 mb-1 truncate">
                {history}
            </div>
            <div className="text-right text-white text-5xl font-light mb-4 truncate min-h-[60px] flex items-center justify-end">
                {display.length > 12 ? parseFloat(display).toExponential(6) : display}
            </div>
            <div className="grid grid-cols-5 gap-2 mb-2">
                <button onClick={() => performScientific(Math.sin)} className={buttonClass('function') + " text-sm h-10"}>sin</button>
                <button onClick={() => performScientific(Math.cos)} className={buttonClass('function') + " text-sm h-10"}>cos</button>
                <button onClick={() => performScientific(Math.tan)} className={buttonClass('function') + " text-sm h-10"}>tan</button>
                <button onClick={() => performScientific(Math.sqrt)} className={buttonClass('function') + " text-sm h-10"}>√</button>
                <button onClick={() => performScientific(n => n * n)} className={buttonClass('function') + " text-sm h-10"}>x²</button>
            </div>
            <div className="grid grid-cols-4 gap-3 flex-1">
                <button onClick={clear} className={buttonClass('function') + " h-16"}>AC</button>
                <button onClick={toggleSign} className={buttonClass('function') + " h-16"}>±</button>
                <button onClick={inputPercent} className={buttonClass('function') + " h-16"}>%</button>
                <button onClick={() => performOperation('÷')} className={buttonClass('operator') + " h-16"}>÷</button>
                <button onClick={() => inputDigit('7')} className={buttonClass('number') + " h-16"}>7</button>
                <button onClick={() => inputDigit('8')} className={buttonClass('number') + " h-16"}>8</button>
                <button onClick={() => inputDigit('9')} className={buttonClass('number') + " h-16"}>9</button>
                <button onClick={() => performOperation('×')} className={buttonClass('operator') + " h-16"}>×</button>
                <button onClick={() => inputDigit('4')} className={buttonClass('number') + " h-16"}>4</button>
                <button onClick={() => inputDigit('5')} className={buttonClass('number') + " h-16"}>5</button>
                <button onClick={() => inputDigit('6')} className={buttonClass('number') + " h-16"}>6</button>
                <button onClick={() => performOperation('-')} className={buttonClass('operator') + " h-16"}>−</button>
                <button onClick={() => inputDigit('1')} className={buttonClass('number') + " h-16"}>1</button>
                <button onClick={() => inputDigit('2')} className={buttonClass('number') + " h-16"}>2</button>
                <button onClick={() => inputDigit('3')} className={buttonClass('number') + " h-16"}>3</button>
                <button onClick={() => performOperation('+')} className={buttonClass('operator') + " h-16"}>+</button>
                <button onClick={() => inputDigit('0')} className={buttonClass('number') + " h-16 col-span-2"}>0</button>
                <button onClick={inputDot} className={buttonClass('number') + " h-16"}>.</button>
                <button onClick={performEquals} className={buttonClass('equals') + " h-16"}>=</button>
            </div>
            <div className="grid grid-cols-4 gap-3 mt-3">
                <button onClick={clearEntry} className={buttonClass('function') + " h-10 text-sm"}>CE</button>
                <button onClick={handleBackspace} className={buttonClass('function') + " h-10"} title="Backspace">
                    <Delete size={18} />
                </button>
                <button onClick={() => performScientific(Math.log10)} className={buttonClass('function') + " h-10 text-sm"}>log</button>
                <button onClick={() => performScientific(Math.log)} className={buttonClass('function') + " h-10 text-sm"}>ln</button>
            </div>
        </div>
    );
};
