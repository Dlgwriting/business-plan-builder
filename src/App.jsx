import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import IdeaGenerator from './pages/IdeaGenerator';
import PlanBuilder from './pages/PlanBuilder';
import { LanguageProvider } from './context/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative">
          <div className="absolute top-4 right-4 z-50">
            <LanguageSwitcher />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ideas" element={<IdeaGenerator />} />
            <Route path="/build" element={<PlanBuilder />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
