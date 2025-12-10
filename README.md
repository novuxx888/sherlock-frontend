# Sherlock Frontend

React-based web dashboard for the Sherlock smart home monitoring system. Provides real-time sensor data visualization, device management, and camera control.

## Features

- **Sensor Dashboard**: Real-time visualization of temperature, humidity, and light levels
- **Device Management**: Monitor and control connected IoT devices
- **Image Gallery**: View captured images from Raspberry Pi camera
- **Camera Control**: Trigger image captures remotely
- **Firebase Authentication**: Secure user login
- **Real-time Updates**: WebSocket connection for live data

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Recharts** - Data visualization charts
- **Firebase** - Authentication and real-time database
- **Tailwind CSS** - Styling
- **WebSocket** - Real-time communication

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project credentials
- Backend server running (sherlock-backend)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure Firebase:
Create a `src/firebase.js` file with your Firebase config:
```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

3. Update WebSocket connection in `src/ws.js` to point to your backend server

## Running the App

### Development
```bash
npm run dev
```
Runs on `http://localhost:5173` by default.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## Project Structure

```
sherlock-frontend/
├── src/
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # Entry point
│   ├── firebase.js          # Firebase configuration
│   ├── AuthContext.jsx      # Authentication context
│   ├── ws.js                # WebSocket connection
│   ├── App.css              # Global styles
│   ├── index.css            # Base styles
│   ├── pages/
│   │   ├── captures.jsx     # Image gallery
│   │   ├── devices.jsx      # Device list
│   │   ├── devicedetail.jsx # Individual device view
│   │   ├── PiControl.jsx    # Camera control panel
│   │   └── sensordashboard.jsx # Sensor data charts
│   └── assets/              # Static assets
├── sensor_data/
│   ├── temperature.csv      # Historical temperature data
│   ├── humidity.csv         # Historical humidity data
│   └── light_level.csv      # Historical light data
├── public/                  # Public static files
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
└── package.json            # Dependencies
```

## Available Pages

### Home (`/`)
Landing page with navigation to all features.

### Sensor Dashboard (`/dashboard`)
Real-time charts displaying:
- Temperature readings
- Humidity levels
- Light intensity

### Devices (`/devices`)
List of all connected IoT devices with status indicators.

### Device Detail (`/devices/:id`)
Detailed view and controls for individual devices.

### Captures (`/captures`)
Gallery of images captured by the Raspberry Pi camera.

### Pi Control (`/pi-control`)
Remote camera control interface:
- Trigger image capture
- View connection status
- Send commands to Pi

## Utility Scripts

### Generate Sensor Data
```bash
node generate_sensor_data.js
```
Generates sample CSV data for testing the dashboard.

### Upload Sensor Data
```bash
node upload_all_sensors.js
```
Bulk upload sensor data to the backend.

## Environment Configuration

Create a `.env` file for Vite environment variables:
```env
VITE_BACKEND_URL=http://localhost:8080
VITE_WS_URL=ws://localhost:8080
```

## WebSocket Integration

The app maintains a persistent WebSocket connection to the backend for:
- Real-time sensor updates
- Device status changes
- Command acknowledgments

Connection is established in `src/App.jsx` and provided via `WebSocketContext`.

## Firebase Collections Used

- `captures`: Image metadata and URLs
- `devices`: Device status and information
- `logs`: System and device logs
- `sensors`: Real-time sensor readings

## Dependencies

Key dependencies:
- `react` & `react-dom` - Core React
- `react-router-dom` - Routing
- `firebase` - Backend services
- `recharts` - Charts and graphs
- `csv-parser` - CSV data processing

## Development Notes

- Uses React 19's latest features
- ESLint configured with React hooks and refresh plugins
- Vite for fast HMR (Hot Module Replacement)
- Modular component structure for maintainability

## License

ISC