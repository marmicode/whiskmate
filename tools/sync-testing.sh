#!/usr/bin/env sh

set -e

TOOLS_PATH="$(dirname $0)"

${TOOLS_PATH}/cascade-changes.sh \
  $* \
  base \
  testing-000-starter \
  testing-100-meal-planner-starter \
  testing-101-meal-planner \
  testing-102-meal-planner-reactive \
  testing-200-meal-planner-indirect-output-starter \
  testing-201-meal-planner-indirect-output \
  testing-202-meal-planner-indirect-input-starter \
  testing-203-meal-planner-indirect-input \
  testing-204-meal-repository-starter \
  testing-205-meal-repository \
  testing-206-meal-repository-contract \
  testing-300-recipe-search-starter \
  testing-301-recipe-search-isolated-starter \
  testing-302-recipe-search-isolated \
  testing-303-recipe-search-integration-starter \
  testing-304-recipe-search-integration \
  testing-305-recipe-search-shallow-boilerplate \
  testing-306-recipe-search-shallow \
  testing-307-recipe-search-async-pipe \
  testing-400-recipe-filter-boilerplate \
  testing-401-recipe-filter \
  testing-402-recipe-search-filter-interaction \
  testing-403-recipe-search-add-button \
  testing-404-recipe-filter-material \
  testing-700-recipe-filter-material-harness-boilerplate \
  testing-701-recipe-filter-material-harness \
  testing-702-recipe-filter-harness \
  testing-703-recipe-search-harness \
  testing-704-recipe-search-harness-testing \
  testing-800-recipe-preview-ct-boilerplate \
  testing-801-recipe-preview-ct \
  testing-802-recipe-filter-ct-boilerplate \
  testing-803-recipe-filter-ct \
  testing-804-recipe-search-ct-boilerplate \
  testing-805-recipe-search-ct \
  testing-806-ct-harness-boilerplate \
  testing-807-ct-harness \
  testing-808-visual-regression-testing
