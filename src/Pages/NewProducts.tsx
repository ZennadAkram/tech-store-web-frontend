import { useEffect, useState } from "react";
import { AddPanel } from "../components/Adds";
import { Navbar } from "../components/Navbar";
import { SupportAndMore } from "../components/supportandmore";
import { fetchListProducts,fetchfiltercategory } from "../API/ProductsAPI";
import type { ProductList } from "../types/ProductsList";
import Productcard from "../components/Productcard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductGrid } from "../components/ProductsGrid";
import { Brandbar } from "../components/brandsbar";
import { ChoiceBars } from "../components/choicebars";
import { useNavigate } from "react-router-dom";

export default function NewProducts() {
   const navigate = useNavigate();
  const goToProduct = () => navigate('/productspage/');
  const [products, setProducts] = useState<ProductList[]>([]);
  const [phones, setPhones] = useState<ProductList[]>([]);
  const [laptops, setLaptops] = useState<ProductList[]>([]);
  const [desktops, setDesktops] = useState<ProductList[]>([]);
  const [consoles, setConsoles] = useState<ProductList[]>([]);
  const [numslice, setnumslice] = useState<number>(2);
  const [startIndex, setStartIndex] = useState<number>(0);
   const FetchLaptops = async (category:string) => {
      try {
        const data = await fetchfiltercategory(category);
        setLaptops(data.results);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
     const FetchPhones = async (category:string) => {
      try {
        const data = await fetchfiltercategory(category);
        setPhones(data.results);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
     const FetchDesktop = async (category:string) => {
      try {
        const data = await fetchfiltercategory(category);
        setDesktops(data.results);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
     const FetchConsoles = async (category:string) => {
      try {
        const data = await fetchfiltercategory(category);
        setConsoles(data.results);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

  useEffect(() => {
    const testFetch = async () => {
      try {
        const data = await fetchListProducts(1);
        setProducts(data.results);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
         FetchLaptops("Laptops");
    FetchConsoles("Consoles");
    FetchPhones("Phones");
    FetchDesktop("Desktops");
    testFetch();
  }, []);

 

  useEffect(() => {
    const updateNums = () => {
      if (window.innerWidth >= 1024) {
        setnumslice(6);
      } else if (window.innerWidth >= 768) {
        setnumslice(4);
      } else {
        setnumslice(2);
      }
    };
    updateNums();
    window.addEventListener("resize", updateNums);
    return () => window.removeEventListener("resize", updateNums);
  }, []);


  useEffect(() => {
    if (startIndex > Math.max(0, products.length - numslice)) {
      setStartIndex(Math.max(0, products.length - numslice));
    }
  }, [numslice, products, startIndex]);

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + 1 > products.length - numslice ? prev : prev + 1
    );
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col px-3 items-center justify-start gap-4 lg:px-28">
        <AddPanel />
        {/* new products section*/}
        <div className="flex flex-col justify-start items-center gap-4 w-full">
          <div className="flex flex-row  justify-between items-center w-full">
            <h2 className=" font-bold text-2xl left-0">New Products</h2>
            <button onClick={goToProduct}
              className="hover:text-[#75a1fb] hover:border-b-[#75a1fb] text-[#0156FF] border-b border-b-[#0156FF] leading-4"
              
            >
              See All New Products
            </button>
          </div>
          <div className="relative flex flex-row justify-between w-full items-center ">
            {products
              .slice(startIndex, startIndex + numslice)
              .map((product) => (
                <div key={product.id}>
                  <Productcard
                   id={product.id}
                    name={product.name}
                    imageUrl={product.poster_image ?? undefined}
                    starting_price={Number(product.starting_price)}
                    description={product.description}
                    review_avg={product.average_rating ?? 0}
                    review_number={product.review_count}
                  />
                </div>
              ))}
            {/* Left Button */}
            {startIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-0 h-[50px] w-[36px] hover:bg-opacity-[90%] 
              rounded-tr-full rounded-br-full bg-[#666666] bg-opacity-[20%] text-white 
              top-1/2 -translate-y-1/2 flex justify-center items-center"
              >
                <ChevronLeft className="h-5 mr-2" />
              </button>
            )}

            {/* Right Button */}
            {startIndex + numslice < products.length && (
              <button
                onClick={handleNext}
                className="absolute right-0 h-[50px] w-[40px] hover:bg-opacity-[90%] 
              rounded-tl-full rounded-bl-full bg-[#666666] bg-opacity-[20%] text-white 
              top-1/2 -translate-y-1/2 flex justify-center items-center"
              >
                <ChevronRight className="h-5 ml-1" />
              </button>
            )}
          </div>
        </div>
         <div className="hidden md:pl-4 md:pt-4 md:block self-start">
    <ChoiceBars
      choices={["MSI", "HP", "Apple", "Costume"]}
       onChoiceSelect={(choice) =>FetchDesktop(choice)}
    />
  </div>
        <div className=" flex flex-col md:flex-row justify-start w-full">
       
               <div className="relative">
                       
              <img className="h-[120px] md:h-[350px] md:w-[230px] object-cover md:object-contain w-full" src="/images/image 1.png" alt="image 1" />
              
            <h2 className="absolute left-1/2 -translate-x-1/2 top-5  text-white font-bold text-2xl tracking-wide
            md:top-1/2 md:left-1/2
            ">Desktops</h2>
            <button onClick={goToProduct} className="absolute left-1/2 -translate-x-1/2 md:top-72  top-20 border-b hover:text-gray-400 hover:border-b-gray-400 leading-5 text-white" >See All Products</button>
            </div>
             <div className=" md:hidden">
    <ChoiceBars onChoiceSelect={(choice) =>FetchDesktop(choice)} choices={["MSI", "HP", "Apple", "Costume"]} />
  </div>
            <ProductGrid   products={desktops} slice={2} slicelg={5} slicemd={3}/>
        </div>
        <div className="hidden md:pl-4 md:pt-4 md:block self-start">
    <ChoiceBars
    onChoiceSelect={(choice) =>FetchDesktop(choice)}
      choices={["ASUS", "HP", "MSI", "Lenovo"]}
    />
  </div>
        <div className=" flex flex-col md:flex-row justify-start w-full">
            <div className="relative">
              <img className="h-[120px] md:h-[350px] md:w-[230px] object-cover md:object-contain w-full" 
              src="/images/image2.png" alt="image 2" />
            <h2 className="absolute left-1/2 -translate-x-1/2 top-5  text-white font-bold text-2xl tracking-wide
            md:top-1/2 md:left-1/2
            ">Laptops</h2>
            <button onClick={goToProduct}  className="absolute left-1/2 -translate-x-1/2 md:top-72  top-20 border-b hover:text-gray-400 hover:border-b-gray-400 leading-5 text-white" >See All Products</button>
            </div>
             <div className=" md:hidden">
    <ChoiceBars onChoiceSelect={(choice) =>FetchDesktop(choice)} choices={["ASUS", "HP", "MSI", "Lenovo"]} />
  </div>
            <ProductGrid  products={laptops} slice={2} slicelg={5} slicemd={3}/>
        </div>
        <div className="hidden md:pl-4 md:pt-4 md:block self-start">
    <ChoiceBars
      onChoiceSelect={(choice) =>FetchPhones(choice)}
      choices={["Samsung", "Apple", "Xiaomi", "Oppo"]}
    />
  </div>
        <div className=" flex flex-col md:flex-row  justify-start w-full">
            <div className="relative ">
              <img className="h-[120px] md:h-[350px] md:w-[230px] object-cover md:object-contain w-full"
               src="/images/image3.png" alt="image 4" />
            <h2 className="absolute left-1/2 -translate-x-1/2 top-5  text-white font-bold text-2xl tracking-wide
            md:top-1/2 md:left-1/2
            ">Phones  <br />Tablets</h2>
            <button onClick={goToProduct} className="absolute left-1/2 -translate-x-1/2 md:top-72  top-20 border-b hover:text-gray-400 hover:border-b-gray-400 leading-5 text-white" >See All Products</button>
            </div>
             <div className=" md:hidden">
    <ChoiceBars 
    onChoiceSelect={(choice) =>FetchPhones(choice)}
    choices={["PlayStation", "Xbox", "Nintendo", "Other"]} />
  </div>
            <ProductGrid  products={phones} slice={2} slicelg={5} slicemd={3}/>
        </div>
        <div className="hidden md:pl-4 md:pt-4 md:block self-start">
    <ChoiceBars
    onChoiceSelect={(choice) =>FetchConsoles(choice)}
      choices={["PlayStation", "Xbox", "Nintendo", "Other"]}
    />
  </div>
        <div className=" flex flex-col md:flex-row justify-start w-full">
            <div className="relative">
              <img className="h-[120px] md:h-[350px] md:w-[230px] object-cover md:object-contain w-full" 
              src="/images/image.png" alt="image 1" />
            <h2 className="absolute left-1/2 -translate-x-1/2 top-5  text-white font-bold text-2xl tracking-wide
            md:top-1/2 md:left-1/2
            ">Consols</h2>
            <button onClick={goToProduct} className="absolute left-1/2 -translate-x-1/2 md:top-72  top-20 border-b hover:text-gray-400 hover:border-b-gray-400 leading-5 text-white" >See All Products</button>
            </div>
             <div className=" md:hidden">
    <ChoiceBars 
    onChoiceSelect={(choice) =>FetchConsoles(choice)}
    choices={["MSI GS Series", "MSI GT Series", "MSI GF Series", "MSI GR Series"]} />
  </div>
            <ProductGrid  products={consoles} slice={2} slicelg={5} slicemd={3}/>
        </div>
        <div className="w-full  mt-[-17px] "> <Brandbar /></div>
       
      </div>
      
      <SupportAndMore />
    </>
  );
}