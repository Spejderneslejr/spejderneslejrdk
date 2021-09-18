#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echoc () {
    GREEN=$(tput setaf 2)
    RESET=$(tput sgr 0)
	echo -e "${GREEN}$1${RESET}"
}

# Hostname to send a request to to warm up the cache-cleared site.
HOST="localhost"
WEB_SERVICE="web"
PHP_SERVICE="php"

# Preemptive sudo lease - to let you go out and grab a coffee while the script
# runs.
sudo echo ""

# Clear all running containers.
docker-compose kill && docker-compose rm -v -f && docker-compose down --remove-orphans -v
echoc "*** Removing existing containers"

# Start up containers in the background and continue immediately
echoc "*** Starting new containers"
docker-compose up --remove-orphans -d

# Perform the drupal-specific reset
echoc "*** Resetting Drupal"
"${SCRIPT_DIR}/site-reset.sh"

echoc "*** Warming cache by doing an initial request"
docker-compose exec ${WEB_SERVICE} curl --silent --output /dev/null -H "Host: ${HOST}" localhost

echoc "*** Access the site via http://spejderneslejr.docker (or http://localhost:$(docker compose port web 80 | cut -d ":" -f2) if you don't have a development proxy)"
echoc "*** Access the site as user 1 via $(docker compose exec ${PHP_SERVICE} drush -l spejderneslejr.docker uli)"
