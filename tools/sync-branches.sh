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
  testing-03-recipe-search-boilerplate \
  testing-04-recipe-search-isolated-boilerplate \
  testing-05-recipe-search-isolated \
  testing-06-recipe-search-integration-boilerplate \
  testing-07-recipe-search-integration \
  testing-08-recipe-search-shallow-boilerplate \
  testing-09-recipe-search-shallow \
  testing-10-recipe-search-async-pipe \
  testing-11-recipe-filter-boilerplate \
  testing-12-recipe-filter \
  testing-13-recipe-search-filter-interaction \
  testing-14-recipe-search-add-button \
  testing-15-recipe-filter-material \
  testing-16-recipe-filter-material-harness \
  testing-17-recipe-filter-harness \
  testing-18-recipe-search-harness \
  testing-19-recipe-search-harness-testing \
  testing-20-cypress-component-testing-boilerplate \
  testing-21-cypress-component-testing \
  testing-22-cypress-component-testing-with-fake-repository \
  testing-23-visual-regression-testing \
