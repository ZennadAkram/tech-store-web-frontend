import { useAuthStore } from "../../features/auth/authStore";

interface message{
    message:string;
}
export function UserBable({message}:message){
    const user = useAuthStore((state) => state.user);
    return (
      <>
      <div className=" w-auto flex flex-col items-end">
         <div className="bg-[#0156FF] w-auto h-auto inline-flex items-center pt-[16px] pb-[20px] pl-[20px] pr-[16px] rounded-bl-[12px] rounded-tr-[12px] rounded-tl-[12px] ">
    <p className="text-white text-[15px]">{message}</p>
</div>
<div className="relative  w-0 h-0  right-0
      border-r-[30px] border-r-[#0156FF]
      border-l-[35px] border-l-transparent
      border-b-[35px] border-b-transparent

      ">
<div className="absolute  -right-11 -bottom-[60px] w-[48px] h-[48px] rounded-full cursor-pointer bg-gray-300">
        <img className="w-[48px] h-[48px]  rounded-full" src={user?.image ?? ""} alt="user" />
       </div>
      </div>
      
      </div>
      
      </>
    );
}