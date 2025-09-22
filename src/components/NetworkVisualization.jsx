import React, { useMemo } from 'react';

const NetworkVisualization = ({
  trains,
  tracks,
  stations,
  onTrainClick,
  selectedTrainId
}) => {
  const getTrackColor = (status) => {
    switch (status) {
      case 'normal':
        return '#10B981'; // Green
      case 'delayed':
        return '#F59E0B'; // Yellow
      case 'blocked':
        return '#EF4444'; // Red
      case 'warning':
        return '#F97316'; // Orange
      default:
        return '#6B7280'; // Gray
    }
  };

  const getTrainColor = (type) => {
    switch (type) {
      case 'Express':
        return '#EF4444'; // Red
      case 'Local':
        return '#3B82F6'; // Blue
      case 'Freight':
        return '#F97316'; // Orange
      default:
        return '#6B7280'; // Gray
    }
  };

  const trainPositions = useMemo(() => {
    return trains.map(train => {
      const track = tracks.find(t => t.id === train.currentTrack);
      if (!track || !track.path || track.path.length < 2) {
        return { ...train, x: 0, y: 0 };
      }

      const pathLength = track.path.length - 1;
      const segmentIndex = Math.floor(train.position * pathLength);
      const segmentProgress = (train.position * pathLength) - segmentIndex;
      
      const startPoint = track.path[Math.min(segmentIndex, pathLength - 1)];
      const endPoint = track.path[Math.min(segmentIndex + 1, pathLength)];
      
      const x = startPoint.x + (endPoint.x - startPoint.x) * segmentProgress;
      const y = startPoint.y + (endPoint.y - startPoint.y) * segmentProgress;
      
      return { ...train, x, y };
    });
  }, [trains, tracks]);

  return (
    <div className="flex-1 bg-gray-900 p-4 relative overflow-hidden">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full mr-3 animate-pulse"></div>
          Network Visualization
        </h2>
        <p className="text-gray-400 mt-1">Mumbai Suburban Railway Network</p>
      </div>

      <div className="relative w-full flex-1 bg-black rounded-lg border border-gray-700 overflow-hidden" style={{ minHeight: '500px' }}>
        <svg
          viewBox="0 0 600 400"
          className="w-full h-full"
          style={{ background: 'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)' }}
        >
          {/* Grid Pattern */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1f2937" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
            
            {/* Glow effects */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Tracks */}
          {tracks.map((track) => {
            const color = getTrackColor(track.status);
            return (
              <g key={track.id}>
                {/* Track glow */}
                <path
                  d={`M ${track.path.map(p => `${p.x},${p.y}`).join(' L ')}`}
                  fill="none"
                  stroke={color}
                  strokeWidth="8"
                  opacity="0.3"
                  filter="url(#glow)"
                />
                {/* Main track */}
                <path
                  d={`M ${track.path.map(p => `${p.x},${p.y}`).join(' L ')}`}
                  fill="none"
                  stroke={color}
                  strokeWidth="3"
                  className={track.status === 'blocked' ? 'animate-pulse' : ''}
                />
                
                {/* Track label */}
                <text
                  x={track.path[Math.floor(track.path.length / 2)].x}
                  y={track.path[Math.floor(track.path.length / 2)].y - 10}
                  fill="#9CA3AF"
                  fontSize="10"
                  textAnchor="middle"
                  className="font-mono"
                >
                  {track.id.split('-').join('→')}
                </text>
              </g>
            );
          })}

          {/* Stations */}
          {stations.map((station) => (
            <g key={station.id}>
              {/* Station glow */}
              <circle
                cx={station.x}
                cy={station.y}
                r="12"
                fill={station.type === 'terminal' ? '#8B5CF6' : station.type === 'junction' ? '#06B6D4' : '#10B981'}
                opacity="0.3"
                filter="url(#glow)"
              />
              {/* Station marker */}
              <circle
                cx={station.x}
                cy={station.y}
                r="6"
                fill={station.type === 'terminal' ? '#8B5CF6' : station.type === 'junction' ? '#06B6D4' : '#10B981'}
                stroke="white"
                strokeWidth="2"
              />
              {/* Station name */}
              <text
                x={station.x}
                y={station.y - 20}
                fill="white"
                fontSize="12"
                fontWeight="bold"
                textAnchor="middle"
                className="drop-shadow-lg"
              >
                {station.name}
              </text>
            </g>
          ))}

          {/* Trains */}
          {trainPositions.map((train) => {
            const color = getTrainColor(train.type);
            const isSelected = selectedTrainId === train.id;
            return (
              <g key={train.id} className="cursor-pointer">
                {/* Selection ring */}
                {isSelected && (
                  <circle
                    cx={train.x}
                    cy={train.y}
                    r="15"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                )}
                
                {/* Train glow */}
                <circle
                  cx={train.x}
                  cy={train.y}
                  r="8"
                  fill={color}
                  opacity="0.4"
                  filter="url(#glow)"
                />
                
                {/* Train body */}
                <rect
                  x={train.x - 6}
                  y={train.y - 4}
                  width="12"
                  height="8"
                  rx="2"
                  fill={color}
                  stroke="white"
                  strokeWidth="1"
                  onClick={() => onTrainClick(train.id)}
                  className={`transition-all duration-200 ${
                    train.status === 'critical' ? 'animate-pulse' : ''
                  }`}
                />
                
                {/* Train ID */}
                <text
                  x={train.x}
                  y={train.y + 20}
                  fill={train.status === 'critical' ? '#EF4444' : 
                        train.status === 'delayed' ? '#F59E0B' : '#FFFFFF'}
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="font-mono drop-shadow-sm"
                >
                  {train.id}
                </text>
                
                {/* Delay indicator */}
                {train.delay > 0 && (
                  <text
                    x={train.x}
                    y={train.y + 32}
                    fill="#EF4444"
                    fontSize="8"
                    textAnchor="middle"
                    className="font-mono"
                  >
                    +{train.delay}min
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-black/80 rounded-lg p-3 border border-gray-700">
          <h3 className="text-white font-semibold mb-2">Legend</h3>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-1 bg-green-500 rounded"></div>
              <span className="text-gray-300">Normal Track</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-1 bg-yellow-500 rounded"></div>
              <span className="text-gray-300">Delayed Track</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-1 bg-red-500 rounded"></div>
              <span className="text-gray-300">Blocked Track</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span className="text-gray-300">Local Train</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded"></div>
              <span className="text-gray-300">Express Train</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-600 rounded"></div>
              <span className="text-gray-300">Freight Train</span>
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm font-medium">SYSTEM ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

export default NetworkVisualization;