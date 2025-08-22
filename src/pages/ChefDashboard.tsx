import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, Play, Users, AlertCircle } from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  items: Array<{
    name: string;
    quantity: number;
    notes?: string;
    etaMinutes?: number;
  }>;
  total: number;
  status: 'pending' | 'approved' | 'cooking' | 'ready' | 'served';
  createdAt: Date;
  estimatedTime: number;
  customerNotes?: string;
  tableNumber?: string;
}

const ChefDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      customerName: 'John Doe',
      items: [
        { name: 'Butter Chicken', quantity: 2, notes: 'Extra spicy', etaMinutes: 18 },
        { name: 'Naan', quantity: 3, etaMinutes: 6 },
        { name: 'Mango Lassi', quantity: 2, etaMinutes: 3 }
      ],
      total: 45.97,
      status: 'pending',
      createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      estimatedTime: 25,
      customerNotes: 'Please make it extra spicy',
      tableNumber: '12'
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      items: [
        { name: 'Paneer Tikka', quantity: 1, etaMinutes: 15 },
        { name: 'Dal Makhani', quantity: 1, etaMinutes: 20 },
        { name: 'Roti', quantity: 2, etaMinutes: 5 }
      ],
      total: 28.96,
      status: 'approved',
      createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      estimatedTime: 20,
      tableNumber: '8'
    },
    {
      id: '3',
      customerName: 'Mike Johnson',
      items: [
        { name: 'Biryani', quantity: 1, etaMinutes: 25 },
        { name: 'Gulab Jamun', quantity: 2, etaMinutes: 5 }
      ],
      total: 30.98,
      status: 'cooking',
      createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      estimatedTime: 30,
      tableNumber: '15'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const updateEstimatedTime = (orderId: string, newTime: number) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, estimatedTime: newTime } : order
    ));
  };
  const updateItemEta = (orderId: string, itemIndex: number, newTime: number) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      const newItems = order.items.map((it, idx) => idx === itemIndex ? { ...it, etaMinutes: newTime } : it);
      return { ...order, items: newItems };
    }));
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'approved': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'cooking': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      case 'ready': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'served': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'approved': return <Play className="w-4 h-4" />;
      case 'cooking': return <Clock className="w-4 h-4" />;
      case 'ready': return <CheckCircle className="w-4 h-4" />;
      case 'served': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getOrdersByStatus = (status: Order['status']) => {
    return orders.filter(order => order.status === status);
  };

  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours}h ${diffInMinutes % 60}m ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">👨‍🍳</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Chef Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Kitchen Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Orders</div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {orders.filter(o => ['pending', 'approved', 'cooking'].includes(o.status)).length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Pending', count: getOrdersByStatus('pending').length, color: 'bg-yellow-500' },
            { label: 'Approved', count: getOrdersByStatus('approved').length, color: 'bg-blue-500' },
            { label: 'Cooking', count: getOrdersByStatus('cooking').length, color: 'bg-orange-500' },
            { label: 'Ready', count: getOrdersByStatus('ready').length, color: 'bg-green-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mr-4`}>
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.count}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Orders by Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Orders */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <span>Pending Approval</span>
            </h2>
            
            {getOrdersByStatus('pending').map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusUpdate={updateOrderStatus}
                onTimeUpdate={updateEstimatedTime}
                getTimeAgo={getTimeAgo}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
                formatTime={formatTime}
                onViewDetails={() => {
                  setSelectedOrder(order);
                  setShowOrderDetails(true);
                }}
              />
            ))}
            
            {getOrdersByStatus('pending').length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No pending orders
              </div>
            )}
          </div>

          {/* Approved & Cooking Orders */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span>In Progress</span>
            </h2>
            
            {[...getOrdersByStatus('approved'), ...getOrdersByStatus('cooking')].map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusUpdate={updateOrderStatus}
                onTimeUpdate={updateEstimatedTime}
                getTimeAgo={getTimeAgo}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
                formatTime={formatTime}
                onViewDetails={() => {
                  setSelectedOrder(order);
                  setShowOrderDetails(true);
                }}
              />
            ))}
            
            {[...getOrdersByStatus('approved'), ...getOrdersByStatus('cooking')].length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No orders in progress
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Order Details
              </h2>
              <button
                onClick={() => setShowOrderDetails(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Order Info */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Order ID:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{selectedOrder.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Table:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{selectedOrder.tableNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Customer:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{selectedOrder.customerName}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Total:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">₹{selectedOrder.total.toFixed(0)}</span>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {item.quantity}x {item.name}
                        </div>
                        {item.notes && (
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Note: {item.notes}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">ETA (min)</span>
                        <input
                          type="number"
                          min={1}
                          className="w-20 px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          value={item.etaMinutes || 1}
                          onChange={(e) => updateItemEta(selectedOrder.id, index, Math.max(1, parseInt(e.target.value || '1', 10)))}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Notes */}
              {selectedOrder.customerNotes && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Customer Notes</h3>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="text-yellow-800 dark:text-yellow-200">{selectedOrder.customerNotes}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-3">
                {selectedOrder.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, 'approved');
                        setShowOrderDetails(false);
                      }}
                      className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 inline mr-2" />
                      Approve Order
                    </button>
                    <button
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, 'served');
                        setShowOrderDetails(false);
                      }}
                      className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                    >
                      <XCircle className="w-4 h-4 inline mr-2" />
                      Reject Order
                    </button>
                  </>
                )}
                
                {selectedOrder.status === 'approved' && (
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, 'cooking');
                      setShowOrderDetails(false);
                    }}
                    className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                  >
                    <Play className="w-4 h-4 inline mr-2" />
                    Start Cooking
                  </button>
                )}
                
                {selectedOrder.status === 'cooking' && (
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, 'ready');
                      setShowOrderDetails(false);
                    }}
                    className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 inline mr-2" />
                    Mark as Ready
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface OrderCardProps {
  order: Order;
  onStatusUpdate: (orderId: string, status: Order['status']) => void;
  onTimeUpdate: (orderId: string, time: number) => void;
  getTimeAgo: (date: Date) => string;
  getStatusColor: (status: Order['status']) => string;
  getStatusIcon: (status: Order['status']) => React.ReactNode;
  formatTime: (minutes: number) => string;
  onViewDetails: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onStatusUpdate,
  onTimeUpdate,
  getTimeAgo,
  getStatusColor,
  getStatusIcon,
  formatTime,
  onViewDetails
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              <span className="ml-1 capitalize">{order.status}</span>
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {getTimeAgo(order.createdAt)}
            </span>
          </div>
          
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
            {order.customerName} - Table {order.tableNumber}
          </h3>
          
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {order.items.length} items • ${order.total.toFixed(2)}
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Items: {order.items.map(item => `${item.quantity}x ${item.name}${item.etaMinutes ? ` (${item.etaMinutes}m)` : ''}`).join(', ')}
          </div>
        </div>
        
        <button
          onClick={onViewDetails}
          className="px-3 py-1 text-sm bg-primary-100 hover:bg-primary-200 dark:bg-primary-900/20 dark:hover:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg transition-colors"
        >
          View
        </button>
      </div>

      {/* Estimated Time */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">ETA:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {formatTime(order.estimatedTime)}
          </span>
        </div>
        
        {/* Quick Actions */}
        <div className="flex space-x-2">
          {/* Manual ETA input */}
          <div className="flex items-center gap-2 mr-2">
            <input
              type="number"
              min={1}
              className="w-20 px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={order.estimatedTime}
              onChange={(e) => onTimeUpdate(order.id, Math.max(1, parseInt(e.target.value || '1', 10)))}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">min</span>
          </div>
          {order.status === 'pending' && (
            <>
              <button
                onClick={() => onStatusUpdate(order.id, 'approved')}
                className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                title="Approve Order"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => onStatusUpdate(order.id, 'served')}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title="Reject Order"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </>
          )}
          
          {order.status === 'approved' && (
            <button
              onClick={() => onStatusUpdate(order.id, 'cooking')}
              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              title="Start Cooking"
            >
              <Play className="w-4 h-4" />
            </button>
          )}
          
          {order.status === 'cooking' && (
            <button
              onClick={() => onStatusUpdate(order.id, 'ready')}
              className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
              title="Mark as Ready"
            >
              <CheckCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;
