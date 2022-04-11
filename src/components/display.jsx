export default function Display (props) {
    return(
        <div id="visor">
            <div id="operation">
                {props.operation}
            </div>
            <div id="display">
                {props.currentValue}
            </div>
        </div>
    )
}