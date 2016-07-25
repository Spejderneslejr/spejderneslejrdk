# TEST environment
And related tools. cwd is assumed to be <repo-clone>/docmentation/environment-setup/test
## Packages
```
apt-get -y install \
      php7.0-fpm \
      php7.0-curl \
      php7.0-gd \
      php7.0-xml \
      php7.0-mysql \
      php7.0-mbstring \
      mysql-client \
      git \
      unzip
```

## Composer
```
mkdir --parents /opt/drush-8.x && \
cd /opt/drush-8.x && \
composer init --require=drush/drush:8.* -n && \
composer config bin-dir /usr/local/bin && \
composer install
```

## Drush
```
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
php -r "if (hash_file('SHA384', 'composer-setup.php') === '92102166af5abdb03f49ce52a40591073a7b859a86e8ff13338cf7db58a19f7844fbc0bb79b2773bf30791e935dbd938') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" && \
php composer-setup.php --version=1.1.1 --filename=composer --install-dir=/usr/local/bin && \
php -r "unlink('composer-setup.php');"

```

## PHP-FPM
```
adduser --system --home /var/www/test_sl2017 --no-create-home --disabled-password test_sl2017
adduser --system --home /var/www/test_sl2017 --no-create-home --disabled-password test_sl2017_fpm
addgroup --system test_sl2017_fpm
adduser test_sl2017_fpm test_sl2017_fpm

mv /etc/php/7.0/fpm/pool.d/www.conf /etc/php/7.0/fpm/pool.d/www.conf.dist

cp fpm/reload-php.ini /etc/php/7.0/mods-available
phpenmod reload-php

cp fpm/test.sl2017.conf /etc/php/7.0/fpm/pool.d/test.sl2017.conf

/etc/init.d/php7.0-fpm restart
```

#Apache
```
apt-get -y install apache2
a2enmod rewrite
a2enmod proxy_fcgi
a2enmod remoteip

echo "<html><head><title>web01.sl2017.dk</title></head><body>web01.sl2017.dk</body></html>" > /var/www/html/index.html

mv /etc/apache2/ports.conf /etc/apache2/ports.conf.dist

echo "
Listen 8080
" | tee /etc/apache2/ports.conf

mv /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/000-default.conf.dist
cp apache/000-default.conf /etc/apache2/sites-available/000-default.conf
cp apache/test_sl2017.conf /etc/apache2/sites-available/test_sl2017.conf
a2ensite test_sl2017
cp apache/varnish.conf /etc/apache2/conf-available/varnish.conf
a2enconf varnish
apache2ctl configtest && apache2ctl restart
```

# MariaDb
```
apt-get -y mariadb-server

# SQL: grant all privileges on test_sl2017.* to test_sl2017_fpm@localhost identified by "<password here>";
```

# Varnish
```
apt-get -y install varnish

mv /etc/varnish/default.vcl /etc/varnish/default.vcl.dist

cp varnish/sl2017.vcl /etc/varnish/sl2017.vcl
cp varnish/backends.vcl /etc/varnish/backends.vcl
cp varnish/acmetool.vcl /etc/varnish/acmetool.vcl
cp varnish/basic-auth.vcl /etc/varnish/basic-auth.vcl
cp varnish/acl.vcl /etc/varnish/acl.vcl
cp varnish/serviced-sl2017.varnish.conf /etc/systemd/system/varnish.service.d/sl2017.varnish.conf

systemctl daemon-reload
systemctl restart varnish
service varnish stop
service varnish start

```

# Site setup
```
mkdir /var/www/test_sl2017
chown reload.reload /var/www/test_sl2017
cd /var/www/test_sl2017
git clone git@github.com:sl2017/spejderneslejrdk.git
sudo -u reload mkdir /var/www/test_sl2017/spejderneslejrdk/web/sites/default/files
sudo -u reload chown test_sl2017_fpm /var/www/test_sl2017/spejderneslejrdk/web/sites/default/files
# setup /var/www/test_sl2017/spejderneslejrdk/web/sites/default/settings.php
# setup /var/www/test_sl2017/spejderneslejrdk/web/sites/default/services.yml
cd -
```
