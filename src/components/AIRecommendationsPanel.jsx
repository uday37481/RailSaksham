import React from 'react';
import { Brain, CheckCircle, AlertCircle, Clock, TrendingUp } from 'lucide-react';

const AIRecommendationsPanel = ({
  recommendations,
  onApprove,
  onReject
}) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'schedule':
        return <Clock className="w-4 h-4 text-blue-400" />;
      case 'reroute':
        return <TrendingUp className="w-4 h-4 text-orange-400" />;
      case 'priority':
        return <AlertCircle className="w-4 h-4 text-purple-400" />;
      default:
        return <Brain className="w-4 h-4 text-gray-400" />;
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 85) return 'text-green-400';
    if (confidence >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center">
        <Brain className="w-5 h-5 text-purple-500 mr-2" />
        AI Recommendations
      </h2>
      
      <div className="space-y-4">
        {recommendations.map((recommendation) => (
          <div
            key={recommendation.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getTypeIcon(recommendation.type)}
                <span className="text-white font-semibold capitalize">
                  {recommendation.type}
                </span>
              </div>
              <span className={`text-sm font-mono ${getConfidenceColor(recommendation.confidence)}`}>
                {recommendation.confidence}%
              </span>
            </div>
            
            <div className="mb-3">
              <div className="text-sm text-gray-400 mb-1">Target Train:</div>
              <div className="font-mono text-white text-lg">
                {recommendation.trainId}
              </div>
            </div>
            
            <div className="mb-3">
              <div className="text-sm text-gray-300 leading-relaxed">
                {recommendation.description}
              </div>
            </div>
            
            <div className="mb-4 p-2 bg-gray-700/50 rounded border-l-2 border-blue-500">
              <div className="text-xs text-gray-400 mb-1">Impact Analysis:</div>
              <div className="text-sm text-blue-300">
                {recommendation.impact}
              </div>
            </div>
            
            {/* Confidence bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>AI Confidence</span>
                <span>{recommendation.confidence}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    recommendation.confidence >= 85 ? 'bg-green-500' :
                    recommendation.confidence >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${recommendation.confidence}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => onApprove(recommendation.id)}
                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-500 text-white text-sm rounded-md transition-colors duration-200"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Approve</span>
              </button>
              <button
                onClick={() => onReject(recommendation.id)}
                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded-md transition-colors duration-200"
              >
                <span>Override</span>
              </button>
            </div>
          </div>
        ))}
        
        {recommendations.length === 0 && (
          <div className="text-center py-8">
            <Brain className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <div className="text-gray-400">No active recommendations</div>
            <div className="text-sm text-gray-500 mt-1">
              AI monitoring system optimal
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommendationsPanel;