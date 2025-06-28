import React, { useState, useEffect, useRef } from "react";
import { CircleUserRound, Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { getFirstName } from "../../utils/getFirstName";
import { useCombinedAuth } from "../../hooks/useCombinedAuth";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const navRef = useRef(null);
  const activeRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    userName, 
    isAdmin
  } = useCombinedAuth();



  const navItems = [
    { id: "home", label: "Home", href: "/" },
    { id: "mealplans", label: "Meal Plans", href: "/mealplans" },
    { id: "subscription", label: "Subscription", href: "/subscription" },
    { id: "contact", label: "Contact Us", href: "/contact" },
  ];

  const getActiveRoute = () => {
    const currentPath = location.pathname;
    const activeItem = navItems.find((item) => item.href === currentPath);
    return activeItem ? activeItem.id : "home";
  };

  const activeRoute = getActiveRoute();

  useEffect(() => {
    if (activeRef.current) {
      const activeElement = activeRef.current;
      setUnderlineStyle({
        width: activeElement.offsetWidth,
        left: activeElement.offsetLeft,
      });
    }
  }, [activeRoute]);

  const handleMouseEnter = (e) => {
    const element = e.target;
    setUnderlineStyle({
      width: element.offsetWidth,
      left: element.offsetLeft,
    });
  };

  const handleMouseLeave = () => {
    if (activeRef.current) {
      const activeElement = activeRef.current;
      setUnderlineStyle({
        width: activeElement.offsetWidth,
        left: activeElement.offsetLeft,
      });
    }
  };

  const handleNavClick = (e, item) => {
    e.preventDefault();
    navigate(item.href);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative p-5">
      <header className="glassmorphism relative shadow-md p-4 top-0 z-100 rounded-full">
        <div className="container mx-auto flex justify-between items-center">
          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            SEA.
          </h1>

          <nav className="hidden md:flex relative" ref={navRef}>
            <div className="relative flex space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  ref={activeRoute === item.id ? activeRef : null}
                  className={`relative py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    activeRoute === item.id
                      ? "text-light"
                      : "text-gray-600 hover:text-white"
                  }`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item.label}
                </a>
              ))}

              <div
                className="absolute bottom-0 h-0.5 bg-accent transition-all duration-300 ease-out"
                style={{
                  width: underlineStyle.width,
                  left: underlineStyle.left,
                }}
              />
            </div>
          </nav>

          <div className="hidden md:block">
            {userName ? (
              <div onClick={() => navigate(isAdmin ? "/admin" : "/users")} className="border  bg-light text-primary hover:bg-transparent hover:text-light transition-all duration-200  flex items-center gap-x-2 px-4 py-2 rounded-full">
                <CircleUserRound />
                <span className="text-sm font-medium">
                  {getFirstName(userName)}
                </span>
              </div>
            ) : (
              <div className=" gap-x-2 w-full flex items-center">
                <button onClick={() => navigate("/auth")} className="w-full text-sm font-medium text-primary hover:bg-transparent  transition-colors duration-200 px-4 py-2 hover:text-light rounded-full hover:border-light bg-light">
                  Login
                </button>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-100 transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div
        className={`md:hidden absolute top-full left-0 right-0 mt-2 mx-5 z-50 bg-light rounded-2xl shadow-lg border transition-all duration-300 ease-out ${
          isMobileMenuOpen
            ? "opacity-100 visible transform translate-y-0"
            : "opacity-0 invisible transform -translate-y-2"
        }`}
      >
        <nav className="py-4">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`block px-6 py-3 text-sm font-medium transition-all duration-200 relative cursor-pointer ${
                activeRoute === item.id
                  ? "text-black bg-gray-50 border-l-4 border-black"
                  : "text-gray-600 hover:text-black hover:bg-gray-50"
              }`}
              onClick={(e) => handleNavClick(e, item)}
            >
              {item.label}
            </a>
          ))}

          <div className="px-6 py-3 border-t border-gray-100 mt-2">
          {userName ? (
            <div onClick={() => navigate(isAdmin ? "/admin" : "/users")} className="border border-primary flex text-primary items-center gap-x-2 px-4 py-2 rounded-full">
              <CircleUserRound />
              <span className="text-sm font-medium" onClick={() => navigate("/profile")}>
                {getFirstName(userName)}
              </span>
            </div>
          ) : (
            <div className="px-6 py-3 border-t border-gray-100 mt-2">
              <button onClick={() => navigate("/auth")} className="w-full text-sm font-medium text-gray-900 hover:text-black transition-colors duration-200 py-2 border border-gray-300 rounded-full hover:border-black">
                Login
              </button>
            </div>
          )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

