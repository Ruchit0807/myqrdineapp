import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Clock, CheckCircle, Utensils, Truck, Gamepad2, Menu } from 'lucide-react';
import { useOrderStore } from '../stores/orderStore';

const OrderTracker: React.FC = () => {
  const params = useParams();
  const order = useOrderStore((state) => state.orders.find(o => o.id === (params.orderId || '')));
  const orderStatus = (order?.status as 'pending' | 'approved' | 'cooking' | 'ready' | 'served') || 'pending';
  const estimatedTime = order?.estimatedTime ?? 25;
  const elapsedTime = 0;

  const statusSteps = [
    {
      key: 'ordered',
      label: 'Order Placed',
      description: 'Your order has been received',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      key: 'approved',
      label: 'Chef Approved',
      description: 'Kitchen is preparing your order',
      icon: Utensils,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      key: 'cooking',
      label: 'Cooking',
      description: 'Your food is being prepared',
      icon: Utensils,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    },
    {
      key: 'ready',
      label: 'Ready for Pickup',
      description: 'Your order is ready!',
      icon: Truck,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      key: 'served',
      label: 'Served',
      description: 'Enjoy your meal!',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    }
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.key === orderStatus);
  const progressPercentage = ((currentStepIndex + 1) / statusSteps.length) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const remainingTime = Math.max(0, estimatedTime - elapsedTime);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          📍 Live Order Tracker
        </h1>
        {!order && (
          <p className="text-xl text-gray-600 dark:text-gray-400">No order found. Please place an order from the menu.</p>
        )}
        {order && orderStatus === 'pending' && (
          <p className="text-xl text-gray-600 dark:text-gray-400">Your order is placed. Waiting for chef confirmation…</p>
        )}
        {order && orderStatus !== 'pending' && (
          <p className="text-xl text-gray-600 dark:text-gray-400">Track your order in real-time</p>
        )}
      </div>

      {/* Order Status Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {order ? `Order #${order.id}` : 'No Active Order'}
          </h2>
          {order && (
            <p className="text-gray-600 dark:text-gray-400">
              Placed at {new Date(order.createdAt).toLocaleTimeString()}
            </p>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Progress
            </span>
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Status Timeline */}
        <div className="space-y-6">
          {statusSteps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const Icon = step.icon;
            
            return (
              <div key={step.key} className="flex items-start space-x-4">
                {/* Status Icon */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted ? step.bgColor : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    isCompleted ? step.color : 'text-gray-400'
                  }`} />
                </div>

                {/* Status Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className={`text-lg font-semibold ${
                      isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.label}
                    </h3>
                    {isCurrent && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                          In Progress
                        </span>
                      </div>
                    )}
                  </div>
                  <p className={`text-sm ${
                    isCompleted ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
                  }`}>
                    {step.description}
                  </p>
                </div>

                {/* Status Indicator */}
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded-full"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time and Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-6 h-6 text-primary-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Time Information
            </h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Elapsed Time:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatTime(elapsedTime)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Estimated Time:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatTime(estimatedTime * 60)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Remaining:</span>
              <span className={`font-medium ${
                remainingTime <= 5 ? 'text-red-500' : 'text-gray-900 dark:text-white'
              }`}>
                {formatTime(remainingTime)}
              </span>
            </div>
          </div>

          {/* Waiting message for pending orders */}
          {orderStatus === 'pending' && (
            <div className="mt-4 w-full px-4 py-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-lg">
              Waiting for chef confirmation…
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          
          <div className="space-y-3">
            <Link
              to="/games"
              className="flex items-center space-x-3 p-3 bg-secondary-50 hover:bg-secondary-100 dark:bg-secondary-900/20 dark:hover:bg-secondary-900/30 rounded-lg transition-colors group"
            >
              <Gamepad2 className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
              <span className="text-secondary-700 dark:text-secondary-300 font-medium">
                Play Games While Waiting
              </span>
            </Link>
            
            <Link
              to="/"
              className="flex items-center space-x-3 p-3 bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/20 dark:hover:bg-primary-900/30 rounded-lg transition-colors group"
            >
              <Menu className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="text-primary-700 dark:text-primary-300 font-medium">
                Browse Menu
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Order Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Items Ordered:</h4>
            {!order && <div className="text-sm text-gray-500">No items</div>}
            {order && (
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {order.items.map((it, idx) => (
                  <li key={idx}>• {it.quantity}x {it.name}</li>
                ))}
              </ul>
            )}
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Order Summary:</h4>
            {!order && <div className="text-sm text-gray-500">No summary</div>}
            {order && (
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>• Total: ₹{order.total.toFixed(0)}</li>
                <li>• Payment: {order.paymentMethod === 'online' ? 'Online' : 'Cash'}</li>
                <li>• Table: {order.tableNumber || '-'}</li>
                <li>• Status: {order.status}</li>
                {order.estimatedTime && <li>• ETA: {order.estimatedTime} min</li>}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Notifications */}
      {orderStatus === 'ready' && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                Your Order is Ready! 🎉
              </h3>
              <p className="text-green-700 dark:text-green-300">
                Please collect your order from the counter. Enjoy your meal!
              </p>
            </div>
          </div>
        </div>
      )}

      {remainingTime <= 5 && remainingTime > 0 && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                Almost Ready! ⏰
              </h3>
              <p className="text-orange-700 dark:text-orange-300">
                Your order will be ready in just a few minutes. Get ready to enjoy!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracker;
