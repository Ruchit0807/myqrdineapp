import React, { useState } from 'react';
import { Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { getRestaurant, getCategories } from '../data/mockData';
import toast from 'react-hot-toast';
import { useTableStore } from '../stores/tableStore';

const QRMenu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const { addItem } = useCartStore();
  const { tableNumber, setTableNumber } = useTableStore();
  
  const restaurant = getRestaurant();
  const categories = getCategories();

  const allItems = categories.flatMap(cat => cat.items);

  // Auto-read table from URL if present
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('table');
    if (t) setTableNumber(t);
  }, [setTableNumber]);
  const filteredItems = selectedCategory === 'all' 
    ? allItems 
    : categories.find(cat => cat.name === selectedCategory)?.items || [];

  const handleQuantityChange = (itemId: string, change: number) => {
    const currentQty = quantities[itemId] || 0;
    const newQty = Math.max(0, currentQty + change);
    
    if (newQty === 0) {
      const newQuantities = { ...quantities };
      delete newQuantities[itemId];
      setQuantities(newQuantities);
    } else {
      setQuantities({ ...quantities, [itemId]: newQty });
    }
  };

  const handleAddToCart = (item: any) => {
    const quantity = quantities[item.id] || 1;
    addItem(item, quantity);
    toast.success(`${quantity}x ${item.name} added to cart!`);
    
    // Reset quantity for this item
    const newQuantities = { ...quantities };
    delete newQuantities[item.id];
    setQuantities(newQuantities);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderTags = (tags: string[]) => {
    const tagColors: { [key: string]: string } = {
      'Most Favourite': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'Chef\'s Special': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'New': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Healthy': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Vegetarian': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
      'Popular': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Traditional': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
      'Refreshing': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    };

    return tags.map(tag => (
      <span
        key={tag}
        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${tagColors[tag] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}
      >
        {tag}
      </span>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Table Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Select your table</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Orders will be tagged to the selected table.</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={tableNumber || ''}
              onChange={(e) => setTableNumber(e.target.value || null)}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Choose table</option>
              {Array.from({ length: 30 }, (_, i) => `${i + 1}`).map((t) => (
                <option key={t} value={t}>Table {t}</option>
              ))}
            </select>
            {tableNumber && (
              <button
                onClick={() => setTableNumber(null)}
                className="px-3 py-2 text-sm rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Restaurant Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-3xl">🍽️</span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
            <p className="text-primary-100 text-lg">{restaurant.description}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                {renderStars(restaurant.rating)}
                <span className="ml-2">{restaurant.rating}</span>
                <span className="text-primary-100">({restaurant.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All Items
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.name
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            {/* Item Image */}
            <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400';
                }}
              />
              {!item.available && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">Not Available</span>
                </div>
              )}
            </div>

            {/* Item Details */}
            <div className="p-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {renderTags(item.tags)}
              </div>

              {/* Name and Rating */}
              <div className="mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {item.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(item.rating)}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ({item.reviewCount})
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                {item.description}
              </p>

              {/* Price and Add to Cart */}
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  ₹{item.price.toFixed(0)}
                </div>
                
                {item.available ? (
                  <div className="flex items-center space-x-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                        disabled={!quantities[item.id]}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-2 text-sm font-medium min-w-[20px] text-center">
                        {quantities[item.id] || 0}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button
                      onClick={() => {
                        if (!tableNumber) {
                          toast.error('Please select your table before adding items.');
                          return;
                        }
                        handleAddToCart(item);
                      }}
                      disabled={!quantities[item.id]}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        quantities[item.id]
                          ? 'bg-primary-500 hover:bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4 inline mr-2" />
                      Add
                    </button>
                  </div>
                ) : (
                  <span className="text-red-500 font-medium">Unavailable</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No items found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try selecting a different category or check back later.
          </p>
        </div>
      )}
    </div>
  );
};

export default QRMenu;
