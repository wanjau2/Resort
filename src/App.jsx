import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { BookingProvider } from './context/BookingContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Camp from './pages/Camp';
import Farm from './pages/Farm';
import Bbq from './pages/Restaurant';
import Shop from './pages/Shop';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import './App.css';

function App() {
  return (
    <CartProvider>
      <BookingProvider>
        <AdminAuthProvider>
          <Router>
            {/* Public site routes — wrapped with Navbar + Footer */}
            <Routes>
              <Route
                path="/*"
                element={
                  <div className="app">
                    <Navbar />
                    <main className="main-content">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/rooms" element={<Rooms />} />
                        <Route path="/camp" element={<Camp />} />
                        <Route path="/farm" element={<Farm />} />
                        <Route path="/bbq" element={<Bbq />} />
                        <Route path="/restaurant" element={<Navigate to="/bbq" replace />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/book" element={<Booking />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                }
              />
              {/* Admin routes — no Navbar/Footer */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <Admin />
                  </AdminRoute>
                }
              />
            </Routes>
          </Router>
        </AdminAuthProvider>
      </BookingProvider>
    </CartProvider>
  );
}

export default App;
