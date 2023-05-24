import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Routes, Route } from "react-router-dom";

export default function AuthPage({ setUser }) {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
        </Route>
        <Route>
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
        </Route>
      </Routes>
    </>
  );
}
