import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { Link } from 'react-router-dom';
import { useTableStore } from '../stores/tableStore';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const { tableNumber } = useTableStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (itemId: string, change: number) => {
    const currentItem = items.find(item => item.item.id === itemId);
    if (currentItem) {
      const newQuantity = currentItem.quantity + change;
      if (newQuantity <= 0) {
        removeItem(itemId);
      } else {
        updateQuantity(itemId, newQuantity);
      }
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);
    // Simulate order processing
    setTimeout(() => {
      navigate('/payment');
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Looks like you haven't added any delicious items yet!
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <ShoppingBag className="w-8 h-8 text-primary-500" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Cart {tableNumber ? `(Table ${tableNumber})` : ''}</h1>
        </div>
        <button
          onClick={clearCart}
          className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((cartItem) => (
            <div
              key={cartItem.item.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex space-x-4">
                {/* Item Image */}
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400';
                    }}
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {cartItem.item.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                    {cartItem.item.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {cartItem.item.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    ₹{cartItem.item.price.toFixed(0)}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                    <button
                      onClick={() => handleQuantityChange(cartItem.item.id, -1)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 text-sm font-medium min-w-[30px] text-center">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(cartItem.item.id, 1)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeItem(cartItem.item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Notes */}
              {cartItem.notes && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Notes:</span> {cartItem.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Items ({items.length})</span>
                <span className="text-gray-900 dark:text-white">
                  ₹{getTotalPrice().toFixed(0)}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span className="text-gray-900 dark:text-white">
                  ₹{(getTotalPrice() * 0.05).toFixed(0)}
                </span>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-primary-600 dark:text-primary-400">
                    ₹{(getTotalPrice() * 1.05).toFixed(0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut || items.length === 0}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                isCheckingOut || items.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                  : 'bg-primary-500 hover:bg-primary-600 text-white'
              }`}
            >
              {isCheckingOut ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                `Proceed to Checkout (${items.length} items)`
              )}
            </button>

            {/* Continue Shopping */}
            <Link
              to="/"
              className="block w-full text-center mt-3 py-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
