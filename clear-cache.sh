#!/bin/bash

echo "🧹 Starting comprehensive cache clearing process..."

# Clear Git cache
echo "📦 Clearing Git cache..."
git rm -r --cached . 2>/dev/null || echo "Git cache already cleared"
git add .
git commit -m "Clear cache and update Dockerfile - $(date)" || echo "No changes to commit"

# Clear Composer cache (if in backend directory)
if [ -f "composer.json" ]; then
    echo "🎼 Clearing Composer cache..."
    composer clear-cache 2>/dev/null || echo "Composer cache cleared"
fi

# Clear npm cache (if in frontend directory)
if [ -f "package.json" ]; then
    echo "📦 Clearing npm cache..."
    npm cache clean --force 2>/dev/null || echo "npm cache cleared"
fi

# Clear Docker cache (if Docker is available)
if command -v docker &> /dev/null; then
    echo "🐳 Clearing Docker cache..."
    docker builder prune -f 2>/dev/null || echo "Docker builder cache cleared"
    docker system prune -a -f 2>/dev/null || echo "Docker system cache cleared"
fi

echo "✅ Cache clearing completed!"
echo ""
echo "Next steps:"
echo "1. Push changes: git push"
echo "2. Go to Render Dashboard"
echo "3. Clear build cache & deploy"
echo "4. Monitor deployment logs"
