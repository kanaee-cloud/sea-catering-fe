/* eslint-disable no-unused-vars */
import { Hexagon, LayoutDashboard, Package, Menu, X, Users, Settings, FormInput } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AdminSidebar = () => {
  const [activeRoute, setActiveRoute] = useState('/admin');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", href: "/admin", icon: LayoutDashboard  },
    { id: "subscription", label: "Subscription", href: "/admin/subscription", icon: Package  },
    { id: "user-list", label: "User List", href: "/admin/user-list", icon: Users   },
    { id: "testimonials", label: "Testimonials", href: "/admin/testimonials", icon: FormInput   },
    { id: "settings", label: "Settings", href: "/admin/settings", icon: Settings   },
  ];

  
  useEffect(() => {
    const path = window.location.pathname || '/admin';
    setActiveRoute(path);
  }, []);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const mobileOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const mobileSidebarVariants = {
    hidden: { x: "-100%" },
    visible: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <>
      <motion.button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-lg"
        onClick={toggleMobileMenu}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </motion.button>

      <motion.nav 
        className="hidden md:block bg-gray py-6 max-w-md relative"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex items-center justify-center py-2 gap-x-2 text-xl mb-12"
          variants={itemVariants}
        >
          <Hexagon className="text-accent text-4xl" size={40}/>
          <h1 className="font-bold text-xl">SEA.</h1>
        </motion.div>
        <motion.p 
          className="text-sm opacity-70 mb-4 px-4"
          variants={itemVariants}
        >
          Menu
        </motion.p>
        <ul>
          {navItems.map((item, index) => {
            const isActive = activeRoute === item.href;
            return (
              <motion.div 
                key={item.id} 
                className={`relative text-center px-8 py-2 hover:bg-white hover:text-primary cursor-pointer border-l-8 border-transparent hover:border-l-accent transition ease-in-out duration-200 ${
                  isActive ? 'border-l-accent bg-white text-primary border-l-8' : ''
                }`}
                variants={itemVariants}
                custom={index}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-x-2 opacity-80">
                  <item.icon />
                  <a href={item.href} className="block py-2">
                    {item.label}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </ul>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              variants={mobileOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={toggleMobileMenu}
            />
            
            <motion.nav
              className="md:hidden fixed left-0 top-0 h-full w-80 bg-gray z-50 py-6"
              variants={mobileSidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="pt-12">
                <motion.div 
                  className="flex items-center justify-center gap-x-2 text-xl mb-12"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Hexagon className="text-accent" />
                  SEA
                </motion.div>
                <motion.p 
                  className="text-sm opacity-70 mb-4 px-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Menu
                </motion.p>
                <ul>
                  {navItems.map((item, index) => {
                    const isActive = activeRoute === item.href;
                    return (
                      <motion.div 
                        key={item.id} 
                        className={`text-center px-8 py-2 hover:bg-white hover:text-primary cursor-pointer hover:border-l-8 border-l-accent transition ease-in-out duration-200 ${
                          isActive ? 'bg-white text-primary border-l-8' : ''
                        }`}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        onClick={() => {
                          setActiveRoute(item.href);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-x-2 opacity-80">
                          <item.icon />
                          <a href={item.href} className="block py-2">
                            {item.label}
                          </a>
                        </div>
                      </motion.div>
                    );
                  })}
                </ul>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;