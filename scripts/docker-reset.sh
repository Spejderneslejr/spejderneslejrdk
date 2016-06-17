#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echoc () {
	echo -e "\e[38;5;34m$1\e[0m"
}

# Clear all running containers.
sudo echo ""
echoc "*** Removing existing containers" 
docker-compose kill && docker-compose rm --all -v -f
# Start up containers in the background and continue imidiately
echoc "*** Starting new containers" 
docker-compose up --remove-orphans -d 
# Sleep while containers are starting up then perform a reset
sleep 15 
echoc "*** Resetting Drupal" && "${SCRIPT_DIR}/site-reset.sh"
# Done, bring the background docker-compose logs back into foreground
echoc "*** Done, watching logs"
docker-compose logs -f

