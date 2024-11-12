import { Route, Routes, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";

function App() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  if (!isSignedIn) {
    navigate("/sign-in");
  }

  return (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route element={<Sidebar />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
