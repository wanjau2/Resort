import { useState } from 'react';
import { Calendar, Users, BedDouble, Tent, UtensilsCrossed, MapPin, Phone, Mail, CheckCircle, X, Clock, AlertCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import './Booking.css';

const Booking = () => {
  const { addBooking, bookings, cancelBooking } = useBooking();
  const [bookingType, setBookingType] = useState('room');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showMyBookings, setShowMyBookings] = useState(false);
  const [lastBooking, setLastBooking] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    roomType: '',
    campSite: '',
    time: '',
    specialRequests: ''
  });

  const roomTypes = [
    { value: 'valley-suite', label: 'Valley View Suite', price: 189 },
    { value: 'forest-cabin', label: 'Forest Cabin', price: 159 },
    { value: 'lake-house', label: 'Lake House', price: 249 },
    { value: 'garden-room', label: 'Garden Room', price: 129 },
    { value: 'treehouse', label: 'Treehouse Retreat', price: 199 },
    { value: 'family-lodge', label: 'Family Lodge', price: 289 }
  ];

  const campSites = [
    { value: 'riverside', label: 'Riverside Camp', price: 45 },
    { value: 'forest', label: 'Forest Clearing', price: 35 },
    { value: 'meadow', label: 'Meadow View', price: 40 },
    { value: 'glamping', label: 'Glamping Tent', price: 95 }
  ];

  const timeSlots = [
    { value: 'lunch', label: 'Grill Lunch (12:00 PM - 3:30 PM)' },
    { value: 'early-evening', label: 'Early Evening Grill (4:00 PM - 6:30 PM)' },
    { value: 'dinner', label: 'Smokehouse Dinner (6:30 PM - 10:00 PM)' }
  ];

  const isFoodBooking = (type) => type === 'bbq' || type === 'restaurant';

  const formatBookingType = (type) => {
    if (type === 'bbq' || type === 'restaurant') return 'BBQ';
    if (type === 'room') return 'Room';
    if (type === 'camp') return 'Camping';
    return type;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const getSelectedPrice = () => {
    if (bookingType === 'room') {
      const room = roomTypes.find(r => r.value === formData.roomType);
      return room ? room.price : 0;
    } else if (bookingType === 'camp') {
      const site = campSites.find(s => s.value === formData.campSite);
      return site ? site.price : 0;
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const pricePerNight = getSelectedPrice();
    let total = nights * pricePerNight;
    
    // Apply 10% discount for 3+ nights
    if (nights >= 3) {
      total = total * 0.9;
    }
    
    return total;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const bookingData = {
      type: bookingType,
      ...formData,
      nights: !isFoodBooking(bookingType) ? calculateNights() : null,
      pricePerNight: getSelectedPrice(),
      total: calculateTotal(),
      accommodation: bookingType === 'room' 
        ? roomTypes.find(r => r.value === formData.roomType)?.label 
        : bookingType === 'camp' 
          ? campSites.find(s => s.value === formData.campSite)?.label 
          : `Table for ${formData.guests}`,
      timeSlot: isFoodBooking(bookingType) ? timeSlots.find(t => t.value === formData.time)?.label : null
    };

    try {
      const savedBooking = await addBooking(bookingData);
      setLastBooking(savedBooking);
      setShowConfirmation(true);
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: 2,
        roomType: '',
        campSite: '',
        time: '',
        specialRequests: ''
      });
    } catch (error) {
      setSubmitError(error.message || 'We could not save your booking right now. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f39c12';
      case 'confirmed': return '#27ae60';
      case 'cancelled': return '#e74c3c';
      default: return '#666';
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-hero">
        <div className="booking-hero-content">
          <h1>Book Your Stay</h1>
          <p>Reserve your perfect getaway at Green Valley Resort</p>
        </div>
      </div>

      <section className="booking-section">
        <div className="container">
          <div className="booking-grid">
            <div className="booking-form-container">
              <div className="booking-type-tabs">
                <button
                  className={`type-tab ${bookingType === 'room' ? 'active' : ''}`}
                  onClick={() => setBookingType('room')}
                >
                  <BedDouble size={20} />
                  <span>Room Booking</span>
                </button>
                <button
                  className={`type-tab ${bookingType === 'camp' ? 'active' : ''}`}
                  onClick={() => setBookingType('camp')}
                >
                  <Tent size={20} />
                  <span>Camping Site</span>
                </button>
                <button
                  className={`type-tab ${bookingType === 'bbq' ? 'active' : ''}`}
                  onClick={() => setBookingType('bbq')}
                >
                  <UtensilsCrossed size={20} />
                  <span>BBQ</span>
                </button>
              </div>

              <form className="booking-form" onSubmit={handleSubmit}>
                <h2>
                  {bookingType === 'room' && 'Reserve a Room'}
                  {bookingType === 'camp' && 'Book a Campsite'}
                  {bookingType === 'bbq' && 'Reserve a BBQ Table'}
                </h2>
                {submitError && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                    padding: '0.9rem 1rem',
                    borderRadius: '14px',
                    background: '#fff0f0',
                    color: '#a23a3a'
                  }}>
                    <AlertCircle size={18} />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Number of Guests</label>
                    <div className="guest-input">
                      <Users size={18} />
                      <input
                        type="number"
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        min="1"
                        max="12"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{isFoodBooking(bookingType) ? 'Date' : 'Check-in Date'}</label>
                    <div className="date-input">
                      <Calendar size={18} />
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>
                  {!isFoodBooking(bookingType) && (
                    <div className="form-group">
                      <label>Check-out Date</label>
                      <div className="date-input">
                        <Calendar size={18} />
                        <input
                          type="date"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleInputChange}
                          min={formData.checkIn || new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                    </div>
                  )}
                  {isFoodBooking(bookingType) && (
                    <div className="form-group">
                      <label>Preferred Time</label>
                      <select 
                        name="time" 
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select time</option>
                        {timeSlots.map(slot => (
                          <option key={slot.value} value={slot.value}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {bookingType === 'room' && (
                  <div className="form-group full-width">
                    <label>Room Type</label>
                    <select
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a room</option>
                      {roomTypes.map(room => (
                        <option key={room.value} value={room.value}>
                          {room.label} - ${room.price}/night
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {bookingType === 'camp' && (
                  <div className="form-group full-width">
                    <label>Campsite Type</label>
                    <select
                      name="campSite"
                      value={formData.campSite}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a campsite</option>
                      {campSites.map(site => (
                        <option key={site.value} value={site.value}>
                          {site.label} - ${site.price}/night
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="form-group full-width">
                  <label>Special Requests</label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Any special requirements or requests..."
                    rows="4"
                  />
                </div>

                {/* Price Summary */}
                {!isFoodBooking(bookingType) && calculateNights() > 0 && getSelectedPrice() > 0 && (
                  <div className="price-summary">
                    <div className="price-row">
                      <span>${getSelectedPrice()} x {calculateNights()} night{calculateNights() > 1 ? 's' : ''}</span>
                      <span>${getSelectedPrice() * calculateNights()}</span>
                    </div>
                    {calculateNights() >= 3 && (
                      <div className="price-row discount">
                        <span>10% discount (3+ nights)</span>
                        <span>-${(getSelectedPrice() * calculateNights() * 0.1).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="price-row total">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <button type="submit" className="submit-btn">
                  Submit Reservation
                </button>
              </form>
            </div>

            <div className="booking-sidebar">
              {/* My Bookings Button */}
              {bookings.length > 0 && (
                <button 
                  className="my-bookings-btn"
                  onClick={() => setShowMyBookings(true)}
                >
                  <Clock size={18} />
                  View My Bookings ({bookings.length})
                </button>
              )}

              <div className="sidebar-card">
                <h3>Contact Us</h3>
                <p>Questions about your booking? We're here to help!</p>
                <div className="contact-items">
                  <div className="contact-item">
                    <Phone size={18} />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="contact-item">
                    <Mail size={18} />
                    <span>reservations@greenvalley.com</span>
                  </div>
                  <div className="contact-item">
                    <MapPin size={18} />
                    <span>123 Valley Road, Nature County</span>
                  </div>
                </div>
              </div>

              <div className="sidebar-card">
                <h3>Booking Policies</h3>
                <ul className="policy-list">
                  <li>Check-in time: 3:00 PM</li>
                  <li>Check-out time: 11:00 AM</li>
                  <li>Free cancellation up to 48 hours before arrival</li>
                  <li>50% deposit required at booking</li>
                  <li>Pets welcome in select accommodations</li>
                </ul>
              </div>

              <div className="sidebar-card highlight">
                <h3>Special Offers</h3>
                <div className="offer">
                  <span className="offer-badge">10% OFF</span>
                  <p>Book 3+ nights and save 10% on your stay!</p>
                </div>
                <div className="offer">
                  <span className="offer-badge">FREE</span>
                  <p>Complimentary farm tour with every 2+ night booking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showConfirmation && lastBooking && (
        <>
          <div className="modal-overlay" onClick={() => setShowConfirmation(false)}></div>
          <div className="confirmation-modal">
            <button className="modal-close" onClick={() => setShowConfirmation(false)}>
              <X size={24} />
            </button>
            <div className="modal-icon success">
              <CheckCircle size={48} />
            </div>
            <h2>Booking Confirmed!</h2>
            <p>Thank you, {lastBooking.name}! Your reservation has been submitted.</p>
            
            <div className="booking-details">
              <div className="detail-row">
                <span>Booking Type:</span>
                <span>{formatBookingType(lastBooking.type)}</span>
              </div>
              <div className="detail-row">
                <span>Accommodation:</span>
                <span>{lastBooking.accommodation}</span>
              </div>
              {!isFoodBooking(lastBooking.type) ? (
                <>
                  <div className="detail-row">
                    <span>Check-in:</span>
                    <span>{new Date(lastBooking.checkIn).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-row">
                    <span>Check-out:</span>
                    <span>{new Date(lastBooking.checkOut).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-row">
                    <span>Nights:</span>
                    <span>{lastBooking.nights}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="detail-row">
                    <span>Date:</span>
                    <span>{new Date(lastBooking.checkIn).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-row">
                    <span>Time:</span>
                    <span>{lastBooking.timeSlot}</span>
                  </div>
                </>
              )}
              <div className="detail-row">
                <span>Guests:</span>
                <span>{lastBooking.guests}</span>
              </div>
              {lastBooking.total > 0 && (
                <div className="detail-row total">
                  <span>Total:</span>
                  <span>${lastBooking.total.toFixed(2)}</span>
                </div>
              )}
            </div>
            
            <p className="confirmation-note">
              A confirmation email will be sent to {lastBooking.email}
            </p>
            
            <button 
              className="modal-btn"
              onClick={() => setShowConfirmation(false)}
            >
              Done
            </button>
          </div>
        </>
      )}

      {/* My Bookings Modal */}
      {showMyBookings && (
        <>
          <div className="modal-overlay" onClick={() => setShowMyBookings(false)}></div>
          <div className="bookings-modal">
            <button className="modal-close" onClick={() => setShowMyBookings(false)}>
              <X size={24} />
            </button>
            <h2>My Bookings</h2>
            
            <div className="bookings-list">
              {bookings.length === 0 ? (
                <p className="no-bookings">No bookings found.</p>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-card-header">
                      <span className="booking-type-badge">{formatBookingType(booking.type)}</span>
                      <span 
                        className="booking-status"
                        style={{ color: getStatusColor(booking.status) }}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <h4>{booking.accommodation}</h4>
                    <div className="booking-card-details">
                      {!isFoodBooking(booking.type) ? (
                        <p>
                          {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                          ({booking.nights} night{booking.nights > 1 ? 's' : ''})
                        </p>
                      ) : (
                        <p>
                          {new Date(booking.checkIn).toLocaleDateString()} - {booking.timeSlot}
                        </p>
                      )}
                      <p>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</p>
                      {booking.total > 0 && <p className="booking-total">Total: ${booking.total.toFixed(2)}</p>}
                    </div>
                    {booking.status === 'pending' && (
                      <button 
                        className="cancel-booking-btn"
                        onClick={() => cancelBooking(booking.id)}
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Booking;
