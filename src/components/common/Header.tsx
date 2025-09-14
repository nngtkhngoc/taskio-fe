import { Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";

import { ArrowRight, Menu, X, XIcon } from "lucide-react";

import abstractImg from "../../assets/Abstract.webp";
import { ComicText } from "../ui/comic-text";
import { Button } from "../ui/button";
import { useSignOut, useUser } from "@/hooks/useUser";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Dashboard", link: "/dashboard" },
    { name: "Profile", link: "/profile" },
  ];
  function renderNavItems(navItems: { name: string; link: string }[]) {
    return navItems.map((item, index) => (
      <Link
        to={item.link}
        key={item.name}
        className={`w-full sm:rounded-none rounded-t-sm text-center py-5 font-medium text-black cursor-pointer hover:bg-blue-100 transition-all duration-300 border-b-2 border-black sm:text-lg sm:border-r-2 sm:px-6 ${
          location.pathname === item.link ? "font-bold bg-blue-100" : ""
        } ${index === 0 ? "sm:border-l-2" : ""}`}
      >
        {item.name}
      </Link>
    ));
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const nav = useNavigate();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const { data: user } = useUser();

  const { mutate: doSignOut, isPending } = useSignOut();

  return (
    <div
      className={`h-full px-10 w-full max-w-screen-2xl md:px-30 flex flex-col gap-3 sticky z-40 bg-background overflow-hidden  ${
        isScrolled ? "-top-12 md:-top-10" : "top-0"
      }`}
    >
      <div
        className={`w-full border-2 border-black rounded-lg h-10 bg-blue-300 flex justify-center items-center gap-3 overflow-hidden p-0 cursor-pointer`}
      >
        <img
          alt="Abstract_logo"
          loading="lazy"
          width="50"
          height="50"
          decoding="async"
          data-nimg="1"
          className="mb-8 max-sm:hidden"
          src={abstractImg}
        ></img>

        {/* Text on mobile */}
        <div className=" flex flex-row items-center text-sm font-medium gap-2">
          From messy to ready!
          <ArrowRight className="text-sm w-5" />
        </div>
        <img
          alt="Abstract_logo"
          loading="lazy"
          width="50"
          height="50"
          decoding="async"
          data-nimg="1"
          className="mt-12 max-sm:hidden w-10"
          src={abstractImg}
        ></img>
      </div>

      <div className="w-full border-2 border-black rounded-lg h-16 bg-white flex justify-between items-center gap-3 overflow-hidden cursor-pointer pl-4 sm:px-5 lg:px-20 relative">
        {/* Logo on laptop */}
        <Link to="/" className="-mt-1 hidden xl:block">
          <ComicText
            fontSize={2.5}
            backgroundColor="var(--color-blue-300)"
            dotColor="white"
          >
            TASKIO!
          </ComicText>
        </Link>

        {/* Logo on mobile */}
        <div className="block xl:hidden flex flex-row items-center text-xl font-bold gap-1">
          <Link to="/" className="-mt-2">
            <ComicText
              fontSize={2.5}
              backgroundColor="var(--color-blue-300)"
              dotColor="white"
            >
              T
            </ComicText>
          </Link>
          <div>askio!</div>
        </div>
        {/* Navbar on laptop */}
        <div className="hidden sm:block">{renderNavItems(navItems)}</div>
        <div className="pr-5 -mt-[5px] hidden sm:block">
          {user ? (
            <Button disabled={isPending} onClick={() => doSignOut()}>
              Sign Out
            </Button>
          ) : (
            <Button onClick={() => nav("/authenticate")}>Sign In</Button>
          )}
        </div>

        {/* Menu on mobile */}
        <div className="block sm:hidden border-l-2 border-black py-10 flex justify-center items-center px-4 bg-blue-300">
          {menuOpen ? (
            <X className="w-7 h-7 text-black" onClick={toggleMenu} />
          ) : (
            <Menu className="w-7 h-7 text-black" onClick={toggleMenu} />
          )}
        </div>
      </div>

      {/* Overlay background khi mở menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white/40 z-40" onClick={toggleMenu} />
      )}

      {/* Mobile menu items */}
      <div
        className={`font-primary fixed right-0 top-0 h-screen w-4/5 border-l-2 border-black bg-white shadow-xl transition-transform duration-500 flex z-50 flex-col items-center ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {menuOpen && (
          <div className="flex flex-col items-center gap-5 w-full relative">
            <div className="absolute top-4 right-5">
              <button onClick={toggleMenu} aria-label="Close menu">
                <XIcon className="w-5 text-zinc-800" />
              </button>
            </div>
            <div className="px-6 pt-8 flex flex-col items-center justify-center gap-2 ">
              <div className="text-lg font-extrabold text-black">Menu</div>
              <div className="text-sm font-medium text-black">
                All navigation links
              </div>
            </div>

            <div className="flex flex-col items-center justify-center w-4/5 border border-black rounded-sm border-2">
              {renderNavItems(navItems)}
            </div>

            <div className="mb-3">
              {user ? (
                <Button disabled={isPending} onClick={() => doSignOut()}>
                  Sign Out
                </Button>
              ) : (
                <Button onClick={() => nav("/authenticate")}>Sign In</Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
