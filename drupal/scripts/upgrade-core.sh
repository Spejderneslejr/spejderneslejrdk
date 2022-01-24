#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "${SCRIPT_DIR}/../"

# Make sites/default read-only and executable
chmod -R a+w web/sites/default
time docker compose exec php bash << 'EOL'
  set -euo pipefail
  cd ..
  echo "Updating core"
  composer update drupal/core "drupal/core-*" --with-all-dependencies
  echo "Update-DB"
  cd web
  drush updb -y
  echo "Exporting config"
  drush cex -y
  echo "Done, now inspect your checkout for changes and commit them"
EOL

