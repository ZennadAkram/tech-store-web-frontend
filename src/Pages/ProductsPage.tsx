import { useEffect, useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import { SupportAndMore } from "../components/supportandmore";
import type { Brand, ProductList } from "../types/ProductsList";
import { fetchListProducts,fetchfiltercategory,fetchfilterbrand, sortproducts, filterproducts } from "../API/ProductsAPI";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SortDropdown } from "../components/Dropdown";
import Productcard from "../components/Productcard";
import { Filtertext } from "../components/filtertext";
import { pricecounter } from "../API/PricecountAPI";
import type { Pricecount } from "../types/Pricecount";
import { categorycount } from "../API/CategorycountAPI";
import type { Categorycount } from "../types/Categorycount";
import { Filterprice } from "../components/Pricesfilter";
import { brandlist } from "../API/BrandListAPI";
import Productcardhorizen from "../components/Horizenalcomp";

type SelectedFilters = {
  category?: string;
  brand?: string;
  price_range?: string;
};

export function ProductsPage() {
  const [products, setproducts] = useState<ProductList[]>([]);
  const [selected, setSelected] = useState("");
  const [count, setCount] = useState<number>(0);
  const [productcounter, setproductcounter] = useState<number>(0);
  const [categoryopen, setcategoryopen] = useState<boolean>(false);
  const [priceopen, setpriceopen] = useState<boolean>(false);
  const [coloropen, setcoloropen] = useState<boolean>(false);
  const [brandopen, setbrandopen] = useState<boolean>(false);
  const [pricerange, setpricerange] = useState<Pricecount[]>([]);
  const prices = ["0-50", "51-100", "101-200", "200-500"];
  const [categoriescount, setcategoriescount] = useState<Categorycount[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [_, forceRefresh] = useState(false);
  const selectedfilterRef = useRef<SelectedFilters>({});
  const [totalpage, settotalpage] = useState<number>(0);
  const [selectedpage, setselectedpage] = useState<number>(1);
  const [chosencategory, setchosencategory] = useState<boolean[]>([]);
  const [chosenprice, setchosenprice] = useState<boolean[]>([]);
  const [horizenal, sethorizenal] = useState<boolean>(false);
  const [color1, setcolor1] = useState<string>("black");
  const [color2, setcolor2] = useState<string>("#A2A6B0");

  useEffect(() => {
    const fetchbrand = async () => {
      try {
        const data = await brandlist(1);
        setBrands(data.results);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchbrand();
  }, []);

  useEffect(() => {
    const fetchSorted = async () => {
      try {
        if (selected) {
          const data = await sortproducts(selected);
          setproducts(data.results);
          setCount(data.count);
        }
      } catch (error) {
        console.error("Sorting error:", error);
      }
    };
    fetchSorted();
  }, [selected]);

  const fetchcategorycount = async () => {
    try {
      const data = await categorycount();
      setcategoriescount(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchprices = async (price: string[]) => {
    try {
      const data = await pricecounter(price);
      setpricerange(data.counts);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchlistproducts = async (page: number) => {
    try {
      const data = await fetchListProducts(page);
      setproducts(data.results);
      setCount(data.count);
      console.log("the products",products)
    } catch (error) {
      console.error(error);
    }
  };

  const fetchlistproductsbrand = async (brand: string) => {
    try {
      const data = await fetchfilterbrand(brand);
      setproducts(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchcategoryproducts = async (category: string) => {
    try {
      const data = await fetchfiltercategory(category);
      setproducts(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (categoriescount.length > 0) {
      setchosencategory(new Array(categoriescount.length).fill(false));
    }
  }, [categoriescount]);

  useEffect(() => {
    if (pricerange.length > 0) {
      setchosenprice(new Array(pricerange.length).fill(false));
    }
  }, [pricerange]);

  const handlepriceselect = (index: number, name: string) => {
    setchosenprice(prev => {
      const updated = [...prev];
      updated[index] = !prev[index];

      if (updated[index]) {
        selectedfilterRef.current = {
          ...selectedfilterRef.current,
          price_range: name
        };
      } else {
        const { price_range, ...rest } = selectedfilterRef.current;
        selectedfilterRef.current = rest;
      }
      
      return updated;
    });
  };

  const handleUnselect = (index: number, name: string) => {
    setchosencategory(prev => {
      const updated = [...prev];
      updated[index] = !prev[index];

      if (updated[index]) {
        selectedfilterRef.current = {
          ...selectedfilterRef.current,
          category: name
        };
      } else {
        const { category, ...rest } = selectedfilterRef.current;
        selectedfilterRef.current = rest;
      }
      
      return updated;
    });
  };

  const handleBrandSelect = (brand: string) => {
    if (selectedfilterRef.current.brand === brand) {
      const { brand, ...rest } = selectedfilterRef.current;
      selectedfilterRef.current = rest;
    } else {
      selectedfilterRef.current = {
        ...selectedfilterRef.current,
        brand: brand
      };
    }
    forceRefresh(prev => !prev);
  };

  useEffect(() => {
    if (Object.keys(selectedfilterRef.current).length === 0) {
      fetchlistproducts(1);
      setproductcounter(productcounter + products.length);
      settotalpage(Math.ceil(count / 10));
    }
    settotalpage(Math.ceil(count / 10));
    fetchprices(prices);
    fetchcategorycount();
  }, [count]);

  const getDynamicPages = () => {
    const windowSize = 3;
    const buffer = 2;
    const pages: number[] = [];
    const maxStart = totalpage - windowSize - buffer + 1;
    const start = Math.max(1, Math.min(selectedpage - 1, maxStart));

    for (let i = 0; i < windowSize; i++) {
      const page = start + i;
      if (page < totalpage - 1) {
        pages.push(page);
      }
    }

    return pages;
  };

  const buildFilterQuery = (filters: SelectedFilters): string => {
    const queryParams: string[] = [];
    
    if (filters.category) {
      queryParams.push(`category=${filters.category}`);
    }
    if (filters.brand) {
      queryParams.push(`brand=${filters.brand}`);
    }
    if (filters.price_range) {
      queryParams.push(`price_range=${filters.price_range}`);
    }
    
    return queryParams.join('&');
  };

  const showEllipsis = () => {
    const lastDynamicPage = getDynamicPages().slice(-1)[0];
    return lastDynamicPage < totalpage - 2;
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full gap-4 lg:px-20">
        <div className="hidden md:block md:w-full">
          <img className="w-full md:h-28" src="/images/asus-poster.png" alt="asus-poster" />
        </div>
        <div className="flex flex-row w-full justify-between items-center">
          <h1 className="text-2xl font-bold px-3 pt-5">All Products</h1>
        </div>
        <div className="md:flex md:flex-row w-full md:p-3">


          <div className={`hidden bg-white md:flex md:flex-col gap-2 sticky top-0 h-[100vh] overflow-y-auto ${horizenal === false ? "w-[250px]" : "w-1/2 lg:w-full "}`}>
            <div className="hidden mt-3 md:flex md:flex-col items-center gap-3 p-5 md:bg-[#F5F7FF] md:w-full">
              <h2 className="font-bold text-lg">Filters</h2>
              <button 
                className="text-[#A2A6B0] font-semibold border-2 w-full py-1 hover:bg-slate-200 border-[#A2A6B0] rounded-3xl"
                onClick={() => {
                  selectedfilterRef.current = {};
                  forceRefresh(prev => !prev);
                }}
              >
                Clear Filter
              </button>

              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-row items-center justify-between w-full">
                  <h4 className="font-bold">Category</h4>
                  {categoryopen ? (
                    <button onClick={() => setcategoryopen(!categoryopen)}>
                      <ChevronUp className="h-5" />
                    </button>
                  ) : (
                    <button onClick={() => setcategoryopen(!categoryopen)}>
                      <ChevronDown className="h-5" />
                    </button>
                  )}
                </div>
                <div className={`flex flex-col gap-2 ${categoryopen ? "block" : "hidden"}`}>
                  {categoriescount.map((categoryfilter, index) => (
                    <button
                      key={index}
                      onClick={() => handleUnselect(index, categoryfilter.name)}
                    >
                      <Filtertext
                        name={categoryfilter.name}
                        num={categoryfilter.product_count}
                        index={index}
                       
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col w-full gap-3">
                <div className="flex flex-row items-center justify-between w-full">
                  <h4 className="font-bold">Price</h4>
                  {priceopen ? (
                    <button onClick={() => setpriceopen(!priceopen)}>
                      <ChevronUp className="h-5" />
                    </button>
                  ) : (
                    <button onClick={() => setpriceopen(!priceopen)}>
                      <ChevronDown className="h-5" />
                    </button>
                  )}
                </div>
                <div className={`flex flex-col gap-2 pr-2 ${priceopen ? "block" : "hidden"}`}>
                  {pricerange.map((price, index) => (
                    <button
                      key={index}
                      onClick={() => handlepriceselect(index, price.range)}
                    >
                      <Filterprice
                        name={price.range}
                        num={price.count}
                        index={index}
                        
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col w-full">
                <div className="flex flex-row items-center justify-between w-full">
                  <h4 className="font-bold">Color</h4>
                  {coloropen ? (
                    <button onClick={() => setcoloropen(!coloropen)}>
                      <ChevronUp className="h-5" />
                    </button>
                  ) : (
                    <button onClick={() => setcoloropen(!coloropen)}>
                      <ChevronDown className="h-5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="md:hidden flex flex-col w-full">
                <div className="flex flex-row items-center justify-between w-full">
                  <h4 className="font-bold">Brand</h4>
                  {brandopen ? (
                    <button onClick={() => setbrandopen(!brandopen)}>
                      <ChevronUp className="h-5" />
                    </button>
                  ) : (
                    <button onClick={() => setbrandopen(!brandopen)}>
                      <ChevronDown className="h-5" />
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={async () => {
                  try {
                    const filterString = buildFilterQuery(selectedfilterRef.current);
                    const data = await filterproducts(filterString);
                    setproducts(data.results);
                    setCount(data.count);
                  } catch (error) {
                    console.error("Filter error:", error);
                  }
                }}
                className="w-full font-semibold hover:bg-[#4480f8] text-white bg-[#0156FF] rounded-3xl py-2"
              >
                Apply Filters ({Object.keys(selectedfilterRef.current).length})
              </button>
            </div>

            <div className="flex flex-col items-center gap-4 p-5 bg-[#F5F7FF] w-full">
              <h3 className="font-bold text-xl text-black">Brands</h3>
              <button
                className="text-[#A2A6B0] font-semibold border-2 w-full py-1 hover:bg-slate-200 border-[#A2A6B0] rounded-3xl"
                onClick={() => {
                  const { brand, ...rest } = selectedfilterRef.current;
                  selectedfilterRef.current = rest;
                  forceRefresh(prev => !prev);
                }}
              >
                All Brands
              </button>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {brands.map((brand) => (
                <button
                  onClick={() => handleBrandSelect(brand.name)}
                  key={brand.name}
                  className={`cursor-pointer flex justify-center items-center w-full h-full bg-white hover:brightness-[100%] hover:contrast-[83%] hover:opacity-90 transition-colors duration-300 ${
                    selectedfilterRef.current.brand === brand.name ? 'border-2 border-blue-500' : ''
                  }`}
                >
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-[80px] md:max-h-[50px] object-contain transition duration-300"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 p-3">
            <div className="relative flex flex-row w-full justify-between md:justify-end items-center">
              <button className="hover:bg-slate-100 w-[47%] border-[3px] border-[#CACDD8] text-base font-semibold flex justify-center items-center h-11 rounded-md md:hidden">
                Filter
              </button>
              <h3 className="absolute left-0 hidden md:block font-[500] text-lg text-[#A2A6B0]">
                Items {productcounter <= 10 ? 1 : products.length}-{productcounter} of {count}
              </h3>
              <div className="hover:bg-slate-100 w-[47%] md:w-[36%]">
                <SortDropdown selected={selected} setSelected={setSelected} />
              </div>
              <svg
                onClick={() => { sethorizenal(false); setcolor1("black"); setcolor2("#A2A6B0"); }}
                className="hidden md:block cursor-pointer"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" fill="white" />
                <rect x="10" y="10.0002" width="4.76202" height="4.76202" fill={color1} />
                <rect x="10.0001" y="17.6189" width="4.76202" height="4.76203" fill={color1} />
                <rect x="10.0001" y="25.2383" width="4.76202" height="4.76202" fill={color1} />
                <rect x="17.6185" y="17.6189" width="4.76202" height="4.76203" fill={color1} />
                <rect x="17.6185" y="25.2383" width="4.76202" height="4.76202" fill={color1} />
                <rect x="17.6185" y="9.99976" width="4.76202" height="4.76202" fill={color1} />
                <rect x="25.238" y="17.6189" width="4.76202" height="4.76203" fill={color1} />
                <rect x="25.238" y="25.2383" width="4.76202" height="4.76202" fill={color1} />
                <rect x="25.238" y="9.99976" width="4.76202" height="4.76202" fill={color1} />
              </svg>
              <svg
                onClick={() => { sethorizenal(true); setcolor1("#A2A6B0"); setcolor2("black"); }}
                className="hidden md:block cursor-pointer"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" fill="white" />
                <rect x="9" y="25.3335" width="8.80966" height="2.6429" fill={color2} />
                <rect x="9" y="13" width="21.1432" height="2.6429" fill={color2} />
                <rect x="9" y="19.1667" width="15.8574" height="2.6429" fill={color2} />
              </svg>
            </div>

            <h3 className="md:hidden font-[500] text-lg text-[#A2A6B0]">
              Items {productcounter <= 10 ? 1 : products.length}-{productcounter} of {count}
            </h3>

           <div className={`flex flex-row items-center px-5 gap-3 flex-wrap ${
  Object.keys(selectedfilterRef.current).length === 0 ? "hidden" : "flex"
}`}>
  {/* Category Filter */}
  {selectedfilterRef.current.category && (
    <div className="flex flex-row items-center rounded-sm border-2 gap-2 justify-center px-4 h-11">
      <span className="text-lg font-semibold">{selectedfilterRef.current.category}</span>
      <button 
        onClick={() => {
          // Update filter ref
          const { category, ...rest } = selectedfilterRef.current;
          selectedfilterRef.current = rest;
          
          // Update category selection state
          const categoryIndex = categoriescount.findIndex(c => c.name === category);
          if (categoryIndex >= 0) {
            const updatedCategorySelection = [...chosencategory];
            updatedCategorySelection[categoryIndex] = false;
            setchosencategory(updatedCategorySelection);
          }
          
          forceRefresh(prev => !prev);
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="10" fill="#C94D3F"/>
          <path d="M7 7L13.5 13.5" stroke="white" strokeLinecap="round"/>
          <path d="M13.5 7L7 13.5" stroke="white" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )}

  {/* Brand Filter */}
  {selectedfilterRef.current.brand && (
    <div className="flex flex-row items-center rounded-sm border-2 gap-2 justify-center px-4 h-11">
      <span className="text-lg font-semibold">{selectedfilterRef.current.brand}</span>
      <button 
        onClick={() => {
          // Update filter ref
          const { brand, ...rest } = selectedfilterRef.current;
          selectedfilterRef.current = rest;
          
          // Note: No need to update brand selection state since we don't track it like categories
          forceRefresh(prev => !prev);
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="10" fill="#C94D3F"/>
          <path d="M7 7L13.5 13.5" stroke="white" strokeLinecap="round"/>
          <path d="M13.5 7L7 13.5" stroke="white" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )}

  {/* Price Range Filter */}
  {selectedfilterRef.current.price_range && (
    <div className="flex flex-row items-center rounded-sm border-2 gap-2 justify-center px-4 h-11">
      <span className="text-lg font-semibold">
        ${selectedfilterRef.current.price_range.split('-')[0]}-${selectedfilterRef.current.price_range.split('-')[1]}
      </span>
      <button 
        onClick={() => {
          // Update filter ref
          const { price_range, ...rest } = selectedfilterRef.current;
          selectedfilterRef.current = rest;
          
          // Update price selection state
          const priceIndex = pricerange.findIndex(p => p.range === price_range);
          if (priceIndex >= 0) {
            const updatedPriceSelection = [...chosenprice];
            updatedPriceSelection[priceIndex] = false;
            setchosenprice(updatedPriceSelection);
          }
          
          forceRefresh(prev => !prev);
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="10" fill="#C94D3F"/>
          <path d="M7 7L13.5 13.5" stroke="white" strokeLinecap="round"/>
          <path d="M13.5 7L7 13.5" stroke="white" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )}

  {/* Clear All Button */}
  <button 
    className="text-lg font-semibold rounded-sm border-2 h-11 px-4" 
    onClick={() => {
      // Clear all filters
      selectedfilterRef.current = {};
      
      // Reset all selection states
      setchosencategory(new Array(categoriescount.length).fill(false));
      setchosenprice(new Array(pricerange.length).fill(false));
      fetchlistproducts(1);
      forceRefresh(prev => !prev);
    }}
  >
    Clear All
  </button>
</div>

            <div className={`${horizenal === false ? "grid grid-cols-2 w-full lg:gap-0 gap-5 md:grid-cols-3 lg:grid-cols-5" : "flex flex-col gap-4"}`}>
              {horizenal ? (
                products.map((product) => (
                  <div key={product.id}>
                    <Productcardhorizen
                      name={product.name}
                      imageUrl={product.poster_image ?? undefined}
                      starting_price={Number(product.starting_price)}
                      description={product.description}
                      review_avg={product.average_rating ?? 0}
                      review_number={product.review_count}
                    />
                  </div>
                ))
              ) : (
                products.map((product) => (
                  <div key={product.id}>
                    <Productcard
                      id={product.id}
                      name={product.name}
                      imageUrl={product.poster_image ?? undefined}
                      starting_price={Number(product.starting_price)}
                      description={product.description}
                      review_avg={product.average_rating ?? 0}
                      review_number={product.review_count}
                      version={product.versions}
                    />
                  </div>
                ))
              )}
            </div>

            <div className="flex flex-row w-full justify-center gap-5 items-center">
              <div className="flex flex-row w-full justify-center gap-2 items-center">
                <button
                  onClick={() => {
                    if (selectedpage > 1) {
                      const prev = selectedpage - 1;
                      setselectedpage(prev);
                      fetchlistproducts(prev);
                      setproductcounter(productcounter - products.length);
                    }
                  }}
                  disabled={selectedpage === 1}
                  className="px-3 py-2 rounded-full border-[3px] disabled:opacity-50"
                >
                  &lt;
                </button>

                {getDynamicPages().map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setselectedpage(page);
                      fetchlistproducts(page);
                    }}
                    className={`cursor-pointer px-4 py-2 rounded-full border-[3px] ${
                      selectedpage === page ? "bg-gray-300" : "bg-white"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {showEllipsis() && (
                  <span className="px-2 text-xl font-bold select-none">...</span>
                )}

                {Array.from({ length: 2 }, (_, i) => totalpage - 1 + i)
                  .filter((page) => page > getDynamicPages().slice(-1)[0])
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        setselectedpage(page);
                        fetchlistproducts(page);
                      }}
                      className={`cursor-pointer px-4 py-2 rounded-full border-[3px] ${
                        selectedpage === page ? "bg-gray-300" : "bg-white"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                <button
                  onClick={() => {
                    if (selectedpage < totalpage) {
                      const next = selectedpage + 1;
                      setselectedpage(next);
                      fetchlistproducts(next);
                      setproductcounter(productcounter + products.length - 1);
                    }
                  }}
                  disabled={selectedpage === totalpage}
                  className="px-3 py-2 rounded-full border-[3px] disabled:opacity-50"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SupportAndMore />
    </>
  );
}