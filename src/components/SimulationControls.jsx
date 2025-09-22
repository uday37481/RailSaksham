import React, { useState } from 'react';
import { Play, Pause, Plus, Settings, Zap, AlertTriangle } from 'lucide-react';

const SimulationControls = ({
  trains,
  isRunning,
  speed,
  onToggleSimulation,
  onSpeedChange,
  onAddDelay
}) => {
  const [showDelayModal, setShowDelayModal] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState('');
  const [delayMinutes, setDelayMinutes] = useState(5);
  const [showScenarioModal, setShowScenarioModal] = useState(false);

  const handleAddDelay = () => {
    if (selectedTrain) {
      onAddDelay(selectedTrain, delayMinutes);
      setShowDelayModal(false);
      setSelectedTrain('');
      setDelayMinutes(5);
    }
  };

  return (
    <div className="bg-gray-800 border-t border-gray-700 p-4">
      <div className="flex items-center justify-between">
        {/* Left section - Simulation controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSimulation}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
              isRunning 
                ? 'bg-red-600 hover:bg-red-500 text-white' 
                : 'bg-green-600 hover:bg-green-500 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Pause' : 'Start'} Simulation</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <label className="text-gray-300 text-sm">Speed:</label>
            <input
              type="range"
              min="0.1"
              max="3.0"
              step="0.1"
              value={speed}
              onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
              className="w-24 accent-blue-500"
            />
            <span className="text-gray-300 text-sm font-mono w-12">
              {speed.toFixed(1)}x
            </span>
          </div>
        </div>

        {/* Center section - System status */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
            <span className="text-gray-300 text-sm">
              System {isRunning ? 'Active' : 'Paused'}
            </span>
          </div>
          
          <div className="text-gray-300 text-sm">
            Active Trains: <span className="font-mono text-white">{trains.length}</span>
          </div>
          
          <div className="text-gray-300 text-sm">
            Delays: <span className="font-mono text-red-400">
              {trains.filter(t => t.delay > 0).length}
            </span>
          </div>
        </div>

        {/* Right section - Action buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowDelayModal(true)}
            className="flex items-center space-x-2 px-3 py-2 bg-yellow-600 hover:bg-yellow-500 text-white text-sm rounded-md transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Delay</span>
          </button>
          
          <button
            onClick={() => setShowScenarioModal(true)}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-md transition-colors duration-200"
          >
            <Zap className="w-4 h-4" />
            <span>What If</span>
          </button>
        </div>
      </div>

      {/* Add Delay Modal */}
      {showDelayModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
              Add Delay to Train
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Select Train:</label>
                <select
                  value={selectedTrain}
                  onChange={(e) => setSelectedTrain(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Choose a train...</option>
                  {trains.map(train => (
                    <option key={train.id} value={train.id}>
                      {train.id} - {train.type} (Current delay: {train.delay}min)
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Delay Amount: {delayMinutes} minutes
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={delayMinutes}
                  onChange={(e) => setDelayMinutes(parseInt(e.target.value))}
                  className="w-full accent-yellow-500"
                />
              </div>
            </div>
            
            <div className="flex space-x-2 mt-6">
              <button
                onClick={handleAddDelay}
                disabled={!selectedTrain}
                className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 text-white rounded-md transition-colors duration-200"
              >
                Add Delay
              </button>
              <button
                onClick={() => setShowDelayModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* What If Scenario Modal */}
      {showScenarioModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Settings className="w-5 h-5 text-blue-500 mr-2" />
              What If Scenario
            </h3>
            
            <div className="text-center py-8">
              <Zap className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <div className="text-gray-300 mb-2">Advanced Scenario Modeling</div>
              <div className="text-sm text-gray-500">
                Feature coming soon - Complex route optimization and impact analysis
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowScenarioModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationControls;