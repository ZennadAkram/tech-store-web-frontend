interface message{
    message:string;
}
export function ChatbotBable({message}:message){
    return (
        <>
        <div className=" h-auto">
       <div className="bg-[#DEE2E6] w-auto h-auto inline-flex items-center pt-[16px] pb-[20px] pl-[20px] pr-[16px] rounded-br-[12px] rounded-tr-[12px] rounded-tl-[12px]">
    <p className="text-[#444444] text-[15px] whitespace-pre-wrap">{message}</p>
</div>

            <div className=" relative
  w-0 h-0                           // Zero content area
  border-r-[35px] border-r-transparent  // Left border: transparent
  border-l-[30px]   border-l-[#DEE2E6] 
  border-b-[35px]  border-b-transparent      // Bottom border: colored
">
   <div className="absolute -bottom-[55px] -left-10 flex justify-center items-center p-2 w-[48px] h-[48px] rounded-full bg-[#0156FF]">
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M34.5877 25.0886C31.8886 26.1708 28.9751 26.8383 25.9279 27.0112C25.4024 27.041 24.8729 27.0562 24.3398 27.0562C23.8068 27.0562 23.2773 27.041 22.7517 27.0112C19.7038 26.8382 16.7897 26.1705 14.0901 25.0878C8.42473 22.8158 3.70399 18.7165 0.673157 13.5281C5.39723 5.44098 14.2269 0 24.3398 0C34.4528 0 43.2824 5.44098 48.0065 13.5281C44.9753 18.7171 40.2539 22.8167 34.5877 25.0886Z" fill="white"/>
<path d="M14.0898 27.1939C13.4371 26.9321 12.797 26.6461 12.1705 26.337C10.1346 27.7573 8.41353 29.5261 7.11755 31.5442C9.32036 34.9745 12.7514 37.6846 16.869 39.1867C18.8311 39.9025 20.949 40.3439 23.1643 40.4583H25.4727C27.6875 40.344 31.5801 42.5168 25.9276 47.9999C30.0458 46.4979 39.3164 34.9748 41.5195 31.5442C40.2272 29.5319 38.5122 27.7673 36.4839 26.3491C35.8647 26.6539 35.2321 26.9361 34.5874 27.1946C31.8883 28.2768 28.9749 28.9443 25.9276 29.1172C25.4021 29.1471 24.8726 29.1622 24.3395 29.1622C23.8065 29.1622 23.277 29.1471 22.7514 29.1172C19.7035 28.9443 16.7894 28.2765 14.0898 27.1939Z" fill="white"/>
<rect x="12.9278" y="10.0675" width="22.8741" height="8.08988" rx="4.04494" fill="#162550"/>
<ellipse cx="30.6728" cy="14.0675" rx="1.49771" ry="1.48315" fill="#04FED1"/>
<ellipse cx="24.3184" cy="34.0224" rx="1.49771" ry="1.48315" fill="#162550"/>
<ellipse cx="18.3286" cy="14.0675" rx="1.49771" ry="1.48315" fill="#04FED1"/>
<ellipse cx="18.3286" cy="34.0224" rx="1.49771" ry="1.48315" fill="#162550"/>
<ellipse cx="30.3101" cy="34.0224" rx="1.49771" ry="1.48315" fill="#162550"/>
</svg>


</div> 
</div>


        </div>
        </>
    );
} 