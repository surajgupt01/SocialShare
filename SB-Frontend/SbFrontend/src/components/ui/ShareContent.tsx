import CopyIcon from "./Copy"
import CrossaIcon from "./CrossIcon"


interface ShareContentPorps{
    state : boolean,
    setState : (state:boolean)=>void,
    setRes : (res:any)=>void,
    Res :   any
}




export default function ShareContent({Res ,state , setState} : ShareContentPorps){




    return(
     <>
     
        {state && 
         
        <div className="w-full h-screen bg-slate-800 fixed opacity-95 flex justify-center items-center" onClick={()=>setState(false)}>
         
            <div className="relative p-2 bg-white w-150 h-50 rounded-xl border-1 border-gray-500 flex justify-center items-center">
            <div className="absolute top-4 right-4 cursor-pointer" onClick={()=>setState(false)}>
                    <CrossaIcon />
                </div>

                <input className="p-4 w-120 h-10 rounded-lg border-1 border-gray-500 " placeholder="link" value={Res} readOnly ></input>
                <div onClick={async()=>{
                    
                    await window.navigator.clipboard.writeText(Res)
                    setState(false)
                    }}><CopyIcon></CopyIcon></div>
            </div>



        </div>

        }



</>



    )
}

