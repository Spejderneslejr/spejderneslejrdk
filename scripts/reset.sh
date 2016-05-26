#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "${DIR}/../"
# Chmod to 777 if the file is not owned by www-data
find web/sites/default/files \! -uid 33  \! -name .gitkeep | xargs chmod 777

time docker-compose run --entrypoint "sh -c" --rm drush " \
  drush updb -y && \
  drush cim -y && \
  drush --uri=http://local.docker uli"
