import React, { useState } from 'react';
import Keyboard from './components/keyboard.jsx';
import Display from './components/display.jsx';
import calculate from './logic/calculate.jsx';
import './App.css'

export default function App () {  
  const [operation, setOperation] = useState("0");
  const [currentValue, setCurrentValue] = useState("0");
  const [negative, setNegative] = useState(false);
  const [equality, setEquality] = useState(false);

  const handleClickClear = ()=>{
    setCurrentValue("0");
    setOperation("0");
    return;
  }

  const handleClickNumbers = (e) => {
    const currentPressed = e.target.textContent;
    
    if(equality){
      setCurrentValue(currentPressed);
      setOperation(currentPressed);
      setEquality(false);
      return;
    } 

    if(currentValue === "0"){
      setCurrentValue(currentPressed);
      setOperation(currentPressed);
      return;
    }

    if(currentValue === "+" || currentValue === "/" || currentValue === "-" || currentValue === "X"){
      if(negative){
        setCurrentValue(currentPressed);
        setOperation(operation + currentPressed);
        setNegative(false);
        return;
      }

      setCurrentValue(currentPressed);
      setOperation(operation + " " + currentPressed);
      return;      
    }

    setCurrentValue(currentValue + currentPressed);
    setOperation(operation + currentPressed);
    return;
  }
  
  const handleClickOperations = (e) => {
    const currentPressedOp = e.target.textContent;

    if(equality){
      setCurrentValue(currentPressedOp);
      setOperation(currentValue + " " + currentPressedOp);
      setEquality(false);
      return;
    }

    if(currentValue === "+" || currentValue === "-" || currentValue === "X" || currentValue === "/"){  
      if(currentPressedOp === "-"){
        setCurrentValue(currentPressedOp);
        setOperation(operation + " " + currentPressedOp);
        setNegative(true);
        return;
      }

      if(negative){
        const replacerP = operation.slice(0, -4);

        setCurrentValue(currentPressedOp);
        setOperation(replacerP + " " + currentPressedOp);
        setNegative(false);
        return;
      }
      
      const replacerN = operation.slice(0, -2);
      setCurrentValue(currentPressedOp);
      setOperation(replacerN + " " + currentPressedOp);
      return;
    }

    setCurrentValue(currentPressedOp);
    setOperation(operation + " " + currentPressedOp);
    return;
  }

  const handleClickFloat = () => {
    if(currentValue.includes(".") === false){
      setCurrentValue(currentValue + ".");
      setOperation(operation + ".");
    }
  }

  const handleClickResult = (event) => {
    const currentPressedEq = event.target.textContent;
    const finalResult = calculate(operation, currentValue);

    setCurrentValue(finalResult);
    setOperation(operation + " " + currentPressedEq + " " + finalResult);
    setEquality(true);
    return;
  }

  return (
    <div id="calculator">
      <Display 
        operation = {operation}
        currentValue = {currentValue}
      />
      <Keyboard 
        clearValues={handleClickClear}
        selectedNum={handleClickNumbers}
        selectedOperation={handleClickOperations}
        selectedEquals={handleClickResult}
        selectedFloat={handleClickFloat}
      />
    </div>
  )
}