import { useEffect, useState } from "react";
import { Addressinput } from "../components/Addressinputs";
import { Navbar } from "../components/Navbar";
import { SupportAndMore } from "../components/supportandmore";
import { useCart } from "../components/CartIdContext";
import { Progresscontainer } from "../components/progresscontainer";
import { addadress, address, updateadress } from "../API/AddressApi";
import type { Address } from "../types/Address";


export function Checkout(){
    const [shipping,setshipping]=useState<boolean>(true);
    const { cart, fetchCart } = useCart();
    const [addressuser, setaddressuser] = useState<Address | null>(null);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [stateName, setStateName] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const validateForm = () => {
  const errors: string[] = [];

  if (!email.trim()) errors.push("email");
  if (!firstName.trim()) errors.push("firstName");
  if (!lastName.trim()) errors.push("lastName");
  if (!streetAddress.trim()) errors.push("streetAddress");
  if (!city.trim()) errors.push("city");
  if (!stateName.trim()) errors.push("stateName");
  if (!postalCode.trim()) errors.push("postalCode");
  if (!country.trim()) errors.push("country");
  if (!phoneNumber.trim()) errors.push("phoneNumber");

  setFormErrors(errors);
  return errors.length === 0;
};



  useEffect(() => {
    fetchCart();
  }, []);

 useEffect(() => {
  const fetchaddress = async () => {
    try {
      const data = await address(); // call API
      const addr = data.results[0]; // first result
      if (addr) {
        setaddressuser(addr);
        setEmail(addr.email || "");
        setFirstName(addr.first_name || "");
        setLastName(addr.last_name || "");
        setStreetAddress(addr.street_address || "");
        setCity(addr.city || "");
        setStateName(addr.state || "");
        setPostalCode(addr.postal_code || "");
        setCountry(addr.country || "");
        setPhoneNumber(addr.phone_number || "");
      } else {
        console.warn("No address found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  fetchaddress();
}, []); // make sure to include []


  useEffect(() => {
    console.log("Cart updated:", cart);
   
   
  }, [cart]);

  const handleAddressUpdate = async (updatedAddress: Address) => {
    if (!addressuser || !addressuser.id) return;

    try {
      const response = await updateadress(addressuser.id, updatedAddress);
      if (response.data.success) {
        setaddressuser(response.data.data);
      } else {
        console.error("Error updating address:", response.data.error);
        alert("Failed to update address: " + response.data.error);
      }
    } catch (error) {
      console.error("Error updating address:", error);
      alert("An error occurred while updating the address: " + error);
    }
  };

 const handleAddAddress = async (newAddress: Address) => {
  try {
    const response = await addadress(newAddress);
    if (response.data.success) {
      setaddressuser(response.data.data);
      alert("Address added successfully.");
    } else {
      console.error("Error adding address:", response.data.error);
      alert("Failed to add address: " + response.data.error);
    }
  } catch (error) {
    console.error("Error adding address:", error);
    alert("An error occurred while adding the address: " + error);
  }
};


    return ( 
        <>

        <Navbar cart={null}/> 
        {/* main container */}
        <div className="flex flex-col gap-4 p-4 w-full lg:px-36">
            <div className="hidden md:flex flex-row justify-between items-center">
              <div className="flex flex-col md:gap-11 lg:flex-row gap-4"> 
                <h1 className="font-bold text-3xl">Checkout</h1>
            <button className="border-[3px] hover:bg-[#a3b7e0] w-[147px] h-[38px] text-[#0156FF] font-semibold  border-[#0156FF] rounded-3xl">Sign In</button>
            </div>
            <div className="hidden  md:flex flex-row">
              <Progresscontainer text="1" progress={true} desc="Shipping"/>
              <Progresscontainer text="2" progress={false} desc="Review & Payments"/>
            </div>
            </div>
            <div className="py-3 border-b-2 md:w-1/2 lg:w-[68%] border-b-[#CACDD8]">
                    <h3 className="font-semibold text-lg">Shipping Address</h3>
                </div>
            {/* the tow parts container */}
         <div className="flex flex-col gap-10 lg:justify-between md:flex-row">
            {/* address container */}
             
            <div className="flex flex-col md:w-[50%] lg:w-[40%] gap-4">
                
                <Addressinput title="Email Address" placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} error={formErrors.includes("email")} />
<Addressinput title="First Name" placeholder="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} error={formErrors.includes("firstName")} />
<Addressinput title="Last Name" placeholder="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} error={formErrors.includes("lastName")} />
<Addressinput title="Street Address" placeholder="Street Address" type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} error={formErrors.includes("streetAddress")} />
<Addressinput title="City" placeholder="City" type="text" value={city} onChange={(e) => setCity(e.target.value)} error={formErrors.includes("city")} />
<Addressinput title="State/Province" placeholder="State/Province" type="text" value={stateName} onChange={(e) => setStateName(e.target.value)} error={formErrors.includes("stateName")} />
<Addressinput title="Zip/Postal Code" placeholder="Zip/Postal Code" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} error={formErrors.includes("postalCode")} />
<Addressinput title="Country" placeholder="Country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} error={formErrors.includes("country")} />
<Addressinput title="Phone Number" placeholder="Phone Number" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} error={formErrors.includes("phoneNumber")} />

                <div className="flex flex-col gap-2">
             <span className="text-[12px] font-bold">Standard Rate</span>
             <div className="flex flex-row  gap-5">
              <div className="rounded-full flex justify-center items-center w-[18px] h-[18px]
              border-2 border-[#0156FF] p-[2px]
              ">
               <button
  onClick={() => setshipping(!shipping)}
  className={`rounded-full w-[12px] h-full ${shipping ? "bg-[#0156FF]" : ""}`}
></button>
              </div>
              <div className="flex gap-16 flew-row justify-between">
                <p className="text-[13px]">Price may vary depending on the item/destination. Shop Staff will contact you. </p>
              <span className="font-bold">$21.00</span>
               </div>
             </div>
          </div>
          {/* Pickup from store */}
          <div className="flex flex-col gap-2">
             <span className="text-[12px] font-bold">Pickup from store</span>
             <div className="flex flex-row  gap-5">
              <div className="rounded-full flex justify-center items-center w-[18px] h-[18px]
              border-2 border-[#0156FF] p-[2px]
              ">
               <button
  onClick={() => setshipping(!shipping)}
  className={`rounded-full w-[12px] h-full ${shipping===false ? "bg-[#0156FF]" : ""}`}
></button>
              </div>
              <div className="flex flex-row w-full justify-between">
                <p className="text-[13px]">1234 Street Adress, City Address, 1234</p>
                <span className="font-bold">$0.00</span>
              </div>
             </div>
          </div>
         <button
  onClick={() => {
    if (!validateForm()) return; // stop if invalid

    const newAddress: Address = {
      email,
      first_name: firstName,
      last_name: lastName,
      street_address: streetAddress,
      city,
      state: stateName,
      postal_code: postalCode,
      country,
      phone_number: phoneNumber,
      address_type: "shipping",
    };

    if (addressuser && addressuser.id) {
      handleAddressUpdate(newAddress);
    } else {
      handleAddAddress(newAddress);
    }
  }}
  className="bg-[#0156FF] hover:bg-[#719af2] rounded-3xl text-white w-[133px] h-[38px] font-bold"
>
  Next
</button>

                
            </div>
            {/* orders summary container */}
             <div className="flex flex-col gap-5 lg:sticky lg:top-16 z-20 bg-[#F5F9FF] md:-mt-[18px] h-fit md:w-1/2 lg:w-[30%] p-4">
                <h2 className="font-bold">Order Summary</h2>
                <div className="w-full border border-[#CACDD8]"></div>
                <span className="text-[#8C8C8C]"><span className="text-blue-500">{cart?.items.length}</span> Items in Cart</span>
                <div className="flex flex-col gap-5">
                  {cart?.items.map((item)=>{
                    return (
                      <div className="flex flex-row gap-4 ">
                        <div className="w-[100px] h-[100px]">
                          <img className="w-[100px] h-[100px]" src={item?.version_details?.images[0].image ?? item.product_poster_image ?? ""} alt="" />
                        </div>
                        <div className="flex w-fit  flex-col justify-around">
                         <p className="line-clamp-2 text-sm">{item?.version_details?.features?.[0]?.description ?? "MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER..."}</p>
                         <div className="flex flex-row gap-3">
                           <span className="text-sm font-medium text-[#8C8C8C]">Qty <span className="text-black font-medium">{item.quantity}</span> </span>
                            <span className="text-sm font-bold">${
  item.version_details?.price != null
    ? (item.quantity * Number(item.version_details.price)).toFixed(2)
    : (item.quantity * Number(item.product_starting_price)).toFixed(2)
}
</span>
                         </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
             </div>
         </div>
             
        </div>
        <SupportAndMore/>
        </>
    );
}