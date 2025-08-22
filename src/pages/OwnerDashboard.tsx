import React, { useState } from 'react';
import { BarChart3, Users, DollarSign, TrendingUp, Edit, Plus, Trash2 } from 'lucide-react';
import { getMenuItems } from '../data/mockData';
import QRCode from 'qrcode';

const OwnerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'menu' | 'staff' | 'qr'>('analytics');
  const [menuItems, setMenuItems] = useState(getMenuItems());
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState<any>({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: 'Starters',
    tags: [],
    rating: 0,
    reviewCount: 0,
    available: true,
    preparationTime: 10,
    allergens: []
  });
  const [qrTable, setQrTable] = useState<string>('1');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  // const restaurant = getRestaurant();

  // Mock analytics data
  const analyticsData = {
    totalOrders: 1247,
    totalRevenue: 45678.90,
    averageOrderValue: 36.67,
    peakHours: [
      { hour: '12:00 PM', orders: 45 },
      { hour: '1:00 PM', orders: 52 },
      { hour: '2:00 PM', orders: 38 },
      { hour: '6:00 PM', orders: 67 },
      { hour: '7:00 PM', orders: 89 },
      { hour: '8:00 PM', orders: 76 },
      { hour: '9:00 PM', orders: 54 }
    ],
    topDishes: [
      { name: 'Butter Chicken', orders: 234, revenue: 4446.00 },
      { name: 'Biryani', orders: 189, revenue: 4334.22 },
      { name: 'Paneer Tikka', orders: 156, revenue: 1716.00 },
      { name: 'Chicken Tikka', orders: 145, revenue: 1885.00 },
      { name: 'Gulab Jamun', orders: 134, revenue: 1072.00 }
    ],
    dailyStats: [
      { day: 'Mon', orders: 156, revenue: 5723.45 },
      { day: 'Tue', orders: 142, revenue: 5218.90 },
      { day: 'Wed', orders: 167, revenue: 6134.67 },
      { day: 'Thu', orders: 189, revenue: 6945.23 },
      { day: 'Fri', orders: 234, revenue: 8592.34 },
      { day: 'Sat', orders: 198, revenue: 7267.89 },
      { day: 'Sun', orders: 161, revenue: 5910.42 }
    ]
  };

  const staffMembers = [
    {
      id: '1',
      name: 'Chef Rajesh Kumar',
      role: 'Head Chef',
      email: 'rajesh@spicegarden.com',
      phone: '+1 (555) 123-4567',
      status: 'active',
      joinDate: '2022-03-15'
    },
    {
      id: '2',
      name: 'Chef Priya Sharma',
      role: 'Sous Chef',
      email: 'priya@spicegarden.com',
      phone: '+1 (555) 123-4568',
      status: 'active',
      joinDate: '2022-06-20'
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      role: 'Server',
      email: 'sarah@spicegarden.com',
      phone: '+1 (555) 123-4569',
      status: 'active',
      joinDate: '2023-01-10'
    },
    {
      id: '4',
      name: 'Mike Chen',
      role: 'Server',
      email: 'mike@spicegarden.com',
      phone: '+1 (555) 123-4570',
      status: 'active',
      joinDate: '2023-02-15'
    }
  ];

  const handleEditItem = (item: any) => {
    setEditingItem({ ...item });
    setShowEditModal(true);
  };

  const handleSaveItem = () => {
    if (editingItem) {
      setMenuItems(prev => prev.map(item => 
        item.id === editingItem.id ? editingItem : item
      ));
      setShowEditModal(false);
      setEditingItem(null);
    }
  };

  const handleDeleteItem = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setMenuItems(prev => prev.filter(item => item.id !== itemId));
    }
  };

  const toggleItemAvailability = (itemId: string) => {
    setMenuItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, available: !item.available } : item
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">👑</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Owner Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Business Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600 dark:text-gray-400">Today's Revenue</div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  ₹{(analyticsData.dailyStats[new Date().getDay() - 1]?.revenue || 0).toFixed(0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              {[
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                { id: 'menu', label: 'Menu Management', icon: TrendingUp },
                { id: 'staff', label: 'Staff Management', icon: Users },
                { id: 'qr', label: 'Table QR', icon: QrCode }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                    activeTab === id
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="min-h-[600px]">
          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Orders', value: analyticsData.totalOrders, icon: BarChart3, color: 'bg-blue-500' },
                  { label: 'Total Revenue', value: `₹${analyticsData.totalRevenue.toFixed(0)}`, icon: DollarSign, color: 'bg-green-500' },
                  { label: 'Avg Order Value', value: `₹${analyticsData.averageOrderValue.toFixed(0)}`, icon: QrCode, color: 'bg-purple-500' },
                  { label: 'Active Staff', value: staffMembers.length, icon: Users, color: 'bg-orange-500' }
                ].map((metric, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center mr-4`}>
                        <metric.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Peak Hours */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Peak Hours</h3>
                  <div className="space-y-3">
                    {analyticsData.peakHours.map((hour, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-16 text-sm text-gray-600 dark:text-gray-400">{hour.hour}</div>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div
                            className="bg-primary-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(hour.orders / Math.max(...analyticsData.peakHours.map(h => h.orders))) * 100}%` }}
                          />
                        </div>
                        <div className="w-12 text-right text-sm font-medium text-gray-900 dark:text-white">
                          {hour.orders}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Dishes */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Performing Dishes</h3>
                  <div className="space-y-3">
                    {analyticsData.topDishes.map((dish, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{dish.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{dish.orders} orders</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-primary-600 dark:text-primary-400">
                            ₹{dish.revenue.toFixed(0)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Weekly Revenue Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Revenue Trend</h3>
                <div className="flex items-end space-x-2 h-32">
                  {analyticsData.dailyStats.map((day, index) => {
                    const maxRevenue = Math.max(...analyticsData.dailyStats.map(d => d.revenue));
                    const height = (day.revenue / maxRevenue) * 100;
                    
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          ₹{day.revenue.toFixed(0)}
                        </div>
                        <div
                          className="w-full bg-gradient-to-t from-primary-500 to-primary-600 rounded-t transition-all duration-500"
                          style={{ height: `${height}%` }}
                        />
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{day.day}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Menu Management Tab */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Menu Management</h2>
                <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add New Item</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map(item => (
                  <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400';
                        }}
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.available 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {item.available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                          ₹{item.price.toFixed(0)}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {item.category}
                        </span>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="flex-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg transition-colors text-sm font-medium"
                        >
                          <Edit className="w-4 h-4 inline mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => toggleItemAvailability(item.id)}
                          className={`flex-1 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                            item.available
                              ? 'bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300'
                              : 'bg-green-100 hover:bg-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300'
                          }`}
                        >
                          {item.available ? 'Disable' : 'Enable'}
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="px-3 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Staff Management Tab */}
          {activeTab === 'staff' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Staff Management</h2>
                <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Staff Member</span>
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Staff Member
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {staffMembers.map((staff) => (
                        <tr key={staff.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{staff.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">Joined {staff.joinDate}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              {staff.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{staff.email}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{staff.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              {staff.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Table QR Tab */}
          {activeTab === 'qr' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Generate Table QR Codes</h2>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Table Number</label>
                    <select
                      value={qrTable}
                      onChange={(e) => setQrTable(e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      {Array.from({ length: 30 }, (_, i) => `${i + 1}`).map((t) => (
                        <option key={t} value={t}>Table {t}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={async () => {
                      const url = `${window.location.origin}/?table=${qrTable}`;
                      const dataUrl = await QRCode.toDataURL(url, { width: 512, margin: 1 });
                      setQrDataUrl(dataUrl);
                    }}
                    className="px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Generate QR
                  </button>
                </div>

                {qrDataUrl && (
                  <div className="mt-6 flex flex-col items-center">
                    <img src={qrDataUrl} alt={`QR for Table ${qrTable}`} className="w-48 h-48 bg-white p-2 rounded" />
                    <a href={qrDataUrl} download={`table-${qrTable}.png`} className="mt-3 text-primary-600 dark:text-primary-400 hover:underline">
                      Download QR for Table {qrTable}
                    </a>
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Scans will open: {window.location.origin}/?table={qrTable}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Item Modal */}
      {showEditModal && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Menu Item</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <span className="sr-only">Close</span>
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Item Name
                </label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Starters">Starters</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Breads">Breads</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="available"
                  checked={editingItem.available}
                  onChange={(e) => setEditingItem({ ...editingItem, available: e.target.checked })}
                  className="w-4 h-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="available" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Available for ordering
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSaveItem}
                  className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Menu Item</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <span className="sr-only">Close</span>
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Item Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Starters">Starters</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Breads">Breads</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
                <input
                  type="url"
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Paste an image URL for now. File upload can be added later.</p>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="available_new"
                  checked={newItem.available}
                  onChange={(e) => setNewItem({ ...newItem, available: e.target.checked })}
                  className="w-4 h-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="available_new" className="text-sm font-medium text-gray-700 dark:text-gray-300">Available for ordering</label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    const id = Math.random().toString(36).slice(2, 9);
                    const item = { ...newItem, id };
                    setMenuItems(prev => [item, ...prev]);
                    setShowAddModal(false);
                    setNewItem({
                      name: '', description: '', price: 0, image: '', category: 'Starters', tags: [], rating: 0, reviewCount: 0, available: true, preparationTime: 10, allergens: []
                    });
                  }}
                  className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
                >
                  Add Item
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
