import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import OrganizationTree from './generator';
import Summary from './Summary';

const NavigationDropdown = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    navigate(e.target.value);
  };

  return (
    <select
      className="border rounded p-2"
      value={location.pathname === '/' ? '/chart1' : location.pathname}
      onChange={handleChange}
    >
      <option value="/chart1">조직도 1</option>
      <option value="/chart2">조직도 2</option>
      <option value="/chart3">조직도 3</option>
      <option value="/summary">합계</option>
    </select>
  );
};

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
