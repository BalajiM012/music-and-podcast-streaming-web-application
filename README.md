# Music and Podcast Streaming Web Application

A modern web application for streaming music and podcasts, built with React frontend and Express.js backend, featuring real-time audio visualization, offline support, and user authentication.

## Features

- **Audio Streaming**: Stream music tracks and podcasts seamlessly
- **Audio Visualizer**: Multiple visualization modes (circle, bars, wave) for an immersive experience
- **Offline Support**: Cache audio files for offline playback using IndexedDB
- **User Authentication**: Login and signup functionality with Supabase
- **Admin Panel**: Upload and manage content
- **Responsive Design**: Built with TailwindCSS for mobile and desktop compatibility
- **Categories**: Organized content into Music and Podcast categories

## Tech Stack

### Frontend

- **React 18** - UI framework
- **Vite** - Build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **IndexedDB** - Offline audio caching

### Backend

- **Express.js** - Web framework
- **Supabase** - Database and authentication
- **CORS** - Cross-origin resource sharing

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Supabase:

   - Create a Supabase project
   - Update `supabaseClient.js` with your project URL and API key
   - Set up the database schema using `src/models/schema.sql`

4. Start the backend server:
   ```bash
   node server.js
   ```
   The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Supabase:

   - Update `src/config/supabase.js` with your Supabase project credentials

4. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at http://localhost:5173

## Usage

1. **Home Page**: Browse featured content and categories
2. **Music/Podcast Pages**: Explore and stream audio content
3. **Audio Player**: Control playback with the fixed bottom player
4. **Visualizer**: Switch between different visualization modes
5. **Admin Upload**: Manage content through the admin panel (requires authentication)

## API Endpoints

### Tracks

- `GET /api/tracks` - Retrieve all music tracks

### Podcasts

- `GET /api/podcasts` - Retrieve all podcasts

### Categories

- `GET /api/categories` - Get available categories (Music, Podcast)

## Project Structure

```
music-and-podcast-streaming-web-application/
├── backend/
│   ├── server.js              # Main server file
│   ├── routes.js              # API routes
│   ├── supabaseClient.js      # Supabase configuration
│   └── src/
│       ├── controllers/       # Route controllers
│       ├── models/            # Database models
│       ├── routes/            # Modular routes
│       └── services/          # Business logic
├── frontend/
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   └── Player/        # Audio player components
│   │   ├── pages/             # Page components
│   │   ├── config/            # Configuration files
│   │   ├── context/           # React context
│   │   ├── hooks/             # Custom hooks
│   │   ├── services/          # API services
│   │   └── utils/             # Utility functions
│   ├── package.json           # Dependencies and scripts
│   └── vite.config.js         # Vite configuration
└── README.md                  # Project documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with modern web technologies for optimal performance
- Audio visualization powered by Web Audio API
- Offline functionality using IndexedDB for local storage
