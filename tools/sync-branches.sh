#!/usr/bin/env sh

set -e

function cascade_changes() {

  if [ $1 == "--skip-tests" ]; then
    local SKIP_TESTS=true
    shift
  fi

  local PARENT=$1
  shift

  for CURRENT in $*; do

    git checkout $CURRENT
    git merge --no-edit $PARENT
    [ "$SKIP_TESTS" = "true" ] || yarn jest

    PARENT="$CURRENT"

  done

  git push --all

}

cascade_changes \
  testing-00-boilerplate \
  testing-01-meal-planner \
  testing-02-meal-planner-reactive \
  testing-03-recipe-search-boilerplate
