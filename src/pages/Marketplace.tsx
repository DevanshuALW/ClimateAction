import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, ShoppingBag, Star, Heart,
  ArrowRight, ChevronDown
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

const Marketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('popular');
  
  const { products, cart, addToCart, addToWishlist } = useMarketplace();

  // Filter products based on search query and category
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'price-low') return a.price - b.price;
    if (sortOrder === 'price-high') return b.price - a.price;
    if (sortOrder === 'eco-score') return b.ecoScore - a.ecoScore;
    // Default: sort by popularity (rating * reviews)
    return (b.rating * b.reviews) - (a.rating * a.reviews);
  });

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'kitchen', name: 'Kitchen & Dining' },
    { id: 'personal', name: 'Personal Care' },
    { id: 'fashion', name: 'Fashion & Accessories' },
    { id: 'home', name: 'Home & Garden' },
    { id: 'tech', name: 'Tech & Gadgets' },
    { id: 'office', name: 'Office Supplies' }
  ];

  const getEcoScoreColor = (score: number) => {
    if (score >= 9) return 'text-emerald-600';
    if (score >= 7) return 'text-green-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Sustainable Marketplace</h1>
        <p className="text-gray-600">
          Shop eco-friendly products from verified sustainable brands.
        </p>
      </div>

      <div className="sticky top-16 z-10 bg-white/80 backdrop-blur-md rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-1/2">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search sustainable products..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-3 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <select
                className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
            </div>
            
            <div className="relative w-full md:w-auto">
              <select
                className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="eco-score">Eco Score</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
            </div>
          </div>
          
          <div className="relative">
            <button className="bg-emerald-600 text-white p-2 rounded-lg">
              <ShoppingBag size={20} />
            </button>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-500 mb-4">No products found matching your criteria.</p>
          <button
            className="text-emerald-600 hover:text-emerald-700 font-medium"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
                <button
                  className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-full hover:bg-white"
                  onClick={() => addToWishlist(product.id)}
                >
                  <Heart size={18} className="text-gray-600 hover:text-red-500 transition-colors" />
                </button>
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                  {product.badges.map((badge, i) => (
                    <span 
                      key={i}
                      className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-800">{product.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">Eco-Score:</span>
                    <span className={`text-sm font-medium ${getEcoScoreColor(product.ecoScore)}`}>
                      {product.ecoScore}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                </div>
                
                <button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium transition-colors"
                  onClick={() => addToCart(product.id)}
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6 border border-blue-100">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Verified Sustainable Products</h2>
            <p className="text-gray-600 mb-4">
              All products in our marketplace are carefully vetted for their environmental impact, ethical production, and sustainability credentials.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Carbon Neutral', value: '78%' },
                { label: 'Plastic-Free', value: '92%' },
                { label: 'Ethically Made', value: '100%' },
                { label: 'Recyclable', value: '85%' },
                { label: 'Organic Materials', value: '67%' },
                { label: 'Biodegradable', value: '71%' }
              ].map((stat, i) => (
                <div key={i} className="bg-white/70 backdrop-blur-sm p-3 rounded-lg">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-lg font-semibold text-emerald-700">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:w-1/3 bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Become a Vendor</h3>
            <p className="text-sm text-gray-600 mb-4">
              Do you sell sustainable products? Join our marketplace and reach environmentally conscious customers.
            </p>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium transition-colors flex justify-center items-center">
              Apply Now <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;