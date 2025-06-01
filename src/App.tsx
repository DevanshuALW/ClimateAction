import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import CarbonFootprint from './pages/CarbonFootprint';
import CommunityMap from './pages/CommunityMap';
import Challenges from './pages/Challenges';
import Marketplace from './pages/Marketplace';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-sky-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 md:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/carbon-footprint" element={<CarbonFootprint />} />
            <Route path="/community" element={<CommunityMap />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;