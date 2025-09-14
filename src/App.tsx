import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";

import { Header } from "./components/common/Header";
import AOS from "aos";
import "aos/dist/aos.css";
import { Toaster } from "./components/ui/sonner";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    AOS.init({
      offset: 120,
      duration: 600,
      easing: "ease",
      once: false,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
  }, []);
  return (
    <div className="font-primary min-h-screen size-full pt-3  scrollbar-hide">
      <Header />
      <div className="relative h-full w-full overflow-x-hidden  scrollbar-hide">
        <Outlet />
      </div>{" "}
      <Toaster richColors position="top-center" />
    </div>
  );
}

export default App;
