export const stations = [
  { id: 'thane', name: 'THANE', x: 100, y: 100, type: 'junction' },
  { id: 'vikhroli', name: 'VIKHROLI', x: 250, y: 150, type: 'station' },
  { id: 'ghatkopar', name: 'GHATKOPAR', x: 400, y: 200, type: 'junction' },
  { id: 'dadar', name: 'DADAR', x: 550, y: 100, type: 'terminal' },
  { id: 'kurla', name: 'KURLA', x: 350, y: 300, type: 'station' },
  { id: 'bandra', name: 'BANDRA', x: 500, y: 250, type: 'station' },
  { id: 'andheri', name: 'ANDHERI', x: 150, y: 250, type: 'junction' },
  { id: 'borivali', name: 'BORIVALI', x: 50, y: 300, type: 'terminal' }
];

export const tracks = [
  {
    id: 'thane-vikhroli',
    from: 'thane',
    to: 'vikhroli',
    status: 'normal',
    length: 180,
    path: [{ x: 100, y: 100 }, { x: 175, y: 125 }, { x: 250, y: 150 }]
  },
  {
    id: 'vikhroli-ghatkopar',
    from: 'vikhroli',
    to: 'ghatkopar',
    status: 'normal',
    length: 180,
    path: [{ x: 250, y: 150 }, { x: 325, y: 175 }, { x: 400, y: 200 }]
  },
  {
    id: 'ghatkopar-dadar',
    from: 'ghatkopar',
    to: 'dadar',
    status: 'delayed',
    length: 200,
    path: [{ x: 400, y: 200 }, { x: 475, y: 150 }, { x: 550, y: 100 }]
  },
  {
    id: 'ghatkopar-kurla',
    from: 'ghatkopar',
    to: 'kurla',
    status: 'normal',
    length: 120,
    path: [{ x: 400, y: 200 }, { x: 375, y: 250 }, { x: 350, y: 300 }]
  },
  {
    id: 'kurla-bandra',
    from: 'kurla',
    to: 'bandra',
    status: 'warning',
    length: 160,
    path: [{ x: 350, y: 300 }, { x: 425, y: 275 }, { x: 500, y: 250 }]
  },
  {
    id: 'thane-andheri',
    from: 'thane',
    to: 'andheri',
    status: 'normal',
    length: 170,
    path: [{ x: 100, y: 100 }, { x: 125, y: 175 }, { x: 150, y: 250 }]
  },
  {
    id: 'andheri-borivali',
    from: 'andheri',
    to: 'borivali',
    status: 'normal',
    length: 120,
    path: [{ x: 150, y: 250 }, { x: 100, y: 275 }, { x: 50, y: 300 }]
  },
  {
    id: 'bandra-dadar',
    from: 'bandra',
    to: 'dadar',
    status: 'normal',
    length: 80,
    path: [{ x: 500, y: 250 }, { x: 525, y: 175 }, { x: 550, y: 100 }]
  }
];

export const initialTrains = [
  {
    id: 'CST-KYN Fast',
    type: 'Express',
    delay: 0,
    priority: 8,
    currentTrack: 'thane-vikhroli',
    position: 0.3,
    destination: 'DADAR',
    path: ['thane', 'vikhroli', 'ghatkopar', 'dadar'],
    speed: 1.2,
    status: 'on_time'
  },
  {
    id: 'DDR Exp',
    type: 'Local',
    delay: 5,
    priority: 5,
    currentTrack: 'ghatkopar-kurla',
    position: 0.6,
    destination: 'BANDRA',
    path: ['ghatkopar', 'kurla', 'bandra'],
    speed: 0.8,
    status: 'delayed'
  },
  {
    id: 'ADH-PNVL Local',
    type: 'Freight',
    delay: 0,
    priority: 3,
    currentTrack: 'andheri-borivali',
    position: 0.1,
    destination: 'BORIVALI',
    path: ['andheri', 'borivali'],
    speed: 0.5,
    status: 'on_time'
  },
  {
    id: 'Virar Fast',
    type: 'Local',
    delay: 0,
    priority: 6,
    currentTrack: 'vikhroli-ghatkopar',
    position: 0.8,
    destination: 'KURLA',
    path: ['vikhroli', 'ghatkopar', 'kurla'],
    speed: 1.0,
    status: 'on_time'
  },
  {
    id: 'BCT Raj Exp',
    type: 'Express',
    delay: 12,
    priority: 9,
    currentTrack: 'ghatkopar-dadar',
    position: 0.2,
    destination: 'DADAR',
    path: ['ghatkopar', 'dadar'],
    speed: 0.6,
    status: 'critical'
  },
  {
    id: 'CN Rake',
    type: 'Local',
    delay: 2,
    priority: 4,
    currentTrack: 'bandra-dadar',
    position: 0.4,
    destination: 'DADAR',
    path: ['bandra', 'dadar'],
    speed: 0.9,
    status: 'delayed'
  }
];

export const initialRecommendations = [
  {
    id: 'r1',
    type: 'reroute',
    trainId: 'BCT Raj Exp',
    description: 'Reroute BCT Raj Exp via KURLA-BANDRA to avoid 10-min delay',
    impact: 'Reduces delay by 8 minutes',
    confidence: 87
  },
  {
    id: 'r2',
    type: 'priority',
    trainId: 'CST-KYN Fast',
    description: 'Increase CST-KYN Fast priority for express schedule',
    impact: 'Maintains on-time performance',
    confidence: 92
  },
  {
    id: 'r3',
    type: 'schedule',
    trainId: 'DDR Exp',
    description: 'Delay DDR Exp departure by 3 minutes',
    impact: 'Prevents platform congestion',
    confidence: 78
  }
];