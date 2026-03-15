import { createContext, useContext, useReducer, useEffect } from 'react';
import { adminService } from '../services/adminService';

const BookingContext = createContext();

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_BOOKING':
      return {
        ...state,
        bookings: [action.payload, ...state.bookings]
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

  useEffect(() => {
    let isMounted = true;

    const loadBookings = async () => {
      try {
        const bookings = await adminService.getBookings();
        if (isMounted) {
          dispatch({ type: 'LOAD_BOOKINGS', payload: bookings });
        }
      } catch (error) {
        console.error('Unable to load bookings', error);
      }
    };

    loadBookings();

    return () => {
      isMounted = false;
    };
  }, []);

  const addBooking = async (bookingData) => {
    const savedBooking = await adminService.createBooking(bookingData);
    dispatch({ type: 'ADD_BOOKING', payload: savedBooking });
    return savedBooking;
  };

  const cancelBooking = async (bookingId) => {
    await adminService.updateBookingStatus(bookingId, 'cancelled');
    dispatch({ type: 'CANCEL_BOOKING', payload: bookingId });
  };

  const updateBookingStatus = async (bookingId, status) => {
    await adminService.updateBookingStatus(bookingId, status);
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
