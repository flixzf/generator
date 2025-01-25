import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      {/* ... 라우트 설정 ... */}
    </Router>
  );
};

export default App; 