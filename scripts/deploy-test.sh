#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

CLONE_DIR="/var/www/test_sl2017/spejderneslejrdk"

read -p "Pull latest release to STAGE? (y/n)" -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
  echo "Aborted"
  exit 1
fi
ssh reload@test.web.sl2017.dk "cd ${CLONE_DIR}; bash -s" < "${SCRIPT_DIR}/general-deploy.sh"
