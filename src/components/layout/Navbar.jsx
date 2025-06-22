const Navbar = () => {
  return (
    <div className="p-5">
      <header className="bg-white shadow-md p-4 sticky top-0 z-50 rounded-full">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">SEA.com</h1>
          <nav className="space-x-6">
            <a href="#features" className="text-gray-600 hover:text-black">
              Home
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-black">
              Meal Plans
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-black">
              Subscription
            </a>
            <a href="#contact" className="text-gray-600 hover:text-black">
              Contact Us
            </a>
          </nav>
          <h1>Login</h1>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
