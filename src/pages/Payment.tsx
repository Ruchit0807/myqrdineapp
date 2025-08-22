import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { CreditCard, DollarSign, CheckCircle, Download, QrCode, Play } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { Link } from 'react-router-dom';
import { useTableStore } from '../stores/tableStore';

const Payment: React.FC = () => {
  // const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { tableNumber } = useTableStore();
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cash'>('online');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber] = useState(`ORD-${Date.now().toString().slice(-6)}`);

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handlePayment = async () => {
    if (items.length === 0) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setOrderConfirmed(true);
    clearCart();
  };

  const downloadReceipt = () => {
    // Simulate receipt download
    const receiptContent = `
QR DINE - DIGITAL RECEIPT
Order Number: ${orderNumber}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

ITEMS:
${items.map(item => `${item.quantity}x ${item.item.name} - ₹${(item.item.price * item.quantity).toFixed(0)}`).join('\n')}

Subtotal: ₹${subtotal.toFixed(0)}
Tax: ₹${tax.toFixed(0)}
Total: ₹${total.toFixed(0)}

Payment Method: ${paymentMethod === 'online' ? 'Online Payment' : 'Cash at Counter'}

Thank you for dining with us!
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${orderNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="bg-green-100 dark:bg-green-900/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Order Confirmed!
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Your order has been successfully placed. Order number: <span className="font-mono font-bold text-primary-600 dark:text-primary-400">{orderNumber}</span>
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            What's Next?
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <span className="text-primary-600 dark:text-primary-400 font-bold">1</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                Chef will review and approve your order
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <span className="text-primary-600 dark:text-primary-400 font-bold">2</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                Track your order in real-time
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <span className="text-primary-600 dark:text-primary-400 font-bold">3</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                Enjoy your meal!
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/tracker"
            className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
          >
            <Play className="w-5 h-5 mr-2" />
            Track Order
          </Link>
          
          <Link
            to="/games"
            className="inline-flex items-center px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg transition-colors"
          >
            🎮 Play Games
          </Link>
          
          <button
            onClick={downloadReceipt}
            className="inline-flex items-center px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Receipt
          </button>
        </div>
        
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <QrCode className="w-4 h-4" />
            <span>Show this QR code to staff for verification</span>
          </div>
          <div className="mt-3 flex justify-center">
            <div className="w-32 h-32 bg-white p-2 rounded-lg">
              <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">QR Code</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Complete Your Order {tableNumber ? `(Table ${tableNumber})` : ''}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Choose your payment method and confirm your order
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Options */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Payment Method
            </h2>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'online' | 'cash')}
                  className="text-primary-500 focus:ring-primary-500"
                />
                <CreditCard className="w-5 h-5 text-primary-500" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Pay Online</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    UPI, Cards, Digital Wallets
                  </div>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'online' | 'cash')}
                  className="text-primary-500 focus:ring-primary-500"
                />
                <DollarSign className="w-5 h-5 text-primary-500" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Cash at Counter</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Pay when you collect your order
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Order Notes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Special Instructions
            </h2>
            <textarea
              placeholder="Any special requests or dietary requirements?"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              rows={3}
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>
            
            {/* Order Items */}
            <div className="space-y-3 mb-4">
              {items.map((cartItem) => (
                <div key={cartItem.item.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400';
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {cartItem.item.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Qty: {cartItem.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    ₹{(cartItem.item.price * cartItem.quantity).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Totals */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="text-gray-900 dark:text-white">₹{subtotal.toFixed(0)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Tax (8%)</span>
                <span className="text-gray-900 dark:text-white">₹{tax.toFixed(0)}</span>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-primary-600 dark:text-primary-400">₹{total.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing || items.length === 0}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-colors ${
              isProcessing || items.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                : 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Processing Payment...
              </div>
            ) : (
              `Confirm Order - ₹${total.toFixed(0)}`
            )}
          </button>

          {/* Back to Cart */}
          <Link
            to="/cart"
            className="block w-full text-center py-3 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
          >
            ← Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Payment;
