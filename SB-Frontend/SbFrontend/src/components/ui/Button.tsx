export interface ButtonProps{
    variant : "primary" | "secoundary",
    text : string,
    startIcon ?: any,
    endIcon ?: any,
    size : string,
    onClick ?: ()=> void,
    bgcolor : string,
    color : string,
    rounded : string,
    fontWeight?:  string
    hover : string

}



export function Button(props : ButtonProps){
  
    return(

        <button onClick={props.onClick} className={`flex ${props.bgcolor}  ${props.color} ${props.size} ${props.rounded} cursor-pointer m-2 ${props.fontWeight} ${props.hover}`}>
            {props.startIcon ? <div className="pr-3">{props.startIcon}</div> : null} {props.text}
        </button>

    )
}