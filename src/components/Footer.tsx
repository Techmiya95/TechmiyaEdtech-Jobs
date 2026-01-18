
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <img src="techmiyaedtech_new_logo.png" alt="Tech Miya Logo" className="w-10 h-10 object-contain" />

              </div>
              <span className="text-xl font-bold text-amber-500">Techmiya Edtech</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Transforming learning with cutting-edge technology education.
              Empowering students to build successful careers in tech.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="https://www.youtube.com/channel/UCqyZlCLdyDFjyM3VFDea4rw" className="text-gray-300 hover:text-white transition-colors">
                Youtube
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="https://www.instagram.com/techmiya_edtech" className="text-gray-300 hover:text-white transition-colors">
                Instagram
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://techmiyaedtech.com/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="https://lms.techmiyaedtech.com/s/store" className="text-gray-300 hover:text-white transition-colors">
                  Courses
                </a>
              </li>
              <li>
                <a href="https://techmiyaedtech.com/" className="text-gray-300 hover:text-white transition-colors">
                  Reviews
                </a>
              </li>
              <li>
                <a href="https://techmiyaedtech.com/" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="https://techmiyaedtech.com/" className="text-gray-300 hover:text-white transition-colors">
                  Terms & Condition
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-300">
              <p>📧hr@techmiyaedtech.com</p>
              <p>📞 +91 6363760275</p>
              <p>📞 +91 6361987951</p>

              <p>📍 Techmiya Ed-Tech, 28th Main Rd, S & C Cross A Road, Jayanagar 9th Block, Bengaluru, Karnataka 560069</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Techmiya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
