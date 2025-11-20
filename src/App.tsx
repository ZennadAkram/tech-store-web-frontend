import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { loadUser } from "./features/auth/authUtils";
import { ChatProvider } from "./chatbot/context";

// lazy imports
const Detailproduct = lazy(() =>
  import("./Pages/Detailpage").then(module => ({ default: module.Detailproduct }))
);
const Carts = lazy(() =>
  import("./Pages/Cart").then(module => ({ default: module.Carts }))
);
const Checkout = lazy(() =>
  import("./Pages/Checkout").then(module => ({ default: module.Checkout }))
);
const NewProducts = lazy(() => import("./Pages/NewProducts"));
const ProductsPage = lazy(() =>
  import("./Pages/ProductsPage").then(module => ({ default: module.ProductsPage }))
);
const LoginPage = lazy(() => import("./features/auth/LoginPage"));
const ChatboPage = lazy(() =>
  import("./chatbot/views/chatbot_page").then(module => ({ default: module.ChatboPage }))
);

function App() {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Router>
      {/* Suspense will show fallback until lazy component is loaded */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/product/:id" element={<Detailproduct />} />
          <Route path="/cart/" element={<Carts />} />
          <Route path="/checkout/" element={<Checkout />} />
          <Route path="/newproducts/" element={<NewProducts />} />
          <Route path="/products/" element={<ProductsPage />} />
          <Route path="/login/" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ChatProvider>
                <ChatboPage />
              </ChatProvider>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
