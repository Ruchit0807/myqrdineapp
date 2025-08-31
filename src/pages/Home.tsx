import React, { useEffect, useState } from 'react';
import { QrCode, BarChart3, ShoppingCart, Users, ArrowRight, Check, Star, Play, Shield, Globe, Palette, Zap, TrendingUp, Heart, X, Utensils, ChefHat, Coffee, Pizza, Wine, Cake, Sandwich, MessageCircle, Send, Bot } from 'lucide-react';

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! 👋 I\'m your AI assistant. How can I help you with our Digital QR Menu service today?',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    restaurant: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 8);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate sending email to rsdesign0807@gmail.com
      // In production, you would integrate with EmailJS or similar service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Thank you! Your request has been sent to rsdesign0807@gmail.com');
      setShowForm(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        restaurant: '',
        message: ''
      });
    } catch (error) {
      alert('Error sending request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // AI Chat Functions
  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(chatInput);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: aiResponse,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay for realistic feel
  };

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('pricing') || message.includes('cost') || message.includes('price')) {
      return 'Our pricing starts at ₹3,999/year for the Starter Plan, ₹4,999/year for Basic, and ₹5,999/year for Premium. All plans include a 14-day free trial! 💰';
    }
    
    if (message.includes('trial') || message.includes('free')) {
      return 'Yes! We offer a 14-day free trial with full access to all features. No credit card required. Just fill out our form and you\'ll be set up immediately! 🎉';
    }
    
    if (message.includes('qr') || message.includes('menu')) {
      return 'Our QR Menu system creates digital menus that customers scan with their phones. It\'s contactless, interactive, and easy to update. Perfect for modern restaurants! 📱';
    }
    
    if (message.includes('features') || message.includes('what can') || message.includes('capabilities')) {
      return 'Key features include: unlimited menu items, custom themes, multi-language support, allergen info, real-time updates, staff management, and detailed analytics! ✨';
    }
    
    if (message.includes('support') || message.includes('help') || message.includes('contact')) {
      return 'We provide dedicated support via email at rsdesign0807@gmail.com and phone at +91 9722926434. Our team is here to help you succeed! 🎯';
    }
    
    if (message.includes('setup') || message.includes('how to') || message.includes('get started')) {
      return 'Getting started is easy! 1) Fill out our form, 2) We\'ll create your custom QR menu, 3) You\'ll receive QR codes to print and display. That\'s it! 🚀';
    }
    
    if (message.includes('restaurant') || message.includes('business')) {
      return 'Perfect! Our QR Menu system works great for restaurants, cafes, food trucks, bars, and any food service business. We customize it to match your brand! 🍽️';
    }
    
    // Default responses
    const defaultResponses = [
      'That\'s a great question! Let me help you with that. Could you provide more details? 🤔',
      'I\'d be happy to assist you! What specific aspect of our QR Menu service would you like to know more about? 💡',
      'Thanks for asking! Our team can provide detailed information. Would you like me to connect you with our experts? 📞',
      'Great question! Our QR Menu system is designed to be user-friendly and powerful. What would you like to explore? 🔍'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const features = [
    { icon: <QrCode className="w-8 h-8" />, title: 'Digital QR Menu', desc: 'Explore our modern QR-based menu, accessible via your smartphone.' },
    { icon: <Shield className="w-8 h-8" />, title: 'Enhanced Safety', desc: 'Embrace a safer dining environment with contactless ordering.' },
    { icon: <Palette className="w-8 h-8" />, title: 'Custom Themes', desc: 'Personalize your dining ambiance with various menu themes.' },
    { icon: <Zap className="w-8 h-8" />, title: 'Drag & Drop', desc: 'Organize categories effortlessly with intuitive drag & drop.' },
    { icon: <Globe className="w-8 h-8" />, title: 'Multi Language', desc: 'Available in multiple languages for diverse customers.' },
    { icon: <TrendingUp className="w-8 h-8" />, title: 'Cost Effective', desc: 'Go eco-friendly and reduce printing costs significantly.' },
    { icon: <BarChart3 className="w-8 h-8" />, title: 'Detailed Specs', desc: 'Get in-depth details about ingredients and allergens.' },
    { icon: <Users className="w-8 h-8" />, title: 'Staff Management', desc: 'Streamline operations with efficient staff management.' }
  ];

  const testimonials = [
    {
      quote: "ScanDine revolutionized how I dine out. No more waiting for menus or worrying about cleanliness. Just scan, choose, and enjoy!",
      author: "Umesh Pavasiya",
      restaurant: "SpiceVilla Restaurant",
      rating: 5
    },
    {
      quote: "Using ScanDine made my restaurant experience so convenient. The digital menu is user-friendly and offers a wide range of options.",
      author: "Umesh Pavasiya",
      restaurant: "Leonardo Restaurant",
      rating: 5
    },
    {
      quote: "ScanDine brought a touch of modernity to my favorite restaurant. Navigating through the menu is a breeze.",
      author: "Umesh Pavasiya",
      restaurant: "Pavalion Restaurant",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter Plan',
      price: '₹3,999',
      period: '/Yr',
      features: ['60 Menu Items', 'Cover Banner', '4 QR Menu Themes', 'Upload Menu with Images', 'Preparation Time', 'Allergies Info', 'Special Symbols', 'Multiple Languages', 'Dedicated Support'],
      popular: false
    },
    {
      name: 'Basic Plan',
      price: '₹4,999',
      period: '/Yr',
      features: ['100 Menu Items', 'Cover Banner', '4 QR Menu Themes', 'Upload Menu with Images', 'Preparation Time', 'Allergies Info', 'Special Symbols', 'Multiple Languages', 'Dedicated Support'],
      popular: true
    },
    {
      name: 'Premium Plan',
      price: '₹5,999',
      period: '/Yr',
      features: ['Unlimited Menu Items', 'Cover Banner', '4 QR Menu Themes', 'Upload Menu with Images', 'Preparation Time', 'Allergies Info', 'Special Symbols', 'Multiple Languages', 'Dedicated Support'],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen">
      {/* AI Chat Bot */}
      <div className="fixed top-32 right-6 z-50">
        {/* Chat Button */}
        {!showChat && (
          <button
            onClick={() => setShowChat(true)}
            className="bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-full shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 hover:scale-110 animate-bounce"
            title="Chat with AI Assistant"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}

        {/* Chat Interface */}
        {showChat && (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 h-96 flex flex-col">
            {/* Chat Header */}
            <div className="bg-primary-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="w-5 h-5" />
                <span className="font-semibold">AI Assistant</span>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-primary-500 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-sm"
                />
                <button
                  onClick={sendMessage}
                  disabled={!chatInput.trim()}
                  className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white p-2 rounded-xl transition-colors duration-200"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500">
          <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-white/5 to-transparent"></div>
        </div>
        
        {/* Enhanced Floating Elements with Restaurant Theme */}
        <div className="absolute top-20 left-20 animate-float">
          <div className="w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Utensils className="w-10 h-10 text-white/60 animate-pulse" />
          </div>
        </div>
        <div className="absolute bottom-20 right-20 animate-float-delay-1">
          <div className="w-16 h-16 bg-accent-500/20 rounded-full backdrop-blur-sm border border-accent-300/30 flex items-center justify-center">
            <ChefHat className="w-8 h-8 text-accent-300/60 animate-bounce-gentle" />
          </div>
        </div>
        <div className="absolute top-1/2 left-10 animate-float-delay-2">
          <div className="w-12 h-12 bg-primary-300/20 rounded-full backdrop-blur-sm border border-primary-300/30 flex items-center justify-center">
            <Coffee className="w-6 h-6 text-primary-300/60 animate-pulse-slow" />
          </div>
        </div>
        <div className="absolute top-1/3 right-16 animate-float">
          <div className="w-8 h-8 bg-white/15 rounded-full backdrop-blur-sm border border-white/25 flex items-center justify-center">
            <Pizza className="w-4 h-4 text-white/60 animate-rotate-slow" />
          </div>
        </div>
        <div className="absolute bottom-1/3 left-1/4 animate-float-delay-1">
          <div className="w-10 h-10 bg-accent-400/20 rounded-full backdrop-blur-sm border border-accent-400/30 flex items-center justify-center">
            <Sandwich className="w-5 h-5 text-accent-400/60 animate-bounce" />
          </div>
        </div>
        <div className="absolute top-1/4 right-1/3 animate-float-delay-2">
          <div className="w-14 h-14 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <Wine className="w-7 h-7 text-white/70 animate-pulse" />
          </div>
        </div>
        <div className="absolute bottom-1/4 right-1/4 animate-float">
          <div className="w-6 h-6 bg-primary-400/20 rounded-full backdrop-blur-sm border border-primary-400/30 flex items-center justify-center">
            <Cake className="w-3 h-3 text-primary-400/60 animate-bounce-gentle" />
          </div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Added spacing before Revolutionize Dining */}
            <div className="h-20"></div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block animate-slide-in-left">Revolutionize</span>
              <span className="block text-accent-300 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>Dining</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Go Digital with QR Menu - Discover a modern dining experience with our Digital QR Menu. 
              Scan, order, and repeat seamlessly from your smartphone. Enjoy convenience and safety!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <button 
                onClick={() => setShowForm(true)}
                className="group bg-white text-primary-600 px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105 flex items-center gap-2 hover-glow"
              >
                Get Your Digital QR Menu Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={scrollToMenu}
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2 hover-lift"
              >
                <Play className="w-5 h-5" />
                Free Trial
              </button>
            </div>
            
            {/* Enhanced QR Demo with click functionality */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-md mx-auto animate-scale-in cursor-pointer hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.8s' }} onClick={scrollToMenu}>
              <div className="text-6xl mb-4 animate-bounce-gentle">📱</div>
              <p className="text-lg font-medium mb-4">Scan this to view</p>
              <div className="bg-white rounded-2xl p-4 inline-block hover-lift">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-glow">
                  <QrCode className="w-16 h-16 text-white animate-pulse-slow" />
                </div>
              </div>
              <p className="text-sm text-white/70 mt-3">Digital QR Menu Demo</p>
              <p className="text-xs text-white/50 mt-2">Click to explore menu section</p>
            </div>
          </div>
        </div>
        
        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-50 rounded-full -translate-x-32 -translate-y-32 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-50 rounded-full translate-x-48 translate-y-48 opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Top Features of <span className="text-primary-600 gradient-text">Digital QR Menu</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionize dining with our QR Menu: Touchless ordering, interactive menus, real-time updates, 
              allergen info, and easy to manage.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group text-center p-8 rounded-3xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover-lift ${
                  currentFeature === index 
                    ? 'bg-gradient-to-br from-primary-50 to-accent-50 border-2 border-primary-200 shadow-xl' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  currentFeature === index 
                    ? 'bg-primary-500 text-white shadow-lg animate-pulse' 
                    : 'bg-white text-primary-500 group-hover:bg-primary-500 group-hover:text-white'
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-0 w-32 h-32 bg-primary-100 rounded-full -translate-x-16 opacity-30"></div>
        <div className="absolute top-0 right-1/4 w-24 h-24 bg-accent-100 rounded-full opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Just Scan and Explore <span className="text-primary-600 gradient-text">Digital QR Menu</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience seamless dining with our innovative QR Menu scanning. Effortlessly explore a world of 
              flavors and options, all at your fingertips.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <QrCode className="w-12 h-12" />, title: 'Scan QR & Order', desc: 'Customers browse digital menu and place orders seamlessly.' },
              { icon: <ShoppingCart className="w-12 h-12" />, title: 'Pay from Table', desc: 'Seamless UPI/cards payment; split bills easily.' },
              { icon: <BarChart3 className="w-12 h-12" />, title: 'Owner Manages', desc: 'Track sales & inventory in real-time dashboard.' }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300 hover-glow">
                    {step.icon}
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-primary-400 animate-pulse" />
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-50 rounded-full translate-x-40 -translate-y-40 opacity-30"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent-50 rounded-full -translate-x-32 translate-y-32 opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Try Our <span className="text-primary-600 gradient-text">Free Trial</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the power of digital QR menus with our free trial. No commitment required.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Start Your Free Trial Today</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Get access to all premium features for free. Create your first digital menu, 
              customize themes, and see the difference it makes for your restaurant.
            </p>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-primary-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:bg-primary-600 transition-all duration-300 hover:scale-105"
            >
              Start Free Trial Now
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-50 rounded-full translate-x-40 -translate-y-40 opacity-30"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent-50 rounded-full -translate-x-32 translate-y-32 opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple <span className="text-primary-600 gradient-text">Pricing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience transparency and ease with our digital QR menu. Browse, order, and pay with clarity 
              and convenience at your fingertips.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className={`relative p-8 rounded-3xl transition-all duration-500 hover:scale-105 hover-lift ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-2xl transform scale-105' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-accent-500 text-white px-6 py-2 rounded-full font-bold text-sm animate-pulse">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-lg opacity-80">{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className={`w-5 h-5 ${plan.popular ? 'text-white' : 'text-primary-500'}`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => setShowForm(true)}
                  className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 hover-lift ${
                    plan.popular 
                      ? 'bg-white text-primary-600 hover:bg-gray-100' 
                      : 'bg-primary-500 text-white hover:bg-primary-600'
                  }`}
                >
                  Try Free For 14 Days
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/3 left-0 w-40 h-40 bg-primary-100 rounded-full -translate-x-20 opacity-20"></div>
        <div className="absolute bottom-1/4 right-0 w-32 h-32 bg-accent-100 rounded-full translate-x-16 opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-primary-600 gradient-text">Testimonials</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Some beautiful words from clients who are happy with our QR Menu
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover-lift"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-primary-600">{testimonial.restaurant}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-500 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-gradient-to-r from-white/5 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto text-center text-white px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            You Need Digital QR Menu Because It's
          </h2>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {['Easy to Use', 'Dynamic', 'Affordable'].map((trait, index) => (
              <div key={index} className="flex items-center gap-2 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                <Heart className="w-6 h-6 text-accent-300 animate-pulse" />
                <span className="text-xl font-semibold">{trait}</span>
              </div>
            ))}
          </div>
          <p className="text-xl mb-8 opacity-90">
            QR Menu: Simplifying choices, enhancing dining. Elevate your experience now.
          </p>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105 hover-lift"
          >
            GET YOUR DIGITAL QR MENU NOW
          </button>
          <p className="text-sm mt-4 opacity-80">Free Trial Available</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-1/3 w-48 h-48 bg-primary-50 rounded-full translate-x-24 -translate-y-24 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-accent-50 rounded-full -translate-x-28 translate-y-28 opacity-30"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Say <span className="text-primary-600 gradient-text">Hi</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Contact us for a demo. Fill the form our team will contact you asap.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Address</h3>
              <p className="text-gray-600">Surat, Gujarat 395004</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact</h3>
              <p className="text-gray-600">+91 9722926434</p>
              <p className="text-gray-600">contact@scandine.in</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-3xl p-8 hover-lift">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send us message, We love to hear from you.
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input type="text" placeholder="Name" className="px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-black" />
              <input type="email" placeholder="Email" className="px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-black" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input type="tel" placeholder="Number" className="px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-black" />
              <input type="text" placeholder="City" className="px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-black" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input type="text" placeholder="State" className="px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-black" />
              <textarea placeholder="Message" rows={3} className="px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none text-black"></textarea>
            </div>
            <button className="w-full bg-primary-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transition-colors duration-300 hover-lift">
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Get Your Digital QR Menu</h3>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-black"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-black"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-black"
                  placeholder="Your phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label>
                <input
                  type="text"
                  name="restaurant"
                  value={formData.restaurant}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-black"
                  placeholder="Restaurant or business name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none text-black"
                  rows={3}
                  placeholder="Tell us about your requirements..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                Your request will be sent to rsdesign0807@gmail.com
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;


