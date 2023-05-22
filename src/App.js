import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUser } from "./utilities/users-service";
import NavBar from "./components/NavBar/NavBar";

import AuthPage from "./pages/AuthPage/AuthPage";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main>
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route>
              <Route path="/dashboard" element={<MainPage />} />
            </Route>
            {/* redirect to /dashboard if path in address bar hasn't matched a <Route> above */}
            <Route path="/*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
