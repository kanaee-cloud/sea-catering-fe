import {
  Facebook,
  Instagram,
  Github,
  Twitter,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glassmorphism border-t py-10">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="font-bold text-xl">SEA Catering.</div>
            <p className="text-light opacity-70 text-sm">
              Sea Catering helps you stay healthy and satisfied by offering ready-to-go
              meals that match your lifestyle, goals, and schedule.
            </p>
            <div className="flex space-x-4 text-gray-500">
              <Twitter className="w-5 h-5 hover:text-black" />
              <Instagram className="w-5 h-5 hover:text-black" />
              <Github className="w-5 h-5 hover:text-black" />
              <Facebook className="w-5 h-5 hover:text-black" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-light mb-3">Product</h3>
            <ul className="text-sm text-light opacity-60 space-y-2">
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Integrations</a></li>
              <li><a href="#">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-light  mb-3">Company</h3>
            <ul className="text-sm text-light opacity-60 space-y-2">
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Partners</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-10 border-t pt-6 text-sm text-gray-500 gap-2">
          <p>  {new Date().getFullYear()} SEA Catering. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Cookies Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

