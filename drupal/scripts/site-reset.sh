#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "${SCRIPT_DIR}/../"
# Chmod to 777 if the file is not owned by www-data
mkdir -p web/sites/default/files

# Compile css and change directory back to script dir.
cd web/themes/custom/camp && yarn build:css
cd "${SCRIPT_DIR}/../"

# Make sites/default read-only and executable
time docker compose exec php sh -c  "\
  echo ' * Waiting php container to be ready' \
  && wait-for-it -t 60 localhost:9000 \
  && echo ' * Waiting for the database to be available' \
  && wait-for-it -t 60 db:3306 \
  && echo 'Fixing permissions' \
  && mkdir -p /var/www/web/sites/default/files \
  && chmod 555 /var/www/web/sites/default \
  && chown -R www-data.www-data /var/www/web/sites/default/files \
  && echo 'composer installing' \
  && cd /var/www && composer install && cd /var/www/web \
  && echo 'Site reset' \
  && echo 'Exporting current configuration' \
  && rm -fr /var/www/configuration/export \
  && drush cex -y --destination=/var/www/configuration/export \
  && echo ' * Drush deploy' \
  && drush deploy \
  && echo ' * Locale check and update' \
  && drush locale-check \
  && drush locale-update
  "
