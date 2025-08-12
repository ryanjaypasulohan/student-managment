# Use official PHP image with PHP 8.2 and FPM (FastCGI Process Manager)
FROM php:8.2-fpm

# Install system dependencies needed for Laravel and PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libzip-dev \
    unzip \
    libonig-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev

# Configure and install PHP extensions Laravel needs
RUN docker-php-ext-configure zip
RUN docker-php-ext-install pdo_mysql zip mbstring exif pcntl bcmath gd

# Install Composer (PHP package manager)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory inside the container
WORKDIR /var/www/html

# Copy all project files to the working directory in the container
COPY . .

# Install PHP dependencies without dev packages and optimize autoloader
RUN composer install --no-dev --optimize-autoloader

# Generate Laravel app key
RUN php artisan key:generate

# Cache Laravel configuration and routes for performance
RUN php artisan config:cache
RUN php artisan route:cache

# Expose port 9000 for PHP-FPM service
EXPOSE 9000

# Start PHP-FPM server
CMD ["php-fpm"]
