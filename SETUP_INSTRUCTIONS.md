# Setup Instructions for Geopolitical Dashboard

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas cloud)
- npm or yarn

## Setup Steps

### 1. Backend Setup

#### Step 1a: Install MongoDB
- **Local MongoDB**: Download from https://www.mongodb.com/try/download/community
- **MongoDB Atlas** (Cloud): https://www.mongodb.com/cloud/atlas
  - Create a free cluster
  - Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

#### Step 1b: Install Backend Dependencies
\`\`\`bash
cd backend
npm install
\`\`\`

#### Step 1c: Configure Environment Variables
Edit `backend/.env`:
\`\`\`
MONGODB_URI=mongodb://localhost:27017/geopolitical-dashboard
PORT=5000
\`\`\`

If using MongoDB Atlas, update MONGODB_URI with your connection string.

#### Step 1d: Seed the Database
\`\`\`bash
npm run seed
\`\`\`
This will read the jsondata.json file and populate your MongoDB database.

#### Step 1e: Start the Backend Server
\`\`\`bash
npm start
# Or for development with auto-reload:
npm run dev
\`\`\`

The server will start on http://localhost:5000

### 2. Frontend Setup

#### Step 2a: Configure Frontend Environment
Create or edit `frontend/.env.local`:
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:5000
\`\`\`

#### Step 2b: Start the Frontend
\`\`\`bash
npm run dev
\`\`\`

The frontend will run on http://localhost:3000

### 3. Verify the Connection

1. Backend health check: Visit http://localhost:5000/api/health
2. Dashboard: Visit http://localhost:3000
3. Test filters to see data from your MongoDB database

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/data` - Get all data with optional filters
- `GET /api/filters` - Get unique filter options
- `GET /api/stats` - Get statistics
- `GET /api/by-country` - Data grouped by country
- `GET /api/by-year` - Data grouped by year

## Query Parameters

Use these to filter data:
- `country` - Filter by country name
- `region` - Filter by region
- `topic` - Filter by topic
- `sector` - Filter by sector
- `pestle` - Filter by PESTLE category
- `minIntensity` - Minimum intensity (0-10)
- `maxIntensity` - Maximum intensity (0-10)

## Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- For Atlas, ensure IP whitelist includes your machine

### "API not responding"
- Check if backend is running on port 5000
- Verify NEXT_PUBLIC_API_URL in frontend .env.local
- Check browser console for CORS errors

### "No data appearing"
- Run `npm run seed` in backend directory
- Check if jsondata.json exists in backend folder
- Verify records in MongoDB: `mongo > use geopolitical-dashboard > db.geopolitical_data.countDocuments()`
