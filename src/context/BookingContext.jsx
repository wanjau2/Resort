import { createContext, useContext, useReducer, useEffect } from 'react';

const BookingContext = createContext();

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_BOOKING':
      return {
        ...state,
        bookings: [...state.bookings, { 
          ...action.payload, 
          id: Date.now(),
          createdAt: new Date().toISOString(),
          status: 'pending'
        }]
      };
    case 'UPDATE_BOOKING_STATUS':
      return {
        ...state,
        bookings: state.bookings.map(booking =>
          booking.id === action.payload.id
            ? { ...booking, status: action.payload.status }
            : booking
        )
      };
    case 'CANCEL_BOOKING':
      return {
        ...state,
        bookings: state.bookings.map(booking =>
          booking.id === action.payload
            ? { ...booking, status: 'cancelled' }
            : booking
        )
      };
    case 'LOAD_BOOKINGS':
      return {
        ...state,
        bookings: action.payload
      };
    default:
      return state;
  }
};

const initialState = {
  bookings: []
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('resortBookings');
    if (savedBookings) {
      dispatch({ type: 'LOAD_BOOKINGS', payload: JSON.parse(savedBookings) });
    }
  }, []);

  // Save bookings to localStorage on change
  useEffect(() => {
    localStorage.setItem('resortBookings', JSON.stringify(state.bookings));
  }, [state.bookings]);

  const addBooking = (bookingData) => {
    dispatch({ type: 'ADD_BOOKING', payload: bookingData });
    return true;
  };

  const cancelBooking = (bookingId) => {
    dispatch({ type: 'CANCEL_BOOKING', payload: bookingId });
  };

  const updateBookingStatus = (bookingId, status) => {
    dispatch({ type: 'UPDATE_BOOKING_STATUS', payload: { id: bookingId, status } });
  };

  const getBookingsByType = (type) => {
    return state.bookings.filter(booking => booking.type === type);
  };

  const getActiveBookings = () => {
    return state.bookings.filter(booking => 
      booking.status !== 'cancelled' && booking.status !== 'completed'
    );
  };

  return (
    <BookingContext.Provider value={{
      bookings: state.bookings,
      addBooking,
      cancelBooking,
      updateBookingStatus,
      getBookingsByType,
      getActiveBookings
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
