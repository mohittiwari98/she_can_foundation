import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ContactForm from "./ContactForm";
import AdminPanel from "./AdminPanel";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-lg">
              S
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">
                She Can Foundation
              </h1>
              <p className="text-xs text-gray-500">
                Empowering Women
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-pink-50 hover:text-pink-600 transition-all duration-300"
            >
              Contact
            </Link>

            <Link
              to="/admin"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <Routes>
          <Route path="/" element={<ContactForm />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;