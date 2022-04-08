import React from 'react';
import './App.css'

const numbers = [
  {
    keyName: "seven",
    keySymbol: 7
  },

  {
    keyName: "eight",
    keySymbol: 8
  },
  {
    keyName: "nine",
    keySymbol: 9
  },
  {
    keyName: "four",
    keySymbol: 4
  },
  {
    keyName: "five",
    keySymbol: 5
  },
  {
    keyName: "six",
    keySymbol: 6
  },
  {
    keyName: "one",
    keySymbol: 1
  },
  {
    keyName: "two",
    keySymbol: 2
  },
  {
    keyName: "three",
    keySymbol: 3
  },
  {
    keyName: "zero",
    keySymbol: 0
  }];

const operations = [
  {
    keyName: "clear",
    keySymbol: "AC"
  }, 
  {
    keyName: "divide",
    keySymbol: "/"
  },
  {
    keyName: "multiply",
    keySymbol: "X"
  },
  {
    keyName: "subtract",
    keySymbol: "-"
  },
  {
    keyName: "add",
    keySymbol: "+"
  },
  {
    keyName: "equals",
    keySymbol: "="
  },
  {
    keyName: "decimal",
    keySymbol: "."
  }
]
class Buttons extends React.Component {

  render(){
    return(
      <div id="allButtons">
        <button id={operations[0]["keyName"]} onClick={this.props.clearValues}>{operations[0]["keySymbol"]}</button>
        <button id={operations[1]["keyName"]} onClick={this.props.selectedOperation}>{operations[1]["keySymbol"]}</button>
        <button id={operations[2]["keyName"]} onClick={this.props.selectedOperation}>{operations[2]["keySymbol"]}</button>

        <button id={numbers[0]["keyName"]} onClick={this.props.selectedNum}>{numbers[0]["keySymbol"]}</button>
        <button id={numbers[1]["keyName"]} onClick={this.props.selectedNum}>{numbers[1]["keySymbol"]}</button>
        <button id={numbers[2]["keyName"]} onClick={this.props.selectedNum}>{numbers[2]["keySymbol"]}</button>
        <button id={operations[3]["keyName"]} onClick={this.props.selectedOperation}>{operations[3]["keySymbol"]}</button>

        <button id={numbers[3]["keyName"]} onClick={this.props.selectedNum}>{numbers[3]["keySymbol"]}</button>
        <button id={numbers[4]["keyName"]} onClick={this.props.selectedNum}>{numbers[4]["keySymbol"]}</button>
        <button id={numbers[5]["keyName"]} onClick={this.props.selectedNum}>{numbers[5]["keySymbol"]}</button>
        <button id={operations[4]["keyName"]} onClick={this.props.selectedOperation}>{operations[4]["keySymbol"]}</button>

        <button id={numbers[6]["keyName"]} onClick={this.props.selectedNum}>{numbers[6]["keySymbol"]}</button>
        <button id={numbers[7]["keyName"]} onClick={this.props.selectedNum}>{numbers[7]["keySymbol"]}</button>
        <button id={numbers[8]["keyName"]} onClick={this.props.selectedNum}>{numbers[8]["keySymbol"]}</button>

        <button id={numbers[9]["keyName"]} onClick={this.props.selectedNum}>{numbers[9]["keySymbol"]}</button>
        <button id={operations[5]["keyName"]} onClick={this.props.selectedEquals}>{operations[5]["keySymbol"]}</button>
        <button id={operations[6]["keyName"]} onClick={this.props.selectedFloat}>{operations[6]["keySymbol"]}</button>
      </div>
    )
  }
}
 
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      operation: "0",
      currentValue: "0",
      negative: false,
      equality: false
    }
    this.handleClickClear = this.handleClickClear.bind(this);
    this.handleClickNumbers = this.handleClickNumbers.bind(this);
    this.handleClickOperations = this.handleClickOperations.bind(this);
    this.handleClickResult = this.handleClickResult.bind(this);
    this.handleClickFloat = this.handleClickFloat.bind(this);
    
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
      this.setState(
        (previousState)=> {
          return ({currentValue: currentPressed, operation: currentPressed, equality: false})
        }
      )
    } else {
      this.setState(
      (previousState)=> {
        if(previousState.currentValue === "0"){
          return ({currentValue: currentPressed, operation: currentPressed})
        }

        if(previousState.currentValue === "+" || previousState.currentValue === "/" || previousState.currentValue === "-" || previousState.currentValue === "X"){
          if(this.state.negative){
            return ({currentValue: currentPressed, operation: previousState.operation + currentPressed, negative: false})
          } else {
            return ({currentValue: currentPressed, operation: previousState.operation + " " + currentPressed})
          }
        }

        return {
          currentValue: previousState.currentValue + currentPressed,
          operation: previousState.operation + currentPressed
          }
        }
      )
    }
  }

  handleClickOperations = (e) => {
    const currentPressedOp = e.target.textContent;
    if(this.state.equality){
      this.setState(
          (previousState)=> {
            return ({
             currentValue: currentPressedOp,
             operation: previousState.currentValue + " " + currentPressedOp,
             equality: false
            })
          }
        )
    } else {

    if(this.state.currentValue === "+" || this.state.currentValue === "-" || this.state.currentValue === "X" || this.state.currentValue === "/"){
      if(this.state.currentValue === "+" || this.state.currentValue === "X" || this.state.currentValue === "/"){
        if(currentPressedOp === "-"){
          this.setState(
            (previousState)=> {
              return ({
                currentValue: currentPressedOp,
                operation: previousState.operation + " " + currentPressedOp,
                negative: true
              })
            }
          )
        }
      }

      this.setState(
        (previousState)=> {
          if(this.state.negative){
            const replacerP = (previousState.operation).slice(0, -4);
            return ({
              currentValue: currentPressedOp,
              operation: replacerP + " " + currentPressedOp,
              negative: false
            })
          } else {
            const replacerN = (previousState.operation).slice(0, -2);
            return ({
              currentValue: currentPressedOp,
              operation: replacerN + " " + currentPressedOp
            })
          }
        }
      )
    } else {
      this.setState(
      (previousState)=> {
        return ({
          currentValue: currentPressedOp,
          operation: previousState.operation + " " + currentPressedOp
          })
        }
      )
    }
    }
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
    let result = this.state.currentValue;
    let toBeCalculated = (this.state.operation).split(" ");

    while (toBeCalculated.indexOf("X") > 0) {
      let pos = toBeCalculated.findIndex(op=> op==="X");
      result = toBeCalculated[pos-1] * toBeCalculated[pos+1];
      toBeCalculated.splice(pos-1, 3, result)
    }

    while (toBeCalculated.indexOf("/") > 0){
      let pos = toBeCalculated.findIndex(op=> op==="/");
      result = toBeCalculated[pos-1] / toBeCalculated[pos+1];
      toBeCalculated.splice(pos-1, 3, result)
    }
    
    while (toBeCalculated.indexOf("+") > 0){
      let pos = toBeCalculated.findIndex(op=> op==="+");
      if(toBeCalculated[pos-2] === "-"){
        result = (((toBeCalculated[pos-1] * -1) + parseFloat(toBeCalculated[pos+1])) * -1);
        toBeCalculated.splice(pos-2, 4, "-", result)
      } else {
        result = parseFloat(toBeCalculated[pos-1]) + parseFloat(toBeCalculated[pos+1]);
        toBeCalculated.splice(pos-1, 3, result)
      }
    }

    while (toBeCalculated.indexOf("-") > 0){
      let pos = toBeCalculated.findIndex(op=> op==="-");
      result = parseFloat(toBeCalculated[pos-1]) - parseFloat(toBeCalculated[pos+1]);
      toBeCalculated.splice(pos-1, 3, result);
    }

    this.setState(
      (previousState)=> {
        return ({
          currentValue: result,
          operation: previousState.operation + " " + currentPressedEq + " " + result,
          equality: true
        })
      }
    )
  }

  render(){
    return (
      <div id="calculator">
        <div id="visor">
          <div id="operation">
          {this.state.operation}
          </div>
          <div id="display">
            {this.state.currentValue}
          </div>
        </div>
        <Buttons 
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
