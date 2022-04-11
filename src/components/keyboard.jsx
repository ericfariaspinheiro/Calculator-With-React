const buttons = [
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
    keyName: "subtract",
    keySymbol: "-"
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
    keyName: "add",
    keySymbol: "+"
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
    keyName: "equals",
    keySymbol: "="
    },
    {
    keyName: "zero",
    keySymbol: 0
    },
    {
    keyName: "decimal",
    keySymbol: "."
    }
];



export default function Buttons (props) {
    const buttonsMapped = buttons.map((item, index)=> {
        if (Number.isInteger(item["keySymbol"])){
            return <button className={`allBtns ${item["keyName"]}`} onClick={props.selectedNum} key={index}>{item["keySymbol"]}</button>
        } else if (item["keySymbol"] === "AC"){
            return <button className={`allBtns ${item["keyName"]}`} onClick={props.clearValues} key={index}>{item["keySymbol"]}</button>
        } else if (item["keySymbol"] === "=") {
            return <button className={`allBtns ${item["keyName"]}`} onClick={props.selectedEquals} key={index}>{item["keySymbol"]}</button>
        } else if (item["keySymbol"] === "."){
            return <button className={`allBtns ${item["keyName"]}`} onClick={props.selectedFloat} key={index}>{item["keySymbol"]}</button>
        }

        return <button className={`allBtns ${item["keyName"]}`} onClick={props.selectedOperation} key={index}>{item["keySymbol"]}</button>
    });

    return(
        <div id="allButtons">
            {buttonsMapped}
        </div>
    )
}