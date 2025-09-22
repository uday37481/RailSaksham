import { useState, useEffect, useCallback, useRef } from 'react';
import { initialTrains, tracks, stations, initialRecommendations } from '../data/mockData';

export const useTrainSimulation = () => {
  const [simulationState, setSimulationState] = useState({
    trains: initialTrains,
    tracks: tracks,
    stations: stations,
    recommendations: initialRecommendations,
    isRunning: true,
    speed: 1.0
  });

  const animationFrameRef = useRef();
  const lastUpdateTimeRef = useRef(Date.now());

  const getTrackById = useCallback((trackId) => {
    return simulationState.tracks.find(track => track.id === trackId);
  }, [simulationState.tracks]);

  const getNextTrack = useCallback((train) => {
    const currentTrackIndex = train.path.findIndex(stationId => {
      return simulationState.tracks.some(track => 
        (track.from === stationId || track.to === stationId) && track.id === train.currentTrack
      );
    });
    
    if (currentTrackIndex < train.path.length - 2) {
      const nextStation = train.path[currentTrackIndex + 1];
      const nextNextStation = train.path[currentTrackIndex + 2];
      return simulationState.tracks.find(track => 
        (track.from === nextStation && track.to === nextNextStation) ||
        (track.to === nextStation && track.from === nextNextStation)
      );
    }
    return null;
  }, [simulationState.tracks]);

  const checkCollision = useCallback((train, newPosition) => {
    const currentTrack = getTrackById(train.currentTrack);
    if (!currentTrack) return false;

    return simulationState.trains.some(otherTrain => {
      if (otherTrain.id === train.id) return false;
      if (otherTrain.currentTrack !== train.currentTrack) return false;
      
      const distance = Math.abs(otherTrain.position - newPosition);
      return distance < 0.1; // Minimum safe distance
    });
  }, [simulationState.trains, getTrackById]);

  const updateTrainPositions = useCallback(() => {
    if (!simulationState.isRunning) return;

    const now = Date.now();
    const deltaTime = (now - lastUpdateTimeRef.current) / 1000; // seconds
    lastUpdateTimeRef.current = now;

    setSimulationState(prevState => {
      const updatedTrains = prevState.trains.map(train => {
        const track = getTrackById(train.currentTrack);
        if (!track) return train;

        let speed = train.speed * prevState.speed;
        
        // Adjust speed based on delay status
        if (train.status === 'delayed') speed *= 0.7;
        if (train.status === 'critical') speed *= 0.3;
        if (track.status === 'blocked') speed *= 0.1;
        if (track.status === 'delayed') speed *= 0.6;

        const moveDistance = (speed * deltaTime) / 10; // Normalized movement
        let newPosition = train.position + moveDistance;

        // Check for collision
        if (checkCollision(train, newPosition)) {
          speed *= 0.2; // Slow down significantly
          newPosition = train.position + (moveDistance * 0.2);
        }

        // Handle track completion
        if (newPosition >= 1.0) {
          const nextTrack = getNextTrack(train);
          if (nextTrack) {
            return {
              ...train,
              currentTrack: nextTrack.id,
              position: 0,
              speed: train.speed
            };
          } else {
            // Train reached destination, reset or remove
            const firstTrackId = prevState.tracks[Math.floor(Math.random() * prevState.tracks.length)].id;
            return {
              ...train,
              currentTrack: firstTrackId,
              position: 0,
              speed: train.speed
            };
          }
        }

        return {
          ...train,
          position: Math.min(newPosition, 1.0)
        };
      });

      // Update track statuses based on train conditions
      const updatedTracks = prevState.tracks.map(track => {
        const trainsOnTrack = updatedTrains.filter(t => t.currentTrack === track.id);
        const hasDelayedTrain = trainsOnTrack.some(t => t.status === 'delayed' || t.status === 'critical');
        const hasMultipleTrains = trainsOnTrack.length > 1;

        let newStatus = track.status;
        if (hasMultipleTrains && hasDelayedTrain) {
          newStatus = 'blocked';
        } else if (hasDelayedTrain) {
          newStatus = 'delayed';
        } else if (hasMultipleTrains) {
          newStatus = 'warning';
        } else if (track.status === 'blocked' || track.status === 'delayed') {
          newStatus = 'normal'; // Clear status if no issues
        }

        return { ...track, status: newStatus };
      });

      return {
        ...prevState,
        trains: updatedTrains,
        tracks: updatedTracks
      };
    });
  }, [simulationState.isRunning, getTrackById, checkCollision, getNextTrack]);

  const addDelay = useCallback((trainId, delayMinutes) => {
    setSimulationState(prevState => ({
      ...prevState,
      trains: prevState.trains.map(train => {
        if (train.id === trainId) {
          const newDelay = train.delay + delayMinutes;
          return {
            ...train,
            delay: newDelay,
            status: newDelay > 10 ? 'critical' : newDelay > 0 ? 'delayed' : 'on_time',
            speed: train.speed * (newDelay > 10 ? 0.3 : newDelay > 5 ? 0.6 : 1.0)
          };
        }
        return train;
      })
    }));
  }, []);

  const toggleSimulation = useCallback(() => {
    setSimulationState(prevState => ({
      ...prevState,
      isRunning: !prevState.isRunning
    }));
  }, []);

  const setSimulationSpeed = useCallback((speed) => {
    setSimulationState(prevState => ({
      ...prevState,
      speed: Math.max(0.1, Math.min(3.0, speed))
    }));
  }, []);

  useEffect(() => {
    const animate = () => {
      updateTrainPositions();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (simulationState.isRunning) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [simulationState.isRunning, updateTrainPositions]);

  return {
    simulationState,
    addDelay,
    toggleSimulation,
    setSimulationSpeed
  };
};