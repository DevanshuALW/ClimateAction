import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Wind, Sun, Thermometer } from 'lucide-react';

const EnvironmentalData: React.FC = () => {
  // Sample data for air quality and local environmental conditions
  const airQualityData = {
    aqi: 42,
    status: 'Good',
    pollutants: {
      pm25: 12,
      pm10: 24,
      o3: 38,
      no2: 15
    }
  };

  const localData = [
    { name: 'Temperature', value: '78°F', icon: <Thermometer size={20} className="text-red-500" /> },
    { name: 'Air Quality', value: 'Good', icon: <Cloud size={20} className="text-blue-500" /> },
    { name: 'Wind', value: '5 mph', icon: <Wind size={20} className="text-cyan-500" /> },
    { name: 'UV Index', value: 'Moderate', icon: <Sun size={20} className="text-amber-500" /> }
  ];

  // Calculate AQI color
  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    if (aqi <= 300) return 'bg-purple-500';
    return 'bg-rose-900';
  };

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Local Environmental Data</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {localData.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="bg-gray-50 rounded-lg p-4 flex flex-col items-center"
          >
            <div className="p-2 rounded-full bg-white shadow-sm mb-2">
              {item.icon}
            </div>
            <p className="text-sm text-gray-600">{item.name}</p>
            <p className="font-semibold">{item.value}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-semibold text-gray-800">Air Quality Index</h3>
            <p className="text-sm text-gray-600">North Seattle Station</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getAqiColor(airQualityData.aqi)}`}></div>
            <span className="font-medium">{airQualityData.status}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center my-4">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#2D6A4F"
                strokeWidth="10"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 - (airQualityData.aqi / 500) * 283 }}
                transition={{ duration: 1, ease: "easeOut" }}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold">{airQualityData.aqi}</span>
              <span className="text-sm text-gray-500">AQI</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div>
            <p className="text-xs text-gray-500">PM2.5</p>
            <p className="font-medium">{airQualityData.pollutants.pm25} µg/m³</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">PM10</p>
            <p className="font-medium">{airQualityData.pollutants.pm10} µg/m³</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Ozone</p>
            <p className="font-medium">{airQualityData.pollutants.o3} ppb</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">NO₂</p>
            <p className="font-medium">{airQualityData.pollutants.no2} ppb</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnvironmentalData;