import { XIcon, Search} from "lucide-react";
import { useEffect, useState } from "react";
import { Navbardesk } from "./Navbarcompdesktop";
import { useAuthStore } from "../features/auth/authStore";
import { cartitemcounter } from "../API/CartAPI";
import type { Cart } from "../types/Cart";
import { Carthover } from "./Carthover";
import { useNavigate } from "react-router-dom";



export function Navbar({ cart }: { cart: Cart | null }) {
  const navigate =useNavigate();
  const [items,setitems]=useState<number>(0)
   const [showthecart,setshowthecart]=useState<boolean>(false);
useEffect(()=>{
const counter = async () =>{
  try{
   const data=await cartitemcounter();
   setitems(data.total_items);
   if(cart!==null){
    setitems(cart.items.length)
   }
  }catch(error){
    console.error(error)
  }
}
counter();
},[cart])
const user = useAuthStore((state) => state.user);


  const [toggle, setToggle] = useState<boolean>(false);

const handleToggle = () => {
  setToggle((prev) => !prev);
};
    return (
    //header
    <>
    <div className="lg:top-0 lg:sticky lg:z-50">
      <div className=" h-9 w-[15%] flex justify-center items-center ml-4 bg-blue-600 md:w-[9%] md:h-10 rounded-t-full lg:hidden "> <svg className="mt-2" width="46" height="41" viewBox="0 0 46 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.7474 8.28638L13.6902 14.1799V21.4334L22.7474 27.3268L30.0131 22.7934V24.9468L22.7474 29.7069L13.6902 23.7001V26.3068L22.7474 32.087L31.8047 26.3068V19.0533L24.539 23.7001V21.4334L31.8047 16.6733V14.1799L22.7474 8.28638Z" fill="white"/>
</svg>
</div>
    
    <div className="relative group h-16 px-4 flex flex-row items-center justify-between lg:justify-evenly border-b-[0.4px] border-b-gray-300 bg-blue-600 lg:bg-white">
        {toggle && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              onClick={handleToggle}
            />
            {/* Sidebar */}
            <nav
               className={`
    fixed top-0 left-0 h-full w-[70%] bg-white z-50 py-6 px-4 flex flex-col gap-5
     transition duration-700 ease-in-out
    ${toggle ? "translate-x-0" : "-translate-x-full"}
    lg:hidden
  `}
            >
              <div className="flex justify-between items-center border-b-[0.4px] border-b-gray-300">
                {/* Logo */}
                <svg className="ml-[-20px]" width="71" height="57" viewBox="0 0 71 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M35.11 11.52L21.1304 19.7134V29.7975L35.11 37.9909L46.3245 31.6883V34.6821L35.11 41.2998L21.1304 32.9488V36.5728L35.11 44.6086L49.0897 36.5728V26.4887L37.8752 32.9488V29.7975L49.0897 23.1798V19.7134L35.11 11.52Z" fill="#0156FF"/>
                </svg>
                <button onClick={handleToggle}><XIcon /></button>
              </div>
              {/* Sidebar links */}
              <a href="#" className="hover:text-gray-500 text-black font-bold text-[14px]">Phones</a>
              <a href="#" className="hover:text-gray-500 text-black font-bold text-[14px]">Laptops</a>
              <a href="#" className="hover:text-gray-500 text-black font-bold text-[14px]">Tablets</a>
              <a href="#" className="hover:text-gray-500 text-black font-bold text-[14px]">Desktop PCs</a>
              <a href="#" className="hover:text-gray-500 text-black font-bold text-[14px]">Networking Devices</a>
              <a href="#" className="hover:text-gray-500 text-black font-bold text-[14px]">Printers and Scanners</a>
              <a href="#" className="hover:text-gray-500 text-black font-bold text-[14px]">PC Parts</a>
              <a href="#" className="hover:text-gray-500 text-black font-bold text-[14px]">All Other Products</a>
              <button className="w-[150px] flex bg-white h-7 items-center justify-center border-blue-500 border-[2px] rounded-2xl hover:bg-blue-100 text-blue-500 font-bold text-[12px] lg:px-4 lg:py-2">Our Deals</button>
            </nav>
          </>
        )}
     <button onClick={handleToggle}><svg className=" lg:hidden" width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 4H21" stroke="white" stroke-width="2.4" stroke-linecap="round"/>
<path d="M4 10H21" stroke="white" stroke-width="2.4" stroke-linecap="round"/>
<path d="M4 16H21" stroke="white" stroke-width="2.4" stroke-linecap="round"/>
</svg></button>
<div className="mr-6 relative w-[65%] ml-10 lg:hidden">
  <input
    type="text"
    className=" focus:outline-blue-600 w-full border border-gray-300 p-2 pl-10 rounded-3xl"
    placeholder="Search Here"
  />
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
</div>
<div className="relative w-auto">
  <div className={`lg:hidden absolute right-[19px] bottom-[20px]
    lg:bg-[#0156FF] bg-white h-[16px] w-[16px] flex justify-center items-center rounded-full text-xs text-[#0156FF] lg:text-white 
    font-semibold
    ${(items > 0) ? "block":"hidden"}`}>
    {items}
  </div>
  <svg onClick={()=>navigate('/cart/')} className="cursor-pointer mr-6" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8771 23.2138C16.4786 23.2138 17.0555 22.9748 17.4809 22.5494C17.9062 22.1241 18.1452 21.5472 18.1452 20.9456C18.1452 20.3441 17.9062 19.7672 17.4809 19.3418C17.0555 18.9164 16.4786 18.6775 15.8771 18.6775C15.2755 18.6775 14.6986 18.9164 14.2732 19.3418C13.8479 19.7672 13.6089 20.3441 13.6089 20.9456C13.6089 21.5472 13.8479 22.1241 14.2732 22.5494C14.6986 22.9748 15.2755 23.2138 15.8771 23.2138ZM7.93855 23.2138C8.5401 23.2138 9.11701 22.9748 9.54237 22.5494C9.96773 22.1241 10.2067 21.5472 10.2067 20.9456C10.2067 20.3441 9.96773 19.7672 9.54237 19.3418C9.11701 18.9164 8.5401 18.6775 7.93855 18.6775C7.337 18.6775 6.76009 18.9164 6.33473 19.3418C5.90937 19.7672 5.67041 20.3441 5.67041 20.9456C5.67041 21.5472 5.90937 22.1241 6.33473 22.5494C6.76009 22.9748 7.337 23.2138 7.93855 23.2138ZM22.7246 7.24942C23.0077 7.24029 23.2762 7.12141 23.4732 6.91792C23.6702 6.71442 23.7804 6.44227 23.7804 6.15901C23.7804 5.87576 23.6702 5.60361 23.4732 5.40011C23.2762 5.19662 23.0077 5.07773 22.7246 5.0686H21.4193C20.3963 5.0686 19.5118 5.77853 19.2895 6.77652L17.8685 13.175C17.6462 14.1729 16.7616 14.8829 15.7387 14.8829H7.21955L5.58422 8.33927H16.1821C16.4626 8.32647 16.7273 8.20606 16.9212 8.00307C17.1151 7.80009 17.2234 7.53016 17.2234 7.24942C17.2234 6.96869 17.1151 6.69876 16.9212 6.49577C16.7273 6.29279 16.4626 6.17238 16.1821 6.15958H5.58422C5.25269 6.15948 4.9255 6.23497 4.62753 6.38031C4.32956 6.52565 4.06864 6.73701 3.86462 6.99832C3.6606 7.25964 3.51884 7.56403 3.45012 7.88836C3.3814 8.21268 3.38753 8.54841 3.46804 8.87001L5.10337 15.4113C5.22126 15.8833 5.49359 16.3024 5.87704 16.6018C6.2605 16.9012 6.73305 17.0638 7.21955 17.0637H15.7387C16.7312 17.0638 17.6942 16.7254 18.4684 16.1044C19.2426 15.4833 19.7819 14.6168 19.9971 13.6479L21.4193 7.24942H22.7246Z" fill="white"/>
</svg>
</div>
<div className="lg:hidden w-8 h-8 rounded-full cursor-pointer bg-gray-300">
        <img className="h-8 w-8  rounded-full" src={user?.image ?? ""} alt="user" />
       </div>

    {/* nav bar and logo */}

    

    <div className="lg:flex space-x-12 items-center justify-center ">
      <div>
      <svg className="hidden lg:block cursor-pointer" width="34" height="41" viewBox="0 0 34 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.0333 0.945374L0.297119 10.8637V23.0708L17.0333 32.9891L30.459 25.3596V28.9836L17.0333 36.9946L0.297119 26.8855V31.2725L17.0333 41L33.7695 31.2725V19.0653L20.3438 26.8855V23.0708L33.7695 15.0599V10.8637L17.0333 0.945374Z" fill="#0156FF"/>
     </svg>
      </div>
      <nav className=" hidden lg:flex lg:space-x-4 ">
  {/* Navbardesk dropdown - hidden until hover */}
 <div className="absolute top-full  left-1/2 transform -translate-x-1/2 z-50 hidden group-hover:block">
  
  {/* <Navbardesk /> */}
</div>


  {/* Hoverable links */}
  <a href="#" className="text-black font-bold text-[14px]">Phones</a>
  <a href="#" className="text-black font-bold text-[14px]">Laptops</a>
  <a href="#" className="text-black font-bold text-[14px]">Tablets</a>
  <a href="#" className="text-black font-bold text-[14px]">Desktop PCs</a>
  <a href="#" className="text-black font-bold text-[14px]">Networking Devices</a>
  <a href="#" className="text-black font-bold text-[14px]">Printers and Scanners</a>
  <a href="#" className="text-black font-bold text-[14px]">PC Parts</a>
  <a href="#" className="text-black font-bold text-[14px]">All Other Products</a>
</nav>

       <button className="hidden lg:flex  bg-white h-7 items-center justify-center border-blue-500 border-[2px] rounded-2xl hover:bg-blue-100 text-blue-500 font-bold text-[12px] lg:px-4 lg:py-2">Our Deals</button>
    </div>
     {/* cart logo and profile picture */}
     <div className="lg:flex space-x-4 items-center">

       <svg className="hidden lg:block cursor-pointer  bg-white hover:bg-gray-200"  width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.60474 1.11121C11.1317 1.13658 12.6039 1.704 13.7542 2.71863C14.9811 3.80099 15.7498 5.31046 15.9036 6.93933L15.925 7.245C15.9947 8.74054 15.5377 10.2146 14.634 11.4139L17.968 14.7469L18.0266 14.8114C18.0822 14.8791 18.1277 14.9548 18.1614 15.036L18.1907 15.119C18.2161 15.2028 18.2297 15.29 18.2297 15.3778C18.2297 15.4657 18.2161 15.5528 18.1907 15.6366L18.1614 15.7196C18.1165 15.8277 18.0508 15.9259 17.968 16.0087C17.9059 16.0708 17.8352 16.1236 17.7581 16.1649L17.679 16.202C17.5707 16.2469 17.4543 16.2694 17.3372 16.2694C17.2493 16.2694 17.1621 16.2567 17.0784 16.2313L16.9954 16.202C16.9144 16.1684 16.8393 16.1227 16.7717 16.0673L16.7063 16.0087L13.3733 12.6747C12.174 13.5809 10.6985 14.0394 9.20142 13.9706L8.89575 13.9491C7.36752 13.8057 5.94447 13.121 4.88013 12.0243L4.67212 11.7997C3.58905 10.5718 3.01496 8.97713 3.06665 7.3407L3.08325 7.03406C3.20429 5.51056 3.86523 4.07568 4.95142 2.99109L5.17212 2.78015C6.30282 1.75342 7.76586 1.1606 9.29907 1.11316L9.60474 1.11121ZM9.50903 2.91882C8.35895 2.92351 7.25384 3.35335 6.40552 4.12195L6.2395 4.28015C5.37213 5.14755 4.88317 6.32302 4.87817 7.54968C4.87324 8.77628 5.35288 9.95557 6.21313 10.83L6.37817 10.9891C6.77247 11.3522 7.22696 11.6448 7.72192 11.8534L7.93579 11.9374C8.43947 12.1209 8.97181 12.2164 9.50903 12.2186L9.73853 12.2137C10.2739 12.1895 10.8015 12.0725 11.2981 11.868C11.8657 11.6343 12.3816 11.2903 12.8157 10.8563C13.2497 10.4223 13.5936 9.90633 13.8274 9.33875L13.9094 9.12488C14.0633 8.69178 14.1523 8.23831 14.1731 7.77917L14.178 7.54968C14.1758 7.01248 14.0803 6.4801 13.8967 5.97644L13.8127 5.76257C13.6041 5.26759 13.3115 4.81313 12.9485 4.41882L12.7893 4.25378C11.9149 3.3935 10.7357 2.91387 9.50903 2.91882Z" fill="black" stroke="black" stroke-width="0.2"/>
</svg>
       
<div className="hidden lg:block relative ">
  <div className={`hidden  absolute left-[16px] bottom-[16px]
    lg:bg-[#0156FF] bg-white h-[16px] w-[16px] lg:flex justify-center items-center rounded-full text-xs text-[#0156FF] lg:text-white 
    font-semibold
    ${items  > 0 ? "block":"lg:hidden"}`}>
    {items}
  </div>
  <svg 
  onClick={()=>setshowthecart(!showthecart)}
  className="hidden lg:block cursor-pointer bg-white hover:bg-gray-200" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5834 20.8334C15.1359 20.8334 15.6658 20.6139 16.0566 20.2232C16.4473 19.8325 16.6667 19.3026 16.6667 18.75C16.6667 18.1975 16.4473 17.6676 16.0566 17.2769C15.6658 16.8862 15.1359 16.6667 14.5834 16.6667C14.0309 16.6667 13.501 16.8862 13.1103 17.2769C12.7196 17.6676 12.5001 18.1975 12.5001 18.75C12.5001 19.3026 12.7196 19.8325 13.1103 20.2232C13.501 20.6139 14.0309 20.8334 14.5834 20.8334ZM7.29174 20.8334C7.84428 20.8334 8.37418 20.6139 8.76488 20.2232C9.15558 19.8325 9.37508 19.3026 9.37508 18.75C9.37508 18.1975 9.15558 17.6676 8.76488 17.2769C8.37418 16.8862 7.84428 16.6667 7.29174 16.6667C6.73921 16.6667 6.20931 16.8862 5.81861 17.2769C5.4279 17.6676 5.20841 18.1975 5.20841 18.75C5.20841 19.3026 5.4279 19.8325 5.81861 20.2232C6.20931 20.6139 6.73921 20.8334 7.29174 20.8334ZM20.873 6.16981C21.133 6.16142 21.3796 6.05223 21.5606 5.86531C21.7416 5.6784 21.8428 5.42842 21.8428 5.16825C21.8428 4.90807 21.7416 4.6581 21.5606 4.47118C21.3796 4.28427 21.133 4.17507 20.873 4.16669H19.674C18.7345 4.16669 17.922 4.81877 17.7178 5.73544L16.4126 11.6125C16.2084 12.5292 15.3959 13.1813 14.4563 13.1813H6.63133L5.12924 7.17085H14.8636C15.1212 7.1591 15.3644 7.0485 15.5425 6.86205C15.7206 6.67561 15.82 6.42767 15.82 6.16981C15.82 5.91195 15.7206 5.66401 15.5425 5.47757C15.3644 5.29113 15.1212 5.18052 14.8636 5.16877H5.12924C4.82473 5.16868 4.5242 5.23802 4.25051 5.37151C3.97682 5.50501 3.73716 5.69915 3.54976 5.93917C3.36236 6.17919 3.23215 6.45878 3.16903 6.75668C3.10591 7.05458 3.11154 7.36295 3.1855 7.65835L4.68758 13.6667C4.79586 14.1002 5.046 14.4851 5.39821 14.7601C5.75042 15.0351 6.18447 15.1845 6.63133 15.1844H14.4563C15.368 15.1845 16.2524 14.8737 16.9636 14.3032C17.6748 13.7328 18.1701 12.9369 18.3678 12.0469L19.674 6.16981H20.873Z" fill="black"/>
</svg>
<div className="relative">
  <div className={`absolute  w-[40vh]  -right-14 z-[99] top-5 ${showthecart ? "block" : "hidden"}`}>
    <Carthover />
  </div>
</div>


</div>

       <div className="lg:w-8 lg:h-8 lg:rounded-full lg:cursor-pointer lg:bg-gray-300">
        <img className="hidden lg:block lg:rounded-full" src={user?.image ?? ""} alt="user" />
       </div>
     </div>
    </div>
    </div>
    </>
  );
}
    