import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import App from "./App.tsx";
import "./index.css";

import { Authenticate } from "./pages/Authenticate/Authenticate.tsx";
import { LandingPage } from "./pages/LandingPage/LandingPage.tsx";
import { Dashboard } from "./pages/Dashboard/Dashboard.tsx";
import { Profile } from "./pages/Profile/Profile.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<LandingPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/authenticate" element={<Authenticate />} />

          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
