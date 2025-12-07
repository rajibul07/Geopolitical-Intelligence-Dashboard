# Backend Setup Guide - Geopolitical Dashboard

## Quick Start Overview

This dashboard requires a Node.js/Express backend connected to MongoDB. Follow these steps to get everything running.

## Prerequisites

Before starting, ensure you have:
- **Node.js** v16+ installed (download from https://nodejs.org)
- **MongoDB** (choose one):
  - **Local MongoDB**: https://www.mongodb.com/try/download/community
  - **MongoDB Atlas (Cloud)**: https://www.mongodb.com/cloud/atlas (recommended for beginners)
- **Git** (optional, for cloning)

## Step 1: Set Up MongoDB

### Option A: MongoDB Atlas (Cloud - Recommended)

1. Visit https://www.mongodb.com/cloud/atlas
2. Click "Sign Up" and create a free account
3. Create a new cluster (select "Shared" tier - it's free)
4. Once created, click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Keep this connection string - you'll need it in Step 3

### Option B: Local MongoDB

1. Download and install MongoDB from https://www.mongodb.com/try/download/community
2. Follow the installation guide for your OS
3. Start MongoDB service (typically runs on localhost:27017)
4. Connection string will be: `mongodb://localhost:27017/geopolitical-dashboard`

## Step 2: Set Up Backend Server

1. **Create a backend folder** in your project root:
   \`\`\`bash
   mkdir backend
   cd backend
   \`\`\`

2. **Copy the backend files** you received:
   - `server.js`
   - `seed-data.js`
   - `package.json`
   - `.env`
   - `jsondata.json` (the JSON data file)

3. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

## Step 3: Configure Environment Variables

1. **Edit `backend/.env`**:
   \`\`\`
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/geopolitical-dashboard
   PORT=5000
   \`\`\`

   - Replace `your-username`, `your-password`, and `your-cluster` with your MongoDB Atlas credentials
   - Or use `mongodb://localhost:27017/geopolitical-dashboard` if using local MongoDB

## Step 4: Seed the Database

1. **Make sure jsondata.json is in the backend folder**
2. **Run the seed script**:
   \`\`\`bash
   npm run seed
   \`\`\`
   
   You should see:
   \`\`\`
   Connecting to MongoDB...
   Connected to MongoDB
   Cleared existing data
   Inserting 1000+ records...
   Successfully inserted XXXX records
   Indexes created
   Database seeding completed successfully
   \`\`\`

## Step 5: Start the Backend Server

\`\`\`bash
npm start
\`\`\`

You should see:
\`\`\`
Server is running on port 5000
MongoDB connected successfully
\`\`\`

To verify the backend is working, visit: http://localhost:5000/api/health

You should see: `{"status":"Server is running"}`

## Step 6: Connect Frontend to Backend

1. **The frontend is already configured** to use `http://localhost:5000`
2. **Start the frontend** (in a new terminal from project root):
   \`\`\`bash
   npm run dev
   \`\`\`
3. Visit http://localhost:3000

## Step 7: Verify Everything Works

1. **Check the green status**: Backend should not show a warning message at the top
2. **Test filters**: Try selecting different countries/sectors - data should update
3. **Charts update**: Bar charts and statistics should show real data from MongoDB

## API Endpoints (For Reference)

Your backend provides these endpoints:

- `GET /api/health` - Health check
- `GET /api/data` - Get all data with optional filters
  - Query params: `country`, `region`, `topic`, `sector`, `pestle`, `minIntensity`, `maxIntensity`
- `GET /api/stats` - Get statistics (avg intensity, likelihood, relevance, total count)
- `GET /api/filters` - Get unique values for all filter dropdowns
- `GET /api/by-country` - Data grouped by country
- `GET /api/by-year` - Data grouped by year

## Troubleshooting

### "Cannot connect to MongoDB"
- Check MONGODB_URI in backend/.env is correct
- For Atlas: verify IP address is whitelisted (Atlas dashboard → Network Access)
- For Local: ensure MongoDB service is running

### "Port 5000 already in use"
\`\`\`bash
# Kill process on port 5000
# On Windows:
netstat -ano | findstr :5000
taskkill /PID [PID] /F

# On Mac/Linux:
lsof -ti:5000 | xargs kill -9
\`\`\`

### "No data appearing in dashboard"
1. Check if seed was successful: `npm run seed`
2. Verify records in MongoDB:
   \`\`\`bash
   # Connect to MongoDB and check
   mongo
   > use geopolitical-dashboard
   > db.geopolitical_data.countDocuments()
   \`\`\`
3. Check browser console for errors (F12 → Console tab)

### "Backend not responding" error at top of dashboard
- Ensure backend is running on port 5000
- Check `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:5000`
- Check browser console (F12) for CORS errors

### "Cannot find jsondata.json"
- Make sure `jsondata.json` is in the `backend/` folder
- Run `npm run seed` from within the `backend/` directory

## Production Deployment

To deploy to production:

1. **Backend**: Deploy to services like:
   - Heroku (free tier available)
   - Railway
   - Render
   - AWS/Google Cloud

2. **Update Frontend**: Change `NEXT_PUBLIC_API_URL` in `.env.local` to your production backend URL

3. **Database**: Use MongoDB Atlas (free tier available)

## Support

If you encounter issues:
1. Check the terminal output for error messages
2. Look at browser console (F12 → Console tab)
3. Verify all services are running on correct ports
4. Check environment variables are set correctly
\`\`\`
