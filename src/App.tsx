import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';

// Customer-facing pages
import Layout from './components/Layout';
import QRMenu from './pages/QRMenu';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import OrderTracker from './pages/OrderTracker';
import Games from './pages/Games';

// Staff-facing pages
import ChefDashboard from './pages/ChefDashboard';
import OwnerDashboard from './pages/OwnerDashboard';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
              },
            }}
          />
          
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<QRMenu />} />
              <Route path="cart" element={<Cart />} />
              <Route path="payment" element={<Payment />} />
              <Route path="tracker" element={<OrderTracker />} />
              <Route path="games" element={<Games />} />
            </Route>
            
            {/* Staff Routes */}
            <Route path="/chef" element={<ChefDashboard />} />
            <Route path="/owner" element={<OwnerDashboard />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
