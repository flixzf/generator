import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const routes = [
  { path: '/chart1', label: '조직도 1' },
  { path: '/chart2', label: '조직도 2' },
  { path: '/chart3', label: '조직도 3' },
  { path: '/summary', label: '합계' }
];

const NavigationDropdown = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    navigate(e.target.value);
  };

  return (
    <select value={location.pathname} onChange={handleChange} className="border p-1 rounded">
      {routes.map(r => (
        <option key={r.path} value={r.path}>{r.label}</option>
      ))}
    </select>
  );
};

export default NavigationDropdown;
