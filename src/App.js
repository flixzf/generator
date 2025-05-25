import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import OrganizationTree from './generator';
import Summary from './Summary';

const App = () => {
  const empty = { mgl: 0, vsm: 0, gl: 0, tl: 0, tm: 0, total: 0 };
  const [totals, setTotals] = useState({
    chart1: { ...empty },
    chart2: { ...empty },
    chart3: { ...empty }
  });

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <nav className="p-4 space-x-4 border-b mb-4">
        <Link to="/chart1">조직도 1</Link>
        <Link to="/chart2">조직도 2</Link>
        <Link to="/chart3">조직도 3</Link>
        <Link to="/summary">합계</Link>

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
