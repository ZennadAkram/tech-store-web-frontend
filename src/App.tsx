import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { loadUser } from "./features/auth/authUtils";
import { Detailproduct } from "./Pages/Detailpage";
import { Carts } from "./Pages/Cart";
import { Checkout } from "./Pages/Checkout";
import NewProducts from "./Pages/NewProducts";
import { ProductsPage } from "./Pages/ProductsPage";
import LoginPage from "./features/auth/LoginPage";



function App() {
 
  useEffect(() => {
    loadUser(); 
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/product/:id" element={<Detailproduct />} />
        <Route path="/cart/"  element={<Carts/>}/>
        <Route path="/checkout/" element={<Checkout/>}/>
        <Route path="/newproducts/" element={<NewProducts/>} />
        <Route path="/" element={<ProductsPage/>} />
        <Route path="/login/" element={<LoginPage/>} />
      </Routes>
    </Router>
  );
}

export default App;