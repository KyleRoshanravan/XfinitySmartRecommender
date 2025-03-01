# Use the official PHP Apache image
FROM php:8.1-apache

# Install additional PHP extensions (example: mysqli and pdo_mysql for MySQL support)
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Set working directory inside container
WORKDIR /var/www/html

# Copy project files to container
COPY . /var/www/html/

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html

# Expose port 80
EXPOSE 80

# Start Apache server
CMD ["apache2-foreground"]