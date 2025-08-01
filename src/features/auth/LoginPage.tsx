import React, { useState } from "react";
import { login, getCurrentUser } from "./authAPI";
import { useAuthStore } from "./authStore";
import type { LoginForm } from "./authTypes";
import { Navbar } from "../../components/Navbar";
import { SupportAndMore } from "../../components/supportandmore";


export default function LoginPage() {
  const setUser = useAuthStore((state) => state.setUser);
  const [form, setForm] = useState<LoginForm>({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  try {
    const tokens = await login(form);
    alert("Login successful!"); // ✅ Success alert

    localStorage.setItem("access", tokens.access);
    localStorage.setItem("refresh", tokens.refresh);

    const user = await getCurrentUser();
    setUser(user);
    console.log("User data:", user);
  } catch (err) {
    console.error("Login failed:", err);
    setError("Invalid username or password");
    alert("Invalid username or password"); 
  }
};

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  return (
    <>
     
      <Navbar/>
      {/* Main body */}
      <div className="md:px-[6%] pt-16 flex flex-col gap-4 px-[6%]  ">
        <h1 className="text-2xl font-bold ">Customer Login</h1>
        {/* Login form */}
        <div className="flex flex-col gap-3 justify-start md:flex md:flex-row md:gap-10   ">
         <div className="w-full md:h-[450px] md:w-1/2 lg: bg-[#F5F7FF] lg:h-[415.46087646484375px]  p-8 
         flex flex-col gap-6">
          <h3 className="lg:text-sm font-[700] first-letter:uppercase">
            Registered Customers
          </h3>
          <p className="lg:text-xs">If you have an account, sign in with your email address.</p>
          <label className="lg:font-semibold" htmlFor="email">Username <span className="text-red-500">*</span></label>
          <input name="username" type="text" value={form.username}
                onChange={handleChange}
                required className="lg:bg-white border border-gray-300 p-2 rounded" placeholder="Enter your username" />
          <label className="lg:font-semibold" htmlFor="password">Password <span className="text-red-500">*</span></label>
          <input name="password" type="password" value={form.password}
                onChange={handleChange}
                required id="password" className="lg:bg-white border border-gray-300 p-2 rounded" placeholder="Enter your password" />
          <div className="flex justify-start items-center gap-9">
            <button className="w-[140px] h-[40px] bg-[#0156FF] md:w-[151px] md:h-[50px] rounded-3xl text-white font-[500] p-2 
            hover:bg-[#0056CC]
             
            " onClick={handleLogin}>Sign In</button>
             <a href="#" className="text-[#0156FF] hover:text-[#0056CC] ">Forgot Your Password?</a>

          </div>
          
          </div>   
           <div className="w-full  md:h-[450px] md:w-1/2  lg: bg-[#F5F7FF] lg:h-[415.46087646484375px]  p-8 flex flex-col gap-10">
          <h3 className="text-sm font-[700] first-letter:uppercase">
            New Customer?
          </h3>
          <p className="text-xs ">
             Creating an account has many benefits:<br />
             <br />
             •  Check out faster<br />
             •  Keep more than one address<br />
             •  Track orders and more

          </p>
          <button className="bg-[#0156FF] w-[183px] h-[40px] md:w-[208px] md:h-[50px] rounded-3xl text-white font-[500] p-2 
          hover:bg-[#0056CC]
          ">Create an Account</button>
          </div>   
      
        </div>

      </div>
      <SupportAndMore />
      {/* Footer */}
    </>
  );  
}
