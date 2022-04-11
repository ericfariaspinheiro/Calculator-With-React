import React from 'react';
import Keyboard from './components/keyboard.jsx';
import Display from './components/display.jsx';
import calculate from './logic/calculate.jsx';
import './App.css'

class App extends React.Component {
  state = {
    operation: "0",
    currentValue: "0",
    negative: false,
    equality: false
  }

  handleClickClear = ()=>{
    this.setState(
      () => ({
      currentValue: "0",
      operation: "0"
    }))
  }

  handleClickNumbers = (e) => {
    const currentPressed = e.target.textContent;

    if(this.state.equality){
      return(this.setState({currentValue: currentPressed, operation: currentPressed, equality: false}));
    } 

    this.setState(
    (previousState)=> {
      if(previousState.currentValue === "0"){
        return ({currentValue: currentPressed, operation: currentPressed})
      }

      if(previousState.currentValue === "+" || previousState.currentValue === "/" || previousState.currentValue === "-" || previousState.currentValue === "X"){
        return (this.state.negative ? {currentValue: currentPressed, operation: previousState.operation + currentPressed, negative: false} : {currentValue: currentPressed, operation: previousState.operation + " " + currentPressed})
      }

      return {currentValue: previousState.currentValue + currentPressed, operation: previousState.operation + currentPressed}
      }
    )
  }

  handleClickOperations = (e) => {
    const currentPressedOp = e.target.textContent;
    const previousOperation = this.state.currentValue;

    if(this.state.equality){
      this.setState((previousState)=> {
            return ({
             currentValue: currentPressedOp,
             operation: previousState.currentValue + " " + currentPressedOp,
             equality: false
            })
          })
    }

    if(previousOperation === "+" || previousOperation === "-" || previousOperation === "X" || previousOperation === "/"){  
      if(currentPressedOp === "-"){
        return this.setState((previousState)=> {
            return ({
              currentValue: currentPressedOp,
              operation: previousState.operation + " " + currentPressedOp,
              negative: true
            })
          })
      }

      return this.setState(
        (previousState)=> {
          if(this.state.negative){
            const replacerP = (previousState.operation).slice(0, -4);
            return ({
              currentValue: currentPressedOp,
              operation: replacerP + " " + currentPressedOp,
              negative: false
            })
          }
          
          
        const replacerN = (previousState.operation).slice(0, -2);
        return ({
          currentValue: currentPressedOp,
          operation: replacerN + " " + currentPressedOp
        })
        }
      )
    }

    this.setState(
    (previousState)=> {
      return ({
        currentValue: currentPressedOp,
        operation: previousState.operation + " " + currentPressedOp
        })
      }
    )
  }

  handleClickFloat = () => {
    if((this.state.currentValue).includes(".") === false){
      this.setState(
        (previousState)=> {
          return ({
            currentValue: previousState.currentValue + ".",
            operation: previousState.operation + "."
          })
        }
      )
    }
  }

  handleClickResult = (e) => {
    const currentPressedEq = e.target.textContent;
    const finalResult = calculate(this.state.operation, this.state.currentValue)

    this.setState(
      (previousState)=> {
        return ({
          currentValue: finalResult,
          operation: previousState.operation + " " + currentPressedEq + " " + finalResult,
          equality: true
        })
      }
    )
  }

  render(){
    return (
      <div id="calculator">
        <Display 
          operation = {this.state.operation}
          currentValue = {this.state.currentValue}
        />
        <Keyboard 
          clearValues={this.handleClickClear}
          selectedNum={this.handleClickNumbers}
          selectedOperation={this.handleClickOperations}
          selectedEquals={this.handleClickResult}
          selectedFloat={this.handleClickFloat}
        />
      </div>
    )
  }
}

export default App;
