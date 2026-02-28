import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Camp from './pages/Camp';
import Farm from './pages/Farm';
import Restaurant from './pages/Restaurant';
import Shop from './pages/Shop';
import Booking from './pages/Booking';
import './App.css';

function App() {
  return (
    <CartProvider>
      <BookingProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/camp" element={<Camp />} />
                <Route path="/farm" element={<Farm />} />
                <Route path="/restaurant" element={<Restaurant />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/book" element={<Booking />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </BookingProvider>
    </CartProvider>
  );
}

export default App;
