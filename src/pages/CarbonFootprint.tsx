import React, { useState } from 'react';
import { 
  Car, Home, ShoppingBag, Utensils, Plane, Leaf, 
  Info, ChevronDown, ChevronUp, Plus, Minus
} from 'lucide-react';
import { motion } from 'framer-motion';

const CarbonFootprint: React.FC = () => {
  const [expanded, setExpanded] = useState<string>('transportation');
  const [values, setValues] = useState({
    carMiles: 120,
    publicTransit: 30,
    flightHours: 4,
    electricityUsage: 400,
    naturalGas: 50,
    groceries: 200,
    restaurants: 10,
    clothing: 3
  });

  const handleChange = (key: keyof typeof values, amount: number) => {
    setValues(prev => ({
      ...prev,
      [key]: Math.max(0, prev[key] + amount)
    }));
  };

  const toggleSection = (section: string) => {
    setExpanded(expanded === section ? '' : section);
  };

  // Simplified carbon calculation
  const calculateCarbon = () => {
    const calculations = {
      transportation: values.carMiles * 0.4 + values.publicTransit * 0.2 + values.flightHours * 90,
      home: values.electricityUsage * 0.9 + values.naturalGas * 5.3,
      consumption: values.groceries * 1.2 + values.restaurants * 3.5 + values.clothing * 15
    };
    
    return {
      ...calculations,
      total: Object.values(calculations).reduce((sum, val) => sum + val, 0)
    };
  };

  const carbonResults = calculateCarbon();
  
  const categories = [
    { 
      id: 'transportation', 
      title: 'Transportation', 
      icon: <Car size={24} />,
      items: [
        { key: 'carMiles', label: 'Car miles per week', unit: 'miles', step: 10 },
        { key: 'publicTransit', label: 'Public transit trips per month', unit: 'trips', step: 5 },
        { key: 'flightHours', label: 'Flight hours per year', unit: 'hours', step: 1 }
      ]
    },
    { 
      id: 'home', 
      title: 'Home Energy', 
      icon: <Home size={24} />,
      items: [
        { key: 'electricityUsage', label: 'Monthly electricity usage', unit: 'kWh', step: 50 },
        { key: 'naturalGas', label: 'Monthly natural gas usage', unit: 'therms', step: 5 }
      ]
    },
    { 
      id: 'consumption', 
      title: 'Consumption', 
      icon: <ShoppingBag size={24} />,
      items: [
        { key: 'groceries', label: 'Weekly grocery spending', unit: '$', step: 20 },
        { key: 'restaurants', label: 'Monthly restaurant visits', unit: 'visits', step: 1 },
        { key: 'clothing', label: 'New clothing items per month', unit: 'items', step: 1 }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Carbon Footprint Calculator</h1>
        <p className="text-gray-600">
          Estimate your personal carbon footprint by adjusting the values below to match your lifestyle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(carbonResults).filter(([key]) => key !== 'total').map(([category, value], index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold capitalize">{category}</h3>
              <div className="p-2 rounded-full bg-emerald-100">
                {category === 'transportation' && <Car size={18} className="text-emerald-600" />}
                {category === 'home' && <Home size={18} className="text-emerald-600" />}
                {category === 'consumption' && <ShoppingBag size={18} className="text-emerald-600" />}
              </div>
            </div>
            <div className="flex items-end space-x-1">
              <span className="text-2xl font-bold">{Math.round(value)}</span>
              <span className="text-gray-500 mb-1">kg CO₂e</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow p-6 border border-gray-100 mb-8">
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-2">Your Estimated Annual Carbon Footprint</p>
          <div className="flex items-center justify-center">
            <Leaf size={32} className="text-emerald-500 mr-2" />
            <span className="text-4xl font-bold text-gray-800">{Math.round(carbonResults.total * 52)}</span>
            <span className="text-xl text-gray-600 ml-2">kg CO₂e/year</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">This is approximately {Math.round((carbonResults.total * 52) / 1000)} metric tons of CO₂ per year</p>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
          <motion.div 
            className="bg-emerald-500 h-4"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (carbonResults.total * 52) / 120)}%` }}
            transition={{ duration: 1 }}
          ></motion.div>
        </div>

        <div className="flex justify-between text-sm text-gray-600 mb-6">
          <span>0 kg</span>
          <span>Global Average: 4,400 kg</span>
          <span>12,000 kg</span>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start">
          <Info size={20} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-700">
            The average global carbon footprint is about 4.4 metric tons per person annually. 
            To meet climate goals, we should aim to reduce our footprint to under 2 tons per person by 2050.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 border border-gray-100 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Adjust Your Lifestyle Factors</h2>
        
        <div className="space-y-6">
          {categories.map(category => (
            <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className={`w-full px-6 py-4 flex items-center justify-between ${expanded === category.id ? 'bg-emerald-50' : 'bg-white'}`}
                onClick={() => toggleSection(category.id)}
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${expanded === category.id ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}>
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800">{category.title}</h3>
                </div>
                {expanded === category.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {expanded === category.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 py-4 bg-white"
                >
                  <div className="space-y-4">
                    {category.items.map(item => (
                      <div key={item.key} className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <label className="text-gray-700 mb-1 sm:mb-0">
                          {item.label}
                        </label>
                        <div className="flex items-center">
                          <button
                            onClick={() => handleChange(item.key as keyof typeof values, -item.step)}
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                          >
                            <Minus size={16} />
                          </button>
                          <div className="flex items-baseline mx-3 w-24 justify-center">
                            <span className="text-lg font-medium">{values[item.key as keyof typeof values]}</span>
                            <span className="text-gray-500 ml-1">{item.unit}</span>
                          </div>
                          <button
                            onClick={() => handleChange(item.key as keyof typeof values, item.step)}
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Personalized Recommendations</h2>
        <p className="text-gray-600 mb-6">Based on your footprint, here are some ways you could reduce your impact:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Reduce car travel by 20%', description: 'This could save 499 kg CO₂e annually', icon: <Car size={20} /> },
            { title: 'Switch to renewable energy', description: 'This could save 1,240 kg CO₂e annually', icon: <Home size={20} /> },
            { title: 'Eat local, seasonal food', description: 'This could save 312 kg CO₂e annually', icon: <Utensils size={20} /> },
            { title: 'Offset your next flight', description: 'This could offset 360 kg CO₂e', icon: <Plane size={20} /> },
          ].map((item, i) => (
            <div key={i} className="flex bg-white p-4 rounded-lg shadow-sm">
              <div className="p-2 bg-emerald-100 rounded-full mr-3 text-emerald-600 h-fit">
                {item.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprint;