import React from 'react';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const TrainDetailsPanel = ({ 
  trains, 
  onTrainSelect, 
  selectedTrainId 
}) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'on_time':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'delayed':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Express':
        return 'text-red-400';
      case 'Local':
        return 'text-blue-400';
      case 'Freight':
        return 'text-orange-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center">
        <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
        Train Control
      </h2>
      
      <div className="space-y-3">
        {trains.map((train) => (
          <div
            key={train.id}
            className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
              selectedTrainId === train.id
                ? 'border-blue-500 bg-blue-900/20'
                : 'border-gray-700 bg-gray-800 hover:border-gray-600'
            }`}
            onClick={() => onTrainSelect(train.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-lg font-bold text-white">
                  {train.id}
                </span>
                {getStatusIcon(train.status)}
              </div>
              <span className={`text-sm font-medium ${getTypeColor(train.type)}`}>
                {train.type}
              </span>
            </div>
            
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Priority:</span>
                <span className="text-white">{train.priority}/10</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Delay:</span>
                <span className={`font-mono ${
                  train.delay > 10 ? 'text-red-400' : 
                  train.delay > 0 ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  {train.delay > 0 ? `+${train.delay}min` : 'On Time'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Destination:</span>
                <span className="text-white font-medium">{train.destination}</span>
              </div>
              
              <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    train.status === 'critical' ? 'bg-red-500' :
                    train.status === 'delayed' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${train.position * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainDetailsPanel;