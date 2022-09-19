#!/usr/bin/env sh

set -e

TOOLS_PATH="$(dirname $0)"

${TOOLS_PATH}/cascade-changes.sh \
  $* \
  --skip-tests \
  base \
  nodejs-00-boilerplate

${TOOLS_PATH}/cascade-changes.sh \
  $* \
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
