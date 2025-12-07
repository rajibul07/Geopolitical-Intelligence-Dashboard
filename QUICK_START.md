# Quick Start Guide - Local Development

## Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- VS Code

## Setup Instructions

### 1️⃣ Install Dependencies

**For Frontend:**
```bash
cd /Users/rajibulrahaman/Desktop/Dashboard\ _Project/data-visualization-dashboard
npm install
```

**For Backend:**
```bash
cd /Users/rajibulrahaman/Desktop/Dashboard\ _Project/data-visualization-dashboard/backend
npm install
```

### 2️⃣ Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
touch .env
```

Add your MongoDB connection string:
```
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
```

### 3️⃣ Seed the Database (Optional - First Time Only)

If you need to populate the database with sample data:

```bash
cd backend
node seed-data.js
```

### 4️⃣ Run the Application

You'll need **two terminal windows** in VS Code.

**Terminal 1 - Backend Server:**
```bash
cd backend
npm start
```
✅ Backend will run on: `http://localhost:5000`

**Terminal 2 - Frontend (Next.js):**
```bash
# From project root
npm run dev
```
✅ Frontend will run on: `http://localhost:3000`

## VS Code Terminal Shortcuts

### Open New Terminal in VS Code:
- **macOS:** `Ctrl + ` ` (backtick) or `Cmd + J`
- **Windows/Linux:** `Ctrl + ` `

### Split Terminal:
- Click the **split** icon in terminal toolbar
- Or use `Cmd + \` (macOS)

## Verify Everything is Running

1. **Check Backend Health:**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Should return: `{"status":"Server is running"}`

2. **Check Frontend:**
   Open browser: `http://localhost:3000`

3. **Check API Data:**
   ```bash
   curl http://localhost:5000/api/stats
   ```

## Common Commands

### Development
```bash
# Frontend (with hot reload)
npm run dev

# Backend (with nodemon for auto-restart)
cd backend
npm run dev
```

### Production Build
```bash
# Build frontend for production
npm run build

# Start production server
npm start
```

### Linting
```bash
# Lint frontend code
npm run lint
```

## Project Structure
```
data-visualization-dashboard/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main dashboard
│   ├── reports/           # Reports pages
│   ├── teams/             # Teams page
│   └── settings/          # Settings page
├── components/            # React components
│   ├── charts/           # Chart components
│   ├── dashboard.tsx     # Main dashboard
│   ├── filters.tsx       # Filter component
│   └── sidebar.tsx       # Sidebar navigation
├── backend/              # Express backend
│   ├── server.js        # API server
│   └── seed-data.js     # Database seeder
└── package.json          # Dependencies
```

## Available API Endpoints

- `GET /api/health` - Health check
- `GET /api/data` - Get all data with filters
- `GET /api/filters` - Get filter options
- `GET /api/stats` - Get statistics
- `GET /api/by-country` - Data grouped by country
- `GET /api/by-year` - Data grouped by year

## Troubleshooting

### Port Already in Use?
```bash
# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Issues?
- Check your `.env` file has correct `MONGODB_URI`
- Verify MongoDB Atlas IP whitelist (allow your IP)
- Test connection string in MongoDB Compass

### Module Not Found?
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. ✅ Backend running on `http://localhost:5000`
2. ✅ Frontend running on `http://localhost:3000`
3. Navigate to Reports, Teams, Settings from sidebar
4. Explore the dashboard with filters and charts

Happy coding! 🚀
