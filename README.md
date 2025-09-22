# Railsaksham - AI Powered Train Traffic Optimizer

A sophisticated frontend-only web application for railway traffic management and optimization, featuring real-time train simulation, AI-powered recommendations, and an interactive control room interface.

## Features

### 🚊 Real-Time Train Simulation
- Animated train movement along railway tracks
- Multiple train types (Local, Express, Freight) with distinct behaviors
- Dynamic collision avoidance and traffic management
- Real-time status updates and delay tracking

### 🎛️ Controller Dashboard
- **Left Panel**: Train details with sortable list, priority levels, and delay status
- **Main Panel**: Interactive railway network visualization with Mumbai suburban stations
- **Right Panel**: AI-powered recommendations for schedule optimization

### 🧠 AI Recommendations
- Schedule adjustment suggestions
- Route optimization proposals
- Priority management recommendations
- Confidence scoring for each recommendation

### 🎨 Professional UI/UX
- Dark control room aesthetic with glowing track lines
- Responsive design optimized for desktop and tablet
- Real-time visual feedback with color-coded status indicators
- Smooth animations and micro-interactions

## Technical Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Custom hooks** for simulation logic
- **SVG-based** network visualization
- **RequestAnimationFrame** for smooth animations

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd railsaksham
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Usage

### Basic Operation
1. **Start/Pause Simulation**: Use the control button to start or pause the train simulation
2. **Adjust Speed**: Use the speed slider to control simulation speed (0.1x to 3.0x)
3. **Select Trains**: Click on trains in the visualization or train list to inspect details
4. **Add Delays**: Use the "Add Delay" button to simulate operational disruptions
5. **AI Recommendations**: Review and approve/override AI suggestions in the right panel

### Train Status Indicators
- **Green**: On-time operation
- **Yellow**: Minor delays (1-10 minutes)
- **Red**: Major delays (10+ minutes)

### Track Status Colors
- **Green**: Normal operation
- **Yellow**: Delayed/Warning
- **Red**: Blocked/Critical
- **Orange**: Alternative route

## Data Structure

The application uses mock data for:
- **Stations**: Mumbai suburban network including Thane, Vikhroli, Ghatkopar, Dadar, Kurla, Bandra, Andheri, and Borivali
- **Tracks**: Connecting routes between stations with real-time status
- **Trains**: Multiple train types with varying priorities and schedules
- **AI Recommendations**: Dynamic suggestions based on network conditions

## Deployment

The application is designed to be deployed on modern static hosting platforms:

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Other Platforms
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by modern railway control room systems
- UI design influenced by Mumbai Railway's operational requirements
- Built with modern web technologies for optimal performance

src/
  components/
    auth/
      SignIn.jsx
      SignUp.jsx
      ProtectedRoute.jsx
      AuthContext.jsx
      Toast.jsx