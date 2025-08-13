# Deployment Guide for Student Management System

This guide explains how to deploy the Laravel + React application on Render.

## Project Structure

```
student-managment/
├── backend/          # Laravel API
├── frontend/         # React App
├── render.yaml       # Render deployment configuration
└── README.md
```

## Prerequisites

1. A Render account
2. Git repository with your code

## Deployment Steps

### 1. Connect to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" and select "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file

### 2. Environment Variables

The deployment will automatically set up the following environment variables:

**Backend (Laravel):**
- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_KEY` (auto-generated)
- `APP_URL=https://laravel-backend.onrender.com`
- `DB_CONNECTION=sqlite`
- `DB_DATABASE=/var/www/html/database/database.sqlite`

**Frontend (React):**
- `VITE_API_URL=https://laravel-backend.onrender.com`

### 3. Services Created

The deployment will create two services:

1. **laravel-backend** - Docker-based Laravel API
2. **react-frontend** - Static React app

### 4. Post-Deployment

After deployment:

1. Update the `APP_URL` in the backend environment variables to match your actual backend URL
2. Update the `VITE_API_URL` in the frontend environment variables to match your backend URL
3. The frontend will be available at the URL provided by Render

## Local Development

### Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure the frontend URL is added to the CORS allowed origins in `backend/config/cors.php`

2. **Database Issues**: The SQLite database will be created automatically during deployment

3. **Environment Variables**: Ensure all required environment variables are set in Render dashboard

4. **Build Failures**: Check the build logs in Render dashboard for specific error messages

### Manual Deployment

If automatic deployment fails:

1. Deploy backend first:
   - Create a new Web Service
   - Select Docker environment
   - Use the Dockerfile in the backend directory
   - Set environment variables manually

2. Deploy frontend:
   - Create a new Static Site
   - Set build command: `cd frontend && npm install && npm run build`
   - Set publish directory: `frontend/dist`

## API Endpoints

- `POST /api/greet` - Greeting endpoint (example)

## Support

For issues with Render deployment, check:
- Render documentation: https://render.com/docs
- Laravel deployment guide: https://laravel.com/docs/deployment
- React deployment guide: https://create-react-app.dev/docs/deployment/ 