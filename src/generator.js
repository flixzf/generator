import React, { useState, useEffect } from 'react';

const OrganizationTree = ({ onTotalChange }) => {
  const [config, setConfig] = useState({
    lineCount: 4,
    shiftsCount: 2,
    miniLineCount: 2,
    hasTonguePrefit: true,
    stockfitRatio: '2:1'
  });

  const TL_BOX_HEIGHT = 80; // h-20
  const TL_BOX_MARGIN = 16;  // space-y-4

  const PositionBox = ({ title, subtitle, count, level }) => (
    <div className={`
      w-48 h-20
      border border-gray-300 rounded
      flex flex-col justify-center items-center
      ${level === 0 ? 'bg-gray-700 text-white' : 
        level === 1 ? 'bg-gray-500 text-white' :
        level === 2 ? 'bg-gray-300' :
        level === 3 ? 'bg-white' :
        'bg-blue-50'}
    `}>
      <div className="text-center">
        <div className="font-bold">{title}</div>
        {subtitle && <div className="text-sm">{subtitle}</div>}
        {count > 0 && <div className="text-sm mt-1">TO: {count}</div>}
      </div>
    </div>
  );

  const ConnectingLines = ({ count, type = 'vertical' }) => {
    if (type !== 'vertical') {
      return (
        <div className="relative h-4 w-full">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300" />
        </div>
      );
    }

    if (count <= 1) {
      return (
        <div className="relative w-full h-8">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300" />
        </div>
      );
    }

    return (
      <div className="relative w-full h-12">
        <div className="absolute left-1/2 top-0 bottom-1/2 w-px bg-gray-300" />
        <div 
          className="absolute top-1/2 h-px bg-gray-300"
          style={{
            left: `${(0.5 / count) * 100}%`,
            right: `${(0.5 / count) * 100}%`
          }}
        />
        {Array(count).fill(null).map((_, idx) => (
          <div 
            key={idx} 
            className="absolute top-1/2 bottom-0 w-px bg-gray-300"
            style={{
              left: `${((idx + 0.5) / count) * 100}%`,
            }}
          />
        ))}
      </div>
    );
  };

  const getProcessGroups = () => [
    {
      gl: { subtitle: 'Cutting-Prefit', count: 1 },
      tlGroup: Array(config.shiftsCount).fill(null).map((_, idx) => ({
        subtitle: `No-sew Shift${idx + 1}`
      })),
      tmGroup: Array(config.shiftsCount).fill(null).map((_, idx) => ({
        subtitle: `MH → No-sew Shift${idx + 1}`
      }))
    },
    {
      gl: { subtitle: 'Stitching', count: 1 },
      tlGroup: [
        ...Array(config.miniLineCount).fill(null).map((_, idx) => ({
          subtitle: `mini Line ${idx + 1}`
        })),
        { subtitle: 'Tongue Prefit' }
      ],
      tmGroup: Array(config.miniLineCount).fill(null).map((_, idx) => ({
        subtitle: `MH → Stitching${idx + 1}`
      }))
    },
    {
      gl: { subtitle: 'Stockfit', count: 1 },
      tlGroup: config.stockfitRatio === '1:1' 
        ? [{ subtitle: 'Stockfit' }]
        : [
            { subtitle: 'Stockfit Input' },
            { subtitle: 'Stockfit Output' }
          ],
      tmGroup: [{ subtitle: 'MH → Assembly' }]
    },
    {
      gl: { subtitle: 'Assembly', count: 1 },
      tlGroup: [
        { subtitle: 'Input' },
        { subtitle: 'Cementing' },
        { subtitle: 'Finishing' }
      ],
      tmGroup: [
        { subtitle: 'MH → Assembly' },
        { subtitle: 'MH → FG WH' },
        { subtitle: 'MH → Last' }
      ]
    }
  ];


  const computeTotalPositions = () => {
    const processGroups = getProcessGroups();
    const perLine = 1 + processGroups.reduce((sum, group) => {
      return sum + 1 + group.tlGroup.length + (group.tmGroup ? group.tmGroup.length : 0);
    }, 0);
    return 1 + config.lineCount * perLine;

  };

  useEffect(() => {
    if (onTotalChange) {

      onTotalChange(computeTotalPositions());

    }
  }, [config]);

  const VSMGroup = ({ vsm }) => {
    const processGroups = getProcessGroups();

    const tlHeights = processGroups.map(group => {
      const tlCount = group.tlGroup.length;
      return tlCount * TL_BOX_HEIGHT + (tlCount - 1) * TL_BOX_MARGIN;
    });

    const maxTLHeight = Math.max(...tlHeights);

    return (
      <div className="flex flex-col items-center">
        <PositionBox title="VSM" subtitle={vsm.subtitle} count={1} level={1} />
        <ConnectingLines count={processGroups.length} />
        <div className="flex flex-row space-x-8">
          {processGroups.map((group, idx) => {
            const glHeight = tlHeights[idx];
            const spacerHeight = Math.max(0, maxTLHeight - glHeight) + 30;

            return (
              <div key={idx} className="flex flex-col items-center">
                <PositionBox title="GL" subtitle={group.gl.subtitle} count={group.gl.count} level={2} />
                <ConnectingLines count={1} />
                <div className="flex flex-col space-y-4">
                  {group.tlGroup.map((tl, tlIdx) => (
                    <div key={tlIdx} className="flex flex-col items-center">
                      <PositionBox title="TL" subtitle={tl.subtitle} count={1} level={3} />
                    </div>
                  ))}
                </div>
                <div style={{ height: `${spacerHeight}px` }} />
                <div className="flex flex-col space-y-4">
                  {group.tmGroup?.map((tm, tmIdx) => (
                    <div key={tmIdx} className="flex flex-col items-center">
                      <PositionBox title="TM" subtitle={tm.subtitle} count={1} level={4} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 w-full border rounded-lg shadow-sm">
      <div className="overflow-auto">
        <div className="flex flex-col items-center">
          <PositionBox title="MGL" subtitle="Plant A" count={1} level={0} />
          <ConnectingLines count={config.lineCount} />
          <div className="flex flex-row justify-center space-x-12">
            {Array(config.lineCount).fill(null).map((_, i) => (
              <VSMGroup key={i} vsm={{ subtitle: `Line ${i + 1}` }} />
            ))}
          </div>
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
              min="1"
              max="3"
              value={config.shiftsCount}
              onChange={(e) => setConfig({...config, shiftsCount: parseInt(e.target.value)})}
              className="border rounded p-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">미니 라인 수</label>
            <input
              type="number"
              min="1"
              max="4"
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
    </div>
  );
};

export default OrganizationTree;