#!/usr/bin/env sh

set -e

TOOLS_PATH="$(dirname $0)"

${TOOLS_PATH}/cascade-changes.sh \
  $* \
  base \
  api
