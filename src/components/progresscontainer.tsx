
type progressprop={
text:string;
progress:boolean;
desc:string;
};
export function Progresscontainer({text,progress,desc}:progressprop){
    return(
        <>
       <div className="flex flex-col items-center gap-4">
         <div className="flex flex-row items-center">
            <div className={`border-b-[3px] w-16 ${progress ? "border-[#0156FF]":"border-[#CACDD8]"}`}></div>
            {progress===false ? <div className={`border-[3px] w-10 h-10 flex justify-center font-bold items-center  rounded-full p-3 ${progress ? "border-[#0156FF]":"border-[#CACDD8]"}`}>{text}</div>:<div className={`border-[3px]  flex items-center justify-center w-10 h-10 font-bold rounded-full p-3 ${progress ? "border-[#0156FF]":"border-[#CACDD8]"}`}><svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="1.41421" y1="5.50427" x2="5" y2="9.09006" stroke="black" stroke-width="2" stroke-linecap="square"/>
<line x1="1" y1="-1" x2="11.9985" y2="-1" transform="matrix(-0.707103 0.70711 -0.707103 -0.70711 12.877 0)" stroke="black" stroke-width="2" stroke-linecap="square"/>
</svg>

</div>}
           <div className={`border-b-[3px] w-16 ${progress ? "border-[#0156FF]":"border-[#CACDD8]"}`}></div>
        </div>
        <span className={`${progress ? "":"text-[#A2A6B0]"}`}>{desc}</span>
       </div>
        
        </>
    );

}