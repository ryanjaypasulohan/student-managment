# Use official PHP image with PHP 8.2 and FPM
FROM php:8.2-fpm

# Install system dependencies for PHP extensions and tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libzip-dev \
    unzip \
    libonig-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && rm -rf /var/lib/apt/lists/*

# Configure and install PHP extensions needed by Laravel
RUN docker-php-ext-configure zip
RUN docker-php-ext-install pdo_mysql zip mbstring exif pcntl bcmath gd

# Increase PHP memory limit for composer
RUN echo "memory_limit=2G" > /usr/local/etc/php/conf.d/memory-limit.ini

# Install Composer globally
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory inside the container
WORKDIR /var/www/html

# Copy composer files separately to leverage Docker cache
COPY composer.json composer.lock ./

# Install PHP dependencies without dev packages and optimize autoloader (verbose output)
RUN composer install --no-dev --optimize-autoloader -vvv

# Copy the rest of the application files
COPY . .

# Generate Laravel app key and cache config/routes
RUN php artisan key:generate
RUN php artisan config:cache
RUN php artisan route:cache

# Expose port 9000 for PHP-FPM service
EXPOSE 9000

# Start PHP-FPM server
CMD ["php-fpm"]
