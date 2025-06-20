FROM php:8.2-apache

#copy into html catalog
COPY . /var/www/html/

#Add mysqli extension
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN docker-php-ext-install pdo_mysql && docker-php-ext-enable pdo_mysql