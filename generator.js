import React, { useState } from 'react';

const Card = ({ className, children, ...props }) => {
  return (
    <div className={`rounded-lg border bg-card shadow-sm ${className}`} {...props}>
      {children}
    </div>
  );
};

const OrganizationTree = () => {
  const [config, setConfig] = useState({
    lineCount: 4,
    shiftsCount: 2,
    miniLineCount: 2,
    stockfitRatio: '2:1'
  });

  const PositionBox = ({ title, subtitle, count, level }) => (
    <div className={`
      w-48 h-20 border rounded flex flex-col justify-center items-center
      ${level === 0 ? 'bg-gray-700 text-white' : 
        level === 1 ? 'bg-gray-500 text-white' :
        level === 2 ? 'bg-gray-300' : 'bg-white'}
    `}>
      <div className="text-center">
        <div className="font-bold">{title}</div>
        {subtitle && <div className="text-sm">{subtitle}</div>}
        {count > 0 && <div className="text-sm mt-1">TO: {count}</div>}
      </div>
    </div>
  );

  return (
    <Card className="p-8 w-full">
      <div className="overflow-auto">
        <div className="flex flex-col items-center">
          <PositionBox title="MGL" subtitle="Plant A" count={1} level={0} />
        </div>
      </div>
      
      <div className="mt-8 border-t pt-4">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm mb-1">라인 수</label>
            <input
              type="number"
              value={config.lineCount}
              onChange={(e) => setConfig({...config, lineCount: parseInt(e.target.value)})}
              className="border rounded p-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">교대 수</label>
            <input
              type="number"
              value={config.shiftsCount}
              onChange={(e) => setConfig({...config, shiftsCount: parseInt(e.target.value)})}
              className="border rounded p-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">미니 라인 수</label>
            <input
              type="number"
              value={config.miniLineCount}
              onChange={(e) => setConfig({...config, miniLineCount: parseInt(e.target.value)})}
              className="border rounded p-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Stockfit 비율</label>
            <select
              value={config.stockfitRatio}
              onChange={(e) => setConfig({...config, stockfitRatio: e.target.value})}
              className="border rounded p-1 w-full"
            >
              <option value="1:1">1:1 (Assembly:Stockfit)</option>
              <option value="2:1">2:1 (Assembly:Stockfit)</option>
            </select>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrganizationTree;