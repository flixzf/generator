import React from 'react';

const Summary = ({ totals }) => {
  const totalSum = Object.values(totals).reduce((acc, v) => acc + v, 0);
  return (
    <div className="fixed top-0 left-0 right-0 bg-white p-8 shadow z-10">
      <h1 className="text-xl font-bold mb-4">총 인원 합계</h1>
      <ul className="mb-4 space-y-2">
        <li>조직도 1: {totals.chart1}</li>
        <li>조직도 2: {totals.chart2}</li>
        <li>조직도 3: {totals.chart3}</li>
      </ul>
      <div className="text-lg font-bold">합계: {totalSum}</div>
    </div>
  );
};

export default Summary;
