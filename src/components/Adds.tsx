import { addslist } from "../API/AddsAPI";
import { useEffect, useState } from "react";
import type { Adds } from "../types/Adds";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function AddPanel() {
  const [add, setadd] = useState<Adds[]>([]);
  const [num, setnum] = useState<number>(0);

  const imageprev = () => {
    setnum((prev) => (prev - 1 + add.length) % add.length);
  };

  const imagenext = () => {
    setnum((prev) => (prev + 1) % add.length);
  };

  // Fetch ads on mount
  useEffect(() => {
    const fetchadds = async () => {
      try {
        const data = await addslist(1);
        setadd(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchadds();
  }, []);

  // Auto-switch ad every 5 seconds
  useEffect(() => {
    if (add.length === 0) return;

    const interval = setInterval(() => {
      setnum((prev) => (prev + 1) % add.length);
    }, 5000);

    return () => clearInterval(interval); // Clean up on unmount
  }, [add]);

  return (
    <>
      {add.length > 0 && (
        <div className="relative w-full h-32 mt-4 lg:mt-0 md:h-40 lg:h-52 bg-white overflow-hidden ">
          {/* Fade-in Ad Image */}
          <img
            key={num} // triggers re-render + fade
            src={add[num].image}
            alt="Ad"
            className="w-full h-full  absolute top-0 left-0 transition-opacity duration-500 opacity-100"
          />

          {/* Left Button */}
          <button
            onClick={imageprev}
            className="absolute left-0 h-[50px] w-[36px] hover:bg-opacity-[90%] 
              rounded-tr-full rounded-br-full bg-[#252931] bg-opacity-[50%] text-white 
              top-1/2 -translate-y-1/2 flex justify-center items-center"
          >
            <ChevronLeft className="h-5 mr-2" />
          </button>

          {/* Right Button */}
          <button
            onClick={imagenext}
            className="absolute right-0 h-[50px] w-[40px] hover:bg-opacity-[90%] 
              rounded-tl-full rounded-bl-full bg-[#252931] bg-opacity-[50%] text-white 
              top-1/2 -translate-y-1/2 flex justify-center items-center"
          >
            <ChevronRight className="h-5 ml-1" />
          </button>
        </div>
      )}
    </>
  );
}
