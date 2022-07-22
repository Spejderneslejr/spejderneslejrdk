#!/usr/bin/env bash
#
set -euxo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cams="cam1.jpg cam2.jpg cam3.jpg cam4.jpg"
camDestDir="${SCRIPT_DIR}/../web/sites/default/files/mastecam"

# Iterate the string variable using for loop
mkdir -p "${camDestDir}"

function do_convert(){
  local dir=${1}
  local file=${2}
  local geo=${3}

  convert \
      -sampling-factor 4:2:0 \
      -strip \
      -quality 80 \
      -interlace Plane \
      -sharpen 0.2 \
      -colorspace sRGB \
      -geometry "${geo}>" \
      "${dir}/${file}" \
      "${dir}/${geo}-${file}"
}

set +e
IFS=' '
for cam in $cams; do
  if wget -O "/tmp/${cam}" "https://foto.sl2022.dk/cam/${cam}"; then
    mv "/tmp/${cam}" "${camDestDir}/"
    do_convert "${camDestDir}" "${cam}" "325x325"
    do_convert "${camDestDir}" "${cam}" "650x650"
    do_convert "${camDestDir}" "${cam}" "1300x1300"
    do_convert "${camDestDir}" "${cam}" "2600x2600"
  fi
done
set -e


