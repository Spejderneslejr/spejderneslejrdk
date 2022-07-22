#!/usr/bin/env bash
#
set -euxo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cams="cam1.jpg cam2.jpg cam3.jpg cam4.jpg"

# Iterate the string variable using for loop
mkdir -p "${SCRIPT_DIR}/web/sites/default/files/mastecam"
set +e
IFS=' '
for cam in $cams; do
  if wget -O "/tmp/${cam}" "https://foto.sl2022.dk/cam/${cam}"; then
    mv "/tmp/${cam}" "${SCRIPT_DIR}/web/sites/default/files/mastecam"
    convert -verbose -quality 70 -geometry "1200x1200>" \
      "${SCRIPT_DIR}/web/sites/default/files/mastecam/${cam}" \
      "${SCRIPT_DIR}/web/sites/default/files/mastecam/1200-${cam}"
  fi
done
set -e



