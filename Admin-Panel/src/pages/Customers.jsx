import { useState } from 'react';
import { Plus, Search, Edit, Trash2, User, Mail, Phone, X } from 'lucide-react';

function Customers() {
  const [customers, setCustomers] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210" },
    { id: 2, name: "Sneha Patil", email: "sneha@gmail.com", phone: "9123456780" },
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open modal for adding new customer
  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setFormData({ name: '', email: '', phone: '' });
    setShowModal(true);
  };

  // Open modal for editing customer
  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone
    });
    setShowModal(true);
  };

  // Save customer (add or update)
  const handleSaveCustomer = () => {
    if (editingCustomer) {
      // Update existing customer
      setCustomers(customers.map(c => 
        c.id === editingCustomer.id 
          ? { ...c, ...formData }
          : c
      ));
    } else {
      // Add new customer
      const newCustomer = {
        id: customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1,
        ...formData
      };
      setCustomers([...customers, newCustomer]);
    }
    setShowModal(false);
    setFormData({ name: '', email: '', phone: '' });
    setEditingCustomer(null);
  };

  // Delete customer
  const handleDeleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  // Filter customers based on search
  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  return (
    <div className="container-fluid px-4 py-3">
      {/* Header Section */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1 fw-bold" style={{ color: '#1a2332' }}>
            <User className="me-2" size={28} />
            Customers
          </h2>
          <p className="text-muted mb-0">Manage your customer relationships</p>
        </div>
        <button 
          className="btn btn-primary px-4 py-2 shadow-sm"
          onClick={handleAddCustomer}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '10px'
          }}
        >
          <Plus size={20} className="me-2" />
          Add Customer
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="input-group" style={{ maxWidth: '400px' }}>
          <span className="input-group-text bg-white border-end-0">
            <Search size={20} className="text-muted" />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ borderRadius: '0 10px 10px 0' }}
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="card shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead style={{ background: '#f8f9fa' }}>
              <tr>
                <th className="py-3 px-4" style={{ fontWeight: '600', color: '#495057' }}>#</th>
                <th className="py-3 px-4" style={{ fontWeight: '600', color: '#495057' }}>Customer Name</th>
                <th className="py-3 px-4" style={{ fontWeight: '600', color: '#495057' }}>Email</th>
                <th className="py-3 px-4" style={{ fontWeight: '600', color: '#495057' }}>Phone</th>
                <th className="py-3 px-4 text-center" style={{ fontWeight: '600', color: '#495057' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((c, index) => (
                  <tr key={c.id} style={{ transition: 'all 0.2s' }}>
                    <td className="py-3 px-4 fw-bold text-muted">{index + 1}</td>
                    <td className="py-3 px-4">
                      <div className="d-flex align-items-center">
                        <div 
                          className="rounded-circle me-2 d-flex align-items-center justify-content-center"
                          style={{
                            width: '40px',
                            height: '40px',
                            background: `linear-gradient(135deg, ${['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a'][index % 5]} 0%, ${['#764ba2', '#f5576c', '#00f2fe', '#38f9d7', '#fee140'][index % 5]} 100%)`,
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '16px'
                          }}
                        >
                          {c.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </div>
                        <span className="fw-semibold">{c.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Mail size={16} className="text-muted me-2" />
                      {c.email}
                    </td>
                    <td className="py-3 px-4">
                      <Phone size={16} className="text-muted me-2" />
                      {c.phone}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEditCustomer(c)}
                        style={{ borderRadius: '8px', border: 'none', background: '#e7f5ff' }}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteCustomer(c.id)}
                        style={{ borderRadius: '8px', border: 'none', background: '#fff5f5' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: '20px', border: 'none' }}>
              <div className="modal-header" style={{ borderBottom: 'none', padding: '1.5rem 1.5rem 0' }}>
                <h5 className="modal-title fw-bold" style={{ color: '#1a2332' }}>
                  {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body" style={{ padding: '1.5rem' }}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <User size={18} className="text-muted" />
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      name="name"
                      placeholder="Enter customer name"
                      value={formData.name}
                      onChange={handleInputChange}
                      style={{ borderRadius: '0 8px 8px 0' }}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <Mail size={18} className="text-muted" />
                    </span>
                    <input
                      type="email"
                      className="form-control border-start-0"
                      name="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      style={{ borderRadius: '0 8px 8px 0' }}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Phone Number</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <Phone size={18} className="text-muted" />
                    </span>
                    <input
                      type="tel"
                      className="form-control border-start-0"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={{ borderRadius: '0 8px 8px 0' }}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer" style={{ borderTop: 'none', padding: '0 1.5rem 1.5rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary px-4"
                  onClick={() => setShowModal(false)}
                  style={{ borderRadius: '10px' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary px-4"
                  onClick={handleSaveCustomer}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '10px'
                  }}
                >
                  {editingCustomer ? 'Update' : 'Save'} Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customers;