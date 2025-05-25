import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationDropdown from './NavigationDropdown';
import OrganizationTree from './generator';
import Summary from './Summary';

const App = () => {
  const [totals, setTotals] = useState({ chart1: 0, chart2: 0, chart3: 0 });

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <nav className="p-4 border-b mb-4">
        <NavigationDropdown />
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/chart1" replace />} />
        <Route path="/chart1" element={<OrganizationTree onTotalChange={(t) => setTotals(prev => ({ ...prev, chart1: t }))} />} />
        <Route path="/chart2" element={<OrganizationTree onTotalChange={(t) => setTotals(prev => ({ ...prev, chart2: t }))} />} />
        <Route path="/chart3" element={<OrganizationTree onTotalChange={(t) => setTotals(prev => ({ ...prev, chart3: t }))} />} />
        <Route path="/summary" element={<Summary totals={totals} />} />
      </Routes>
    </Router>
  );
};

export default App; 
