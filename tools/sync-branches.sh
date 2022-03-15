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
    [ "$SKIP_TESTS" = "true" ] || (yarn && yarn jest)

    PARENT="$CURRENT"

  done

  git push --all

}

cascade_changes \
  --skip-tests \
  base \
  main

cascade_changes \
  base \
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

cascade_changes \
  --skip-tests \
  base \
  nodejs-00-boilerplate

cascade_changes \
  nodejs-00-boilerplate \
  nodejs-01-recipe-repository-boilerplate \
  nodejs-02-recipe-repository \
  nodejs-03-recipe-repository-immutability-boilerplate \
  nodejs-04-recipe-repository-immutability \
  nodejs-05-recipe-repository-promise-boilerplate \
  nodejs-06-recipe-repository-promise \
  nodejs-07-recipe-repository-async-await \
  nodejs-08-recipe-repository-typescript-boilerplate \
  nodejs-09-recipe-repository-typescript \
  nodejs-10-recipe-repository-modules \
  nodejs-11-recipe-repository-fs-boilerplate \
  nodejs-12-recipe-repository-fs \
  nodejs-13-recipe-api-boilerplate \
  nodejs-14-recipe-api \
  nodejs-15-recipe-api-typed \
  nodejs-16-openapi-boilerplate \
  nodejs-17-openapi \
  nodejs-18-recipe-api-testing-boilerplate \
  nodejs-19-recipe-api-testing \
  nodejs-20-recipe-api-auth-boilerplate \
  nodejs-21-recipe-api-authn \
  nodejs-22-recipe-api-authn-passport-jwt \
  nodejs-23-recipe-api-authz \
  nodejs-24-recipe-api-db-boilerplate \
  nodejs-25-recipe-api-db \
  nodejs-26-recipe-edition-websocket-boilerplate \
  nodejs-27-recipe-edition-websocket \
  nodejs-28-recipe-edition-sse-boilerplate \
  nodejs-29-recipe-edition-sse \
  nodejs-30-gcp-cloud-run

cascade_changes \
  base \
  api
