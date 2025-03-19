import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-semibold">Uber</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Visit Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-gray-400">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Our offerings
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Newsroom
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Investors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  AI
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Gift cards
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-semibold">Products</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Ride
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Drive
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Eat
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Uber for Business
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Uber Freight
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-semibold">Global citizenship</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Safety
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Diversity and Inclusion
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Sustainability
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center text-sm border-t pt-4">
          <p>&copy; 2025 Uber Technologies Inc.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-400">
              Accessibility
            </a>
            <a href="#" className="hover:text-gray-400">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
