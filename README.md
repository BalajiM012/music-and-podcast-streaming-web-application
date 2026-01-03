# Music and Podcast Streaming Web Application

A full-stack web application for streaming music and podcasts, featuring offline playback, audio visualization, and user authentication.

## Features

- **Music Streaming**: Play tracks with a built-in audio player
- **Podcast Support**: Stream podcasts alongside music
- **Offline Playback**: Save songs locally for offline listening using IndexedDB
- **Audio Visualization**: Real-time audio visualizers including 3D visualizations
- **User Authentication**: Sign up and login functionality via Supabase
- **Admin Upload**: Dedicated page for administrators to upload content
- **Metadata Fetching**: Automatically fetch track metadata and album covers
- **Responsive Design**: Built with Tailwind CSS for mobile and desktop

## Tech Stack

### Frontend

- **React** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Authentication and real-time database
- **IndexedDB** - Offline data storage

### Backend

- **Express.js** - Web framework for Node.js
- **Supabase** - Database and API
- **CORS** - Cross-origin resource sharing

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd music-and-podcast-streaming-web-application
   ```

2. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:

   ```bash
   cd ../backend
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the `backend` directory with:

   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   ```

   For the frontend, create a `.env` file in the `frontend` directory with:

   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

   The backend will run on `http://localhost:5000`

2. Start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

   The frontend will run on `http://localhost:5173` (default Vite port)

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Tracks

- `GET /api/tracks` - Retrieve all tracks

### Podcasts

- `GET /api/podcasts` - Retrieve all podcasts

### Categories

- `GET /api/categories` - Get available categories (Music, Podcast)

## Project Structure

```
music-and-podcast-streaming-web-application/
├── backend/
│   ├── server.js          # Main server file
│   ├── routes.js          # API routes
│   ├── supabaseClient.js  # Supabase client configuration
│   └── src/
│       ├── controllers/   # Route controllers
│       ├── models/        # Database models/schemas
│       ├── routes/        # Additional routes
│       └── services/      # Business logic services
├── frontend/
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   └── config/        # Configuration files
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
