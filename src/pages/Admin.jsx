import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  Clock,
  DollarSign,
  LogOut,
  Package,
  PlusCircle,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { adminService } from '../services/adminService';
import { useAdminAuth } from '../context/AdminAuthContext';
import './Admin.css';

const emptyProductForm = {
  name: '',
  category: '',
  price: '',
  unit: '',
  image: '',
  inStock: true,
};

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const formatBookingType = (type) => {
  if (type === 'bbq' || type === 'restaurant') return 'BBQ';
  if (type === 'camp') return 'Camping';
  if (type === 'room') return 'Room';
  return type;
};

const Admin = () => {
  const [dashboard, setDashboard] = useState({
    products: [],
    bookings: [],
    orders: [],
    stats: {
      totalProducts: 0,
      totalBookings: 0,
      pendingBookings: 0,
      totalSales: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [productForm, setProductForm] = useState(emptyProductForm);

  const isLive = adminService.isUsingSupabase();

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await adminService.getDashboardData();
      setDashboard(data);
    } catch (loadError) {
      setError(loadError.message || 'Unable to load admin dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleProductChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProductForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCreateProduct = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError('');
      setSuccessMessage('');

      await adminService.createProduct({
        ...productForm,
        price: Number(productForm.price),
      });

      setProductForm(emptyProductForm);
      setSuccessMessage('Product saved successfully.');
      await loadDashboard();
    } catch (saveError) {
      setError(saveError.message || 'Unable to save product.');
    } finally {
      setSaving(false);
    }
  };

  const handleBookingStatusChange = async (bookingId, status) => {
    try {
      setError('');
      await adminService.updateBookingStatus(bookingId, status);
      await loadDashboard();
    } catch (statusError) {
      setError(statusError.message || 'Unable to update booking status.');
    }
  };

  const recentProducts = useMemo(() => dashboard.products.slice(0, 6), [dashboard.products]);
  const recentBookings = useMemo(() => dashboard.bookings.slice(0, 8), [dashboard.bookings]);
  const recentOrders = useMemo(() => dashboard.orders.slice(0, 6), [dashboard.orders]);

  const { user, signOut } = useAdminAuth();

  return (
    <div className="admin-page">
      <section className="admin-hero">
        <div className="container">
          <div className="admin-hero-content">
            <div>
              <span className="section-tag">Admin Portal</span>
              <h1>Resort Operations Dashboard</h1>
              <p>
                Manage bookings, monitor sales, and publish farm shop products from one place.
              </p>
            </div>
            <div className="admin-hero-actions">
              {user && (
                <span className="admin-user-badge">{user.email}</span>
              )}
              <button className="admin-refresh-btn" onClick={loadDashboard} disabled={loading}>
                <RefreshCw size={18} className={loading ? 'spin' : ''} />
                Refresh data
              </button>
              <button className="admin-signout-btn" onClick={signOut}>
                <LogOut size={18} />
                Sign out
              </button>
            </div>
          </div>

          <div className={`admin-mode-banner ${isLive ? 'live' : 'demo'}`}>
            <ShieldCheck size={18} />
            <span>
              {isLive
                ? 'Supabase is connected. Admin data is live.'
                : 'Demo mode: data is using local storage until Supabase credentials are added.'}
            </span>
          </div>

          {error && (
            <div className="admin-alert error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="admin-alert success">
              <PlusCircle size={18} />
              <span>{successMessage}</span>
            </div>
          )}
        </div>
      </section>

      <section className="admin-overview">
        <div className="container">
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-icon"><Package size={22} /></div>
              <div>
                <span className="stat-label">Products</span>
                <strong>{dashboard.stats.totalProducts}</strong>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon"><Clock size={22} /></div>
              <div>
                <span className="stat-label">Bookings</span>
                <strong>{dashboard.stats.totalBookings}</strong>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon"><AlertCircle size={22} /></div>
              <div>
                <span className="stat-label">Pending</span>
                <strong>{dashboard.stats.pendingBookings}</strong>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon"><DollarSign size={22} /></div>
              <div>
                <span className="stat-label">Sales</span>
                <strong>{currency.format(dashboard.stats.totalSales)}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-content">
        <div className="container">
          <div className="admin-grid">
            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h2>Add Product</h2>
                  <p>Create or publish new products for the farm shop.</p>
                </div>
              </div>

              <form className="admin-product-form" onSubmit={handleCreateProduct}>
                <div className="form-grid">
                  <label>
                    <span>Product name</span>
                    <input
                      type="text"
                      name="name"
                      value={productForm.name}
                      onChange={handleProductChange}
                      placeholder="Smoked Chili Jam"
                      required
                    />
                  </label>
                  <label>
                    <span>Category</span>
                    <input
                      type="text"
                      name="category"
                      value={productForm.category}
                      onChange={handleProductChange}
                      placeholder="Honey & Preserves"
                      required
                    />
                  </label>
                  <label>
                    <span>Price</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      name="price"
                      value={productForm.price}
                      onChange={handleProductChange}
                      placeholder="9.99"
                      required
                    />
                  </label>
                  <label>
                    <span>Unit</span>
                    <input
                      type="text"
                      name="unit"
                      value={productForm.unit}
                      onChange={handleProductChange}
                      placeholder="jar"
                      required
                    />
                  </label>
                  <label className="full-width">
                    <span>Image URL</span>
                    <input
                      type="url"
                      name="image"
                      value={productForm.image}
                      onChange={handleProductChange}
                      placeholder="https://..."
                      required
                    />
                  </label>
                  <label className="admin-checkbox full-width">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={productForm.inStock}
                      onChange={handleProductChange}
                    />
                    <span>Available in stock</span>
                  </label>
                </div>

                <button className="admin-submit-btn" type="submit" disabled={saving}>
                  <PlusCircle size={18} />
                  {saving ? 'Saving product...' : 'Save product'}
                </button>
              </form>
            </div>

            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h2>Recent Products</h2>
                  <p>Newest products currently available in the shop.</p>
                </div>
              </div>

              <div className="admin-list">
                {recentProducts.map((product) => (
                  <div key={product.id} className="admin-list-item product-item">
                    <img src={product.image} alt={product.name} />
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.category} • {product.unit}</p>
                    </div>
                    <div className="list-meta right">
                      <strong>{currency.format(product.price)}</strong>
                      <span className={`status-pill ${product.inStock ? 'confirmed' : 'cancelled'}`}>
                        {product.inStock ? 'In stock' : 'Out of stock'}
                      </span>
                    </div>
                  </div>
                ))}
                {!recentProducts.length && !loading && <p className="empty-state">No products yet.</p>}
              </div>
            </div>
          </div>

          <div className="admin-grid bottom-grid">
            <div className="admin-card wide-card">
              <div className="admin-card-header">
                <div>
                  <h2>Bookings</h2>
                  <p>Track incoming room, camping, and BBQ reservations.</p>
                </div>
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Guest</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Guests</th>
                      <th>Status</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>
                          <strong>{booking.name}</strong>
                          <span>{booking.accommodation}</span>
                        </td>
                        <td>{formatBookingType(booking.type)}</td>
                        <td>
                          {booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : '—'}
                        </td>
                        <td>{booking.guests}</td>
                        <td>
                          <select
                            value={booking.status}
                            onChange={(event) => handleBookingStatusChange(booking.id, event.target.value)}
                            className={`status-select ${booking.status}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td>{booking.total ? currency.format(booking.total) : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!recentBookings.length && !loading && <p className="empty-state table-empty">No bookings yet.</p>}
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h2>Recent Sales</h2>
                  <p>Latest paid or processing farm shop orders.</p>
                </div>
              </div>

              <div className="admin-list">
                {recentOrders.map((order) => (
                  <div key={order.id} className="admin-list-item">
                    <div>
                      <h3>{order.customerName}</h3>
                      <p>{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="list-meta right">
                      <strong>{currency.format(order.totalAmount)}</strong>
                      <span className={`status-pill ${order.status === 'paid' ? 'confirmed' : 'pending'}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
                {!recentOrders.length && !loading && <p className="empty-state">No sales recorded yet.</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
