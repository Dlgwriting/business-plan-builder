import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from './context/LanguageContext';
import { PlanProvider } from './context/PlanContext';
import Shell from './components/Shell';
import Home from './pages/Home';
import Team from './pages/Team';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Plan from './pages/Plan';
import Review from './pages/Review';
import BizSim from './pages/BizSim';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <PlanProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/bizsim" element={<BizSim />} />
            <Route
              path="*"
              element={
                <Shell>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/results" element={<Results />} />
                    <Route path="/plan" element={<Navigate to="/plan/team" replace />} />
                    <Route path="/plan/:sectionId" element={<Plan />} />
                    <Route path="/review" element={<Review />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Shell>
              }
            />
          </Routes>
          <Analytics />
        </BrowserRouter>
      </PlanProvider>
    </LanguageProvider>
  );
}
