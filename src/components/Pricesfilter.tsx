type filterpriceProp={
name:string;
num:number;
index:number;
}

export function Filterprice({name,num,index}:filterpriceProp){
const adddolar = (name: string): string => {
  const [from, to] = name.split("-");
  return `${from}-$${to}`;
};

return (
    <>
    <div
    key={index}
    className="flex flex-row cursor-pointer font-normal justify-between items-center">
    <span>${adddolar(name)}</span>
    <span>{num}</span>
</div>
    </>
);
}