#!/usr/bin/env bash
# Run remotely via deploy-<env>.sh
set -euo pipefail
IFS=$'\n\t'

# Pre-pull check.
if [ ! -z "$(git status --porcelain)" ];
then
    echo "*** Dirty repository detected ***"
    git status
    exit 1
fi

# Fetch latest from current branch.
git pull

# Update dependencies.
composer install

# Enter the web-root so that we can use drush.
cd web

# Import configuration from latest revision - overwrite the current state.
drush cim -y

# Perform any updates required by updated modules.
drush updb

# Clear cache.
drush cr
