import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationDropdown = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    navigate(e.target.value);
  };

  return (
    <select
      className="border rounded p-2"
      onChange={handleChange}
      value={location.pathname}
    >
      <option value="/chart1">조직도 1</option>
      <option value="/chart2">조직도 2</option>
      <option value="/chart3">조직도 3</option>
      <option value="/summary">합계</option>
    </select>
  );
};

export default NavigationDropdown;
