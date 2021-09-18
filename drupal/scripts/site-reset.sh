#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "${SCRIPT_DIR}/../"
# Chmod to 777 if the file is not owned by www-data
mkdir -p web/sites/default/files
find web/sites/default/files \! -uid 33  \! -print0 -name .gitkeep | sudo xargs -0 chmod 777

# Make sites/default read-only and executable
sudo chmod 555 web/sites/default
time docker-compose exec php sh -c  "\
  echo ' * Waiting php container to be ready' \
  && wait-for-it -t 60 localhost:9000 \
  && echo ' * Waiting for the database to be available' \
  && wait-for-it -t 60 db:3306 \
  && echo 'composer installing' \
  && cd /var/www && composer install && cd /var/www/web \
  echo 'Site reset' && \
  echo ' * Drush deploy' && \
  drush deploy && \
  echo ' * Locale check and update' && \
  drush locale-check && \
  drush locale-update && \
  echo ' * Cache rebuild' && \
  drush cache-rebuild
  "
