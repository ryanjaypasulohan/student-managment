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
- `SESSION_LIFETIME=120`
- `SESSION_ENCRYPT=false`

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
cp .env.example .env
npm run dev
```

## Troubleshooting

### Common Issues

1. **Composer.lock Error**: If you get "composer.lock: not found" error:
   - The project uses `Dockerfile.minimal` which doesn't rely on composer.lock
   - This avoids PHP version conflicts between local and Docker environments
   - The Docker build will install dependencies directly from composer.json

2. **CORS Errors**: 
   - CORS is configured to allow all Render domains
   - Check that your frontend URL is in the allowed origins
   - The backend allows `https://*.onrender.com` and `https://*.render.com`

3. **Database Issues**: 
   - SQLite database will be created automatically during deployment
   - Database file is located at `/var/www/html/database/database.sqlite`
   - Permissions are set correctly for the database directory

4. **Apache Configuration**:
   - Apache is configured to serve Laravel from the `public` directory
   - URL rewriting is enabled for Laravel routes
   - .htaccess file is properly configured

5. **Environment Variables**: Ensure all required environment variables are set in Render dashboard

6. **Build Failures**: Check the build logs in Render dashboard for specific error messages

7. **PHP Version Conflicts**: The Dockerfile uses PHP 8.2 and ignores platform requirements to avoid conflicts

### Manual Deployment

If automatic deployment fails:

1. Deploy backend first:
   - Create a new Web Service
   - Select Docker environment
   - Use the Dockerfile.minimal in the backend directory
   - Set environment variables manually

2. Deploy frontend:
   - Create a new Static Site
   - Set build command: `cd frontend && npm install && npm run build`
   - Set publish directory: `frontend/dist`

## API Endpoints

- `GET /api/health` - Health check endpoint with detailed status
- `GET /api/status` - Simple status endpoint
- `POST /api/greet` - Greeting endpoint (example)

## Testing the Deployment

1. **Test Backend Health**: Visit `https://your-backend-url.onrender.com/api/health`
2. **Test API Endpoint**: Use the frontend to send a greeting request
3. **Check Logs**: Monitor the Render dashboard for any errors

## Support

For issues with Render deployment, check:
- Render documentation: https://render.com/docs
- Laravel deployment guide: https://laravel.com/docs/deployment
- React deployment guide: https://create-react-app.dev/docs/deployment/ 