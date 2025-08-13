# How to Clear Render Cache and Fix Deployment Issues

## Method 1: Force Redeploy (Recommended)

1. **Go to Render Dashboard**
2. **Find your service** (laravel-backend)
3. **Click on the service**
4. **Go to "Settings" tab**
5. **Scroll down to "Build & Deploy" section**
6. **Click "Clear build cache & deploy"**
7. **Wait for the new deployment to complete**

## Method 2: Manual Cache Clearing

If Method 1 doesn't work:

1. **Delete the service** from Render dashboard
2. **Create a new service** with the same configuration
3. **Use the new `Dockerfile.fresh`** which avoids all caching issues

## Method 3: Update Service Configuration

1. **Go to service settings**
2. **Change the Dockerfile path** to `./backend/Dockerfile.fresh`
3. **Save and redeploy**

## Method 4: Local Testing

To test locally before deploying:

```bash
# Build the Docker image locally
cd backend
docker build -f Dockerfile.fresh -t laravel-test .

# Run the container
docker run -p 8000:80 laravel-test
```

## Troubleshooting

### If you still get "composer.json not found":

1. **Check file permissions** - Ensure composer.json is readable
2. **Verify file exists** - Run `ls -la composer.json` in backend directory
3. **Check .dockerignore** - Ensure composer.json is not excluded
4. **Use absolute paths** - Try using absolute paths in Dockerfile

### If build still fails:

1. **Check Render logs** for specific error messages
2. **Try different PHP version** - Update Dockerfile to use `php:8.1-apache`
3. **Simplify Dockerfile** - Remove complex caching logic
4. **Contact Render support** if issues persist

## Current Configuration

The project now uses:
- `Dockerfile.fresh` - Simplified Dockerfile without caching
- `buildFilter` in render.yaml - Ensures backend files are included
- Debug output in Dockerfile - Shows what files are present during build
