FROM php:8.4-apache

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    libzip-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev

RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install pdo_mysql zip gd mbstring

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-dev --optimize-autoloader

# Create the storage symlink so uploaded images (public disk) are web-accessible
RUN php artisan storage:link

# Ensure storage and cache directories are writable by Apache at runtime
RUN chown -R www-data:www-data storage bootstrap/cache && \
    chmod -R 775 storage bootstrap/cache

RUN a2enmod rewrite

COPY apache.conf /etc/apache2/sites-available/000-default.conf

EXPOSE 80

# Migrations are idempotent (only new migrations run).
# Seeding is intentionally omitted — run manually when needed:
#   docker exec <container> php artisan db:seed --force
CMD php artisan migrate --force && \
    apache2-foreground
