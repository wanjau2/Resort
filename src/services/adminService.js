import { defaultProducts } from '../data/defaultProducts';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const STORAGE_KEYS = {
  products: 'resortProducts',
  bookings: 'resortBookings',
  orders: 'resortOrders',
};

const demoOrders = [
  {
    id: 'ord-1001',
    customerName: 'Sarah Johnson',
    email: 'sarah@example.com',
    totalAmount: 84.97,
    status: 'paid',
    createdAt: '2026-03-12T14:20:00.000Z',
    itemsCount: 5,
  },
  {
    id: 'ord-1002',
    customerName: 'Mike Thompson',
    email: 'mike@example.com',
    totalAmount: 42.5,
    status: 'paid',
    createdAt: '2026-03-13T09:05:00.000Z',
    itemsCount: 3,
  },
  {
    id: 'ord-1003',
    customerName: 'Emily Chen',
    email: 'emily@example.com',
    totalAmount: 115.2,
    status: 'processing',
    createdAt: '2026-03-13T16:45:00.000Z',
    itemsCount: 7,
  },
];

const canUseStorage = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
const generateId = (prefix) => globalThis.crypto?.randomUUID?.() ?? `${prefix}-${Date.now()}`;

const getLocalData = (key, fallback) => {
  if (!canUseStorage) return fallback;

  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const setLocalData = (key, value) => {
  if (!canUseStorage) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

const normalizeProduct = (product) => ({
  id: product.id,
  name: product.name,
  price: Number(product.price),
  category: product.category,
  unit: product.unit,
  image: product.image,
  inStock: Boolean(product.inStock),
  createdAt: product.createdAt ?? new Date().toISOString(),
});

const mapDbProduct = (product) => ({
  id: product.id,
  name: product.name,
  price: Number(product.price),
  category: product.category,
  unit: product.unit,
  image: product.image_url,
  inStock: product.in_stock,
  createdAt: product.created_at,
});

const mapDbBooking = (booking) => ({
  id: booking.id,
  type: booking.booking_type,
  name: booking.guest_name,
  email: booking.email,
  phone: booking.phone,
  checkIn: booking.check_in,
  checkOut: booking.check_out,
  guests: booking.guests,
  accommodation: booking.accommodation,
  timeSlot: booking.time_slot,
  total: Number(booking.total ?? 0),
  status: booking.status,
  specialRequests: booking.special_requests,
  createdAt: booking.created_at,
});

const mapDbOrder = (order) => ({
  id: order.id,
  customerName: order.customer_name,
  email: order.email,
  totalAmount: Number(order.total_amount ?? 0),
  status: order.status,
  createdAt: order.created_at,
  itemsCount: order.items_count ?? 0,
});

const getLocalProducts = () => {
  const products = getLocalData(STORAGE_KEYS.products, defaultProducts);
  return products.map(normalizeProduct);
};

const getLocalBookings = () => {
  const bookings = getLocalData(STORAGE_KEYS.bookings, []);
  return bookings
    .map((booking) => ({
      ...booking,
      total: Number(booking.total ?? 0),
      createdAt: booking.createdAt ?? new Date().toISOString(),
    }))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const getLocalOrders = () => {
  const orders = getLocalData(STORAGE_KEYS.orders, demoOrders);
  return orders
    .map((order) => ({
      ...order,
      totalAmount: Number(order.totalAmount ?? 0),
    }))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const adminService = {
  isUsingSupabase() {
    return isSupabaseConfigured;
  },

  async getProducts() {
    if (!isSupabaseConfigured) {
      return getLocalProducts();
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(mapDbProduct);
  },

  async createProduct(product) {
    const payload = normalizeProduct(product);

    if (!isSupabaseConfigured) {
      const currentProducts = getLocalProducts();
      const newProduct = {
        ...payload,
        id: generateId('prod'),
        createdAt: new Date().toISOString(),
      };
      const updatedProducts = [newProduct, ...currentProducts];
      setLocalData(STORAGE_KEYS.products, updatedProducts);
      return newProduct;
    }

    const { data, error } = await supabase
      .from('products')
      .insert({
        name: payload.name,
        category: payload.category,
        unit: payload.unit,
        price: payload.price,
        image_url: payload.image,
        in_stock: payload.inStock,
      })
      .select()
      .single();

    if (error) throw error;

    return mapDbProduct(data);
  },

  async createBooking(booking) {
    const normalizedBooking = {
      ...booking,
      type: booking.type === 'restaurant' ? 'bbq' : booking.type,
      total: Number(booking.total ?? 0),
      createdAt: new Date().toISOString(),
      status: booking.status ?? 'pending',
    };

    if (!isSupabaseConfigured) {
      const existingBookings = getLocalBookings();
      const newBooking = {
        ...normalizedBooking,
        id: generateId('booking'),
      };
      setLocalData(STORAGE_KEYS.bookings, [newBooking, ...existingBookings]);
      return newBooking;
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        booking_type: normalizedBooking.type,
        guest_name: normalizedBooking.name,
        email: normalizedBooking.email,
        phone: normalizedBooking.phone,
        check_in: normalizedBooking.checkIn || null,
        check_out: normalizedBooking.checkOut || null,
        guests: normalizedBooking.guests,
        accommodation: normalizedBooking.accommodation,
        time_slot: normalizedBooking.timeSlot || null,
        total: normalizedBooking.total,
        status: normalizedBooking.status,
        special_requests: normalizedBooking.specialRequests || null,
      })
      .select()
      .single();

    if (error) throw error;

    return mapDbBooking(data);
  },

  async getBookings() {
    if (!isSupabaseConfigured) {
      return getLocalBookings();
    }

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(mapDbBooking);
  },

  async updateBookingStatus(id, status) {
    if (!isSupabaseConfigured) {
      const bookings = getLocalBookings().map((booking) =>
        String(booking.id) === String(id) ? { ...booking, status } : booking
      );
      setLocalData(STORAGE_KEYS.bookings, bookings);
      return bookings.find((booking) => String(booking.id) === String(id));
    }

    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return mapDbBooking(data);
  },

  async getOrders() {
    if (!isSupabaseConfigured) {
      return getLocalOrders();
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(mapDbOrder);
  },

  async getDashboardData() {
    const [products, bookings, orders] = await Promise.all([
      this.getProducts(),
      this.getBookings(),
      this.getOrders(),
    ]);

    const totalSales = orders
      .filter((order) => order.status !== 'cancelled')
      .reduce((sum, order) => sum + Number(order.totalAmount ?? 0), 0);

    return {
      products,
      bookings,
      orders,
      stats: {
        totalProducts: products.length,
        totalBookings: bookings.length,
        pendingBookings: bookings.filter((booking) => booking.status === 'pending').length,
        totalSales,
      },
    };
  },
};
