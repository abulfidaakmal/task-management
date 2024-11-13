import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import Toaster from "./components/Toaster";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <ClerkLoading>
        <div className="flex justify-center h-screen">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <BrowserRouter>
          <Toaster />
          <App />
        </BrowserRouter>
      </ClerkLoaded>
    </ClerkProvider>
  </StrictMode>
);
