import React from 'react';

const Summary = ({ totals }) => {
  const charts = Object.values(totals);
  const totalSum = charts.reduce((acc, v) => acc + (v.total || 0), 0);

  const rankTotals = charts.reduce(
    (acc, t) => {
      acc.mgl += t.mgl || 0;
      acc.vsm += t.vsm || 0;
      acc.gl += t.gl || 0;
      acc.tl += t.tl || 0;
      acc.tm += t.tm || 0;
      return acc;
    },
    { mgl: 0, vsm: 0, gl: 0, tl: 0, tm: 0 }
  );

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">총 인원 합계</h1>
      <ul className="mb-4 space-y-2">
        <li>조직도 1: {totals.chart1.total}</li>
        <li>조직도 2: {totals.chart2.total}</li>
        <li>조직도 3: {totals.chart3.total}</li>
      </ul>
      <div className="text-lg font-bold mb-6">합계: {totalSum}</div>

      <h2 className="text-xl font-bold mb-2">직급별 합계</h2>
      <ul className="space-y-1">
        <li>MGL: {rankTotals.mgl}</li>
        <li>VSM: {rankTotals.vsm}</li>
        <li>GL: {rankTotals.gl}</li>
        <li>TL: {rankTotals.tl}</li>
        <li>TM: {rankTotals.tm}</li>
      </ul>
    </div>
  );
};

export default Summary;
