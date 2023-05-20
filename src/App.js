import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "./utilities/users-service";
import NavBar from "./components/NavBar/NavBar";
import NewOrderPage from "./pages/NewOrderPage/NewOrderPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import OrderHistoryPage from "./pages/OrderHistoryPage/OrderHistoryPage";

function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route>
              <Route path="/orders/new" element={<NewOrderPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
            </Route>
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
