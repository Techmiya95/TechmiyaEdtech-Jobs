
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/logo.jpeg";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "https://www.techmiyaedtech.com/" },
    { name: "Courses", path: "https://lms.techmiyaedtech.com/s/store" },
    { name: "Reviews", path: "https://www.techmiyaedtech.com/" },
    { name: "Psychometric Test", path: "https://pt.techmiyaedtech.com/" },
    { name: "Contact", path: "https://www.techmiyaedtech.com/" },
    { name: "Blog", path: "https://blogs.techmiyaedtech.com/" },
    { name: "Jobs", path: "/" }

  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="techmiyaedtech_new_logo.png" alt="Tech Miya Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold text-amber-500">Techmiya Ed-Tech </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              item.path.startsWith("http") ? (
                <a
                  key={item.name}
                  href={item.path}
                  target={item.name === "Jobs" ? "_self" : "_self"} // Use _self to feel like same site navigation
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200 text-gray-700 hover:text-amber-600 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200 ${isActive(item.path)
                    ? "text-amber-600 bg-amber-50"
                    : "text-gray-700 hover:text-amber-600 hover:bg-gray-50"
                    }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex gap-4">
            <a href="https://lms.techmiyaedtech.com/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                Access LMS
              </Button>
            </a>
            <a href="https://techmiyaedtech.com/register" target="_self" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                Enquire Now
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              {navItems.map((item) => (
                item.path.startsWith("http") ? (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_self"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-700 hover:text-amber-600 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive(item.path)
                      ? "text-amber-600 bg-amber-50"
                      : "text-gray-700 hover:text-amber-600 hover:bg-gray-50"
                      }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <a href="https://lms.techmiyaedtech.com/" target="_blank" rel="noopener noreferrer" className="block w-full mt-4">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                  Access LMS
                </Button>
              </a>
              <a
                href="https://techmiyaedtech.com/register"
                target="_self"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full mt-2"
              >
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  Register Now
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
