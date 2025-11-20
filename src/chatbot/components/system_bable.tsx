interface message{
message:string;
}

export function SystemBable({message}:message){
    return(
        <>
        <div className="w-auto mx-auto h-auto bg-[#FFC107] pt-[16px] pr-[16px] pb-[20px] pl-[20px] rounded-xl">
            <p className="text-[16px] text-[#FFFDE7] font-medium">{message}</p>
        </div>
        </>
    );
}