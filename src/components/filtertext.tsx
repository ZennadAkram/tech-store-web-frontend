type filtertextProp={
name:string;
num:number;
index:number;
}

export function Filtertext({name,num,index}:filtertextProp){
return (
    <>
    <div
    key={index}
    className="flex flex-row cursor-pointer font-normal justify-between items-center">
    <span>{name}</span>
    <span>{num}</span>
</div>
    </>
);
}