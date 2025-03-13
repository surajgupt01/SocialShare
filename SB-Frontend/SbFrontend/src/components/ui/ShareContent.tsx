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
         
        <div className="w-full h-screen bg-slate-800 fixed opacity-95 flex justify-center items-center z-100" onClick={()=>setState(false)}>
            
            <div className="relative p-2 bg-white md:w-150 sm:w-140 w-100 h-50 rounded-xl border-1 border-gray-500 flex flex-col justify-center items-center">
            <div className="font-semibold mb-10">Copy sharings link</div>
            <div className="flex justify-center items-center w-full border-1 rounded-xl p-2 bg-slate-700">

            <div className="absolute top-4 right-4 cursor-pointer" onClick={()=>setState(false)}>
                    <CrossaIcon />
                </div>

                <input className="p-4 w-90 h-10 rounded-lg border-1 border-gray-500 bg-white" placeholder="link" value={Res} readOnly ></input>
                <div onClick={async()=>{
                    
                    await window.navigator.clipboard.writeText(Res)
                    setState(false)
                    }}><CopyIcon></CopyIcon></div>

            </div>

            </div>



        </div>

        }



</>



    )
}

