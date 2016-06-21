#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "${SCRIPT_DIR}/../"
# Chmod to 777 if the file is not owned by www-data
find web/sites/default/files \! -uid 33  \! -print0 -name .gitkeep | sudo xargs -0 chmod 777

# Make sites/default read-only and executable
sudo chmod 555 web/sites/default

time docker-compose run --entrypoint "sh -c" --rm drush " \
  drush cim -y && \
  drush updb -y && \
  drush cr
  "
