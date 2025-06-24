import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const navRef = useRef(null);
  const activeRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'mealplans', label: 'Meal Plans', href: '/mealplans' },
    { id: 'subscription', label: 'Subscription', href: '/subscription' },
    { id: 'contact', label: 'Contact Us', href: '/contact' }
  ];

  // Get active route based on current location
  const getActiveRoute = () => {
    const currentPath = location.pathname;
    const activeItem = navItems.find(item => item.href === currentPath);
    return activeItem ? activeItem.id : 'home';
  };

  const activeRoute = getActiveRoute();

  // Update underline position based on active item
  useEffect(() => {
    if (activeRef.current) {
      const activeElement = activeRef.current;
      setUnderlineStyle({
        width: activeElement.offsetWidth,
        left: activeElement.offsetLeft,
      });
    }
  }, [activeRoute]);

  // Handle mouse enter for hover effect
  const handleMouseEnter = (e) => {
    const element = e.target;
    setUnderlineStyle({
      width: element.offsetWidth,
      left: element.offsetLeft,
    });
  };

  // Handle mouse leave to return to active item
  const handleMouseLeave = () => {
    if (activeRef.current) {
      const activeElement = activeRef.current;
      setUnderlineStyle({
        width: activeElement.offsetWidth,
        left: activeElement.offsetLeft,
      });
    }
  };

  // Handle navigation click
  const handleNavClick = (e, item) => {
    e.preventDefault();
    navigate(item.href);
    setIsMobileMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative p-5">
      <header className="glassmorphism relative shadow-md p-4 top-0 z-50 rounded-full">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 
            className="text-xl font-bold cursor-pointer" 
            onClick={() => navigate('/')}
          >
            SEA.
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex relative" ref={navRef}>
            <div className="relative flex space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  ref={activeRoute === item.id ? activeRef : null}
                  className={`relative py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    activeRoute === item.id
                      ? 'text-light'
                      : 'text-gray-600 hover:text-white'
                  }`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Moving underline */}
              <div
                className="absolute bottom-0 h-0.5 bg-accent transition-all duration-300 ease-out"
                style={{
                  width: underlineStyle.width,
                  left: underlineStyle.left,
                }}
              />
            </div>
          </nav>

          {/* Desktop Login */}
          <div className="hidden md:flex gap-x-2 items-center">
            <button 
              onClick={() => navigate('/login')}
              className="text-sm font-medium hover:bg-transparent text-primary bg-light  hover:text-light transition-colors duration-200 px-4 py-2 border border-gray-300 rounded-full hover:border-light">
              Login
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="text-sm font-medium hover:bg-light text-light bg-transparent  hover:text-primary transition-colors duration-200 px-4 py-2 border border-gray-300 rounded-full hover:border-light">
              Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-100 transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 mt-2 mx-5 bg-light rounded-2xl shadow-lg border transition-all duration-300 ease-out ${
            isMobileMenuOpen
              ? 'opacity-100 visible transform translate-y-0'
              : 'opacity-0 invisible transform -translate-y-2'
          }`}
        >
          <nav className="py-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`block px-6 py-3 text-sm font-medium transition-all duration-200 relative cursor-pointer ${
                  activeRoute === item.id
                    ? 'text-black bg-gray-50 border-l-4 border-black'
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                }`}
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.label}
              </a>
            ))}
            
            {/* Mobile Login */}
            <div className="px-6 py-3 border-t border-gray-100 mt-2 ">
              <button className="w-full text-sm mb-2 font-medium text-gray-900 hover:text-black transition-colors duration-200 py-2 border border-gray-300 rounded-full hover:border-black">
                Login
              </button>
              <button className="w-full text-sm font-medium text-gray-900 hover:text-black transition-colors duration-200 py-2 border border-gray-300 rounded-full hover:border-black">
                Register
              </button>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;