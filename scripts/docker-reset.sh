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
WEB_CONTAINER="web"

# Preemptive sudo lease - to let you go out and grab a coffee while the script
# runs.
sudo echo ""

# Clear all running containers.
echoc "*** Removing existing containers" 
docker-compose kill && docker-compose rm -v -f && docker-compose down --remove-orphans -v

# Start up containers in the background and continue immediately
echoc "*** Starting new containers"
docker-compose up --remove-orphans -d

# Perform the drupal-specific reset
echoc "*** Resetting Drupal"
"${SCRIPT_DIR}/site-reset.sh"

echoc "*** Warming cache by doing an initial request"
docker-compose exec ${WEB_CONTAINER} curl --silent --output /dev/null -H "Host: ${HOST}" localhost

