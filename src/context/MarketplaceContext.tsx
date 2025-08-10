import React, { createContext, useState, useContext, ReactNode } from 'react';

// Types
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  ecoScore: number;
  badges: string[];
}

interface MarketplaceContextType {
  products: Product[];
  cart: Product[];
  wishlist: Product[];
  addToCart: (productId: number) => void;
  addToWishlist: (productId: number) => void;
}

// Initial Data
const initialProducts: Product[] = [
    {
      id: 1,
      name: 'Bamboo Toothbrush Set',
      description: 'Pack of 4 biodegradable bamboo toothbrushes',
      price: 12.99,
      rating: 4.8,
      reviews: 124,
      image: 'https://images.pexels.com/photos/3737599/pexels-photo-3737599.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'personal',
      ecoScore: 9.2,
      badges: ['Plastic-Free', 'Biodegradable']
    },
    {
      id: 2,
      name: 'Reusable Produce Bags',
      description: 'Set of 8 mesh bags for grocery shopping',
      price: 16.50,
      rating: 4.6,
      reviews: 89,
      image: 'https://images.pexels.com/photos/5218022/pexels-photo-5218022.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'kitchen',
      ecoScore: 8.8,
      badges: ['Zero-Waste', 'Washable']
    },
    {
      id: 3,
      name: 'Solar Power Bank',
      description: '20000mAh battery with solar charging capability',
      price: 45.99,
      rating: 4.3,
      reviews: 210,
      image: 'https://images.pexels.com/photos/6636487/pexels-photo-6636487.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'tech',
      ecoScore: 7.5,
      badges: ['Renewable Energy', 'Long-Lasting']
    },
    {
      id: 4,
      name: 'Stainless Steel Water Bottle',
      description: 'Insulated 24oz bottle, keeps drinks cold for 24 hours',
      price: 28.95,
      rating: 4.9,
      reviews: 315,
      image: 'https://images.pexels.com/photos/4397836/pexels-photo-4397836.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'personal',
      ecoScore: 9.4,
      badges: ['Plastic-Free', 'Reusable']
    },
    {
      id: 5,
      name: 'Organic Cotton Tote Bag',
      description: 'Heavy-duty shopping bag made from organic cotton',
      price: 18.99,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.pexels.com/photos/5217977/pexels-photo-5217977.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'fashion',
      ecoScore: 9.1,
      badges: ['Organic', 'Fair Trade']
    },
    {
      id: 6,
      name: 'Beeswax Food Wraps',
      description: 'Reusable alternative to plastic wrap, set of 3 sizes',
      price: 22.00,
      rating: 4.5,
      reviews: 178,
      image: 'https://images.pexels.com/photos/6157229/pexels-photo-6157229.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'kitchen',
      ecoScore: 9.7,
      badges: ['Zero-Waste', 'Biodegradable']
    },
    {
      id: 7,
      name: 'LED Solar Garden Lights',
      description: 'Pack of 6 solar-powered pathway lights',
      price: 34.99,
      rating: 4.2,
      reviews: 92,
      image: 'https://images.pexels.com/photos/1108499/pexels-photo-1108499.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'home',
      ecoScore: 8.3,
      badges: ['Energy-Efficient', 'Solar-Powered']
    },
    {
      id: 8,
      name: 'Recycled Paper Notebook',
      description: '100% post-consumer recycled paper, 80 pages',
      price: 9.95,
      rating: 4.4,
      reviews: 67,
      image: 'https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'office',
      ecoScore: 8.9,
      badges: ['Recycled', 'Tree-Free']
    }
];

// Context
const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

// Provider
export const MarketplaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToCart = (productId: number) => {
    const productToAdd = products.find(p => p.id === productId);
    if (productToAdd) {
      setCart([...cart, productToAdd]);
    }
  };

  const addToWishlist = (productId: number) => {
    const productToAdd = products.find(p => p.id === productId);
    if (productToAdd && !wishlist.some(p => p.id === productId)) {
      setWishlist([...wishlist, productToAdd]);
    }
  };

  return (
    <MarketplaceContext.Provider value={{ products, cart, wishlist, addToCart, addToWishlist }}>
      {children}
    </MarketplaceContext.Provider>
  );
};

// Hook
export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
