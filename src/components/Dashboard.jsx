import React, { useState } from 'react';
import { useTrainSimulation } from '../hooks/useTrainSimulation';
import TrainDetailsPanel from './TrainDetailsPanel';
import NetworkVisualization from './NetworkVisualization';
import AIRecommendationsPanel from './AIRecommendationsPanel';
import SimulationControls from './SimulationControls';

const Dashboard = () => {
  const {
    simulationState,
    addDelay,
    toggleSimulation,
    setSimulationSpeed,
  } = useTrainSimulation();
  
  const [selectedTrainId, setSelectedTrainId] = useState();

  const handleTrainSelect = (trainId) => {
    setSelectedTrainId(trainId === selectedTrainId ? undefined : trainId);
  };

  const handleApproveRecommendation = (recommendationId) => {
    console.log('Approved recommendation:', recommendationId);
    // Implementation would apply the recommendation
  };

  const handleRejectRecommendation = (recommendationId) => {
    console.log('Rejected recommendation:', recommendationId);
    // Implementation would dismiss the recommendation
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Railsaksham</h1>
            <p className="text-gray-400 text-sm">AI Powered Train Traffic Optimizer</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-400">Mumbai Control Center</div>
              <div className="text-xs text-green-400">All Systems Operational</div>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Train Details */}
        <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
          <TrainDetailsPanel
            trains={simulationState.trains}
            onTrainSelect={handleTrainSelect}
            selectedTrainId={selectedTrainId}
          />
        </div>

        {/* Main Panel - Network Visualization */}
        <div className="flex-1 flex flex-col">
          <NetworkVisualization
            trains={simulationState.trains}
            tracks={simulationState.tracks}
            stations={simulationState.stations}
            onTrainClick={handleTrainSelect}
            selectedTrainId={selectedTrainId}
          />
        </div>

        {/* Right Panel - AI Recommendations */}
        <div className="w-80 bg-gray-900 border-l border-gray-700 flex flex-col">
          <AIRecommendationsPanel
            recommendations={simulationState.recommendations}
            onApprove={handleApproveRecommendation}
            onReject={handleRejectRecommendation}
          />
        </div>
      </div>

      {/* Bottom Controls */}
      <SimulationControls
        trains={simulationState.trains}
        isRunning={simulationState.isRunning}
        speed={simulationState.speed}
        onToggleSimulation={toggleSimulation}
        onSpeedChange={setSimulationSpeed}
        onAddDelay={addDelay}
      />
    </div>
  );
};

export default Dashboard;