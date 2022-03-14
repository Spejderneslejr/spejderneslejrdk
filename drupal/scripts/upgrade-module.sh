#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [[ $# -lt 1 ]] ; then
    echo "Syntax: $0 <module name>"
    exit 1
fi
module=$1

cd "${SCRIPT_DIR}/../"

# Make sites/default read-only and executable
chmod -R a+w web/sites/default

time docker compose exec php sh -c "\
  cd .. \
  && echo 'Updating ${module}' \
  && composer update drupal/${module} --with-all-dependencies \
  && echo 'Update-DB' \
  && cd web \
  && drush updb -y \
  && echo 'Exporting config' \
  && drush cex -y \
  && echo 'Done, now inspect your checkout for changes and commit them'
"
