# Contextually Personal AI - React Client

A modern React application for testing and demonstrating the Advanced Adaptation Models (Phase 4) of the Contextually Personal AI system.

## Features

### 🧠 Advanced Adaptation Models

1. **Offline Content Generation**
   - Generate content optimized for offline-first learning
   - Configure priority levels and device context
   - View storage requirements and sync status

2. **Low Bandwidth Compression**
   - Compress content for slow network connections
   - Adjust compression based on bandwidth and device type
   - Monitor compression ratios and quality metrics

3. **Behavioral Content Adaptation**
   - Adapt content based on user behavior patterns
   - Configure attention span, completion rates, and learning pace
   - Receive personalized recommendations and adaptations

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Axios** for API communication
- **Modern CSS** with responsive design
- **Glassmorphism UI** design

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running on `http://localhost:3000`

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Integration

The client connects to the backend API at `http://localhost:3000/api` and includes:

- **Type-safe API client** with TypeScript interfaces
- **Error handling** and loading states
- **Form validation** and user feedback
- **Responsive design** for mobile and desktop

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── OfflineContentForm.tsx    # Offline content generation
│   │   ├── CompressContentForm.tsx   # Content compression
│   │   └── AdaptContentForm.tsx      # Behavioral adaptation
│   ├── api/
│   │   └── client.ts                 # API client and types
│   ├── App.tsx                       # Main application component
│   ├── App.css                       # Application styles
│   └── main.tsx                      # Application entry point
├── public/                           # Static assets
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

## Usage

### Offline Content Generation

1. Select the "Offline Content" tab
2. Enter the content you want to make available offline
3. Choose content type (text, image, video, interactive)
4. Set priority level (high, medium, low)
5. Configure device context and storage availability
6. Submit to generate offline-optimized content

### Content Compression

1. Select the "Compress Content" tab
2. Enter content to compress
3. Select content type and bandwidth level
4. Configure device and connection context
5. Submit to get compressed content with metrics

### Behavioral Adaptation

1. Select the "Adapt Content" tab
2. Enter user ID and content
3. Configure user behavior parameters:
   - Attention span
   - Completion rate
   - Interaction frequency
   - Preferred format
   - Learning pace
4. Set context (device, session duration, time of day)
5. Submit to get personalized content adaptations

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Adding New Features

1. Create new components in `src/components/`
2. Add API methods in `src/api/client.ts`
3. Update the main App.tsx to include new tabs
4. Add corresponding styles in App.css

## Contributing

1. Follow the existing code style and TypeScript patterns
2. Add proper error handling and loading states
3. Ensure responsive design works on mobile devices
4. Test API integration with the backend

## License

This project is part of the Contextually Personal AI system focused on human-centered intelligence for Africa's future.
