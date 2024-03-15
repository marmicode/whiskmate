#!/usr/bin/env sh

set -e

TOOLS_PATH="$(dirname $0)"

${TOOLS_PATH}/cascade-changes.sh \
  $* \
  base \
  testing-000-starter \
  testing-101-meal-planner-starter \
  testing-101-meal-planner-solution \
  testing-102-meal-planner-reactive-starter \
  testing-102-meal-planner-reactive-solution \
  testing-201-meal-planner-indirect-output-starter \
  testing-201-meal-planner-indirect-output-solution \
  testing-202-meal-planner-indirect-input-starter \
  testing-202-meal-planner-indirect-input-solution \
  testing-203-meal-repository-starter \
  testing-203-meal-repository-solution \
  testing-204-meal-repository-contract-starter \
  testing-204-meal-repository-contract-solution \
  testing-300-recipe-search-starter \
  testing-301-recipe-search-isolated-starter \
  testing-301-recipe-search-isolated-solution \
  testing-302-recipe-search-integration-starter \
  testing-302-recipe-search-integration-solution-test-bed \
  testing-302-recipe-search-integration-solution-testing-library \
  testing-306-recipe-search-shallow-starter \
  testing-307-recipe-search-shallow \
  testing-308-recipe-search-shallow-testing-library \
  testing-309-recipe-search-async-pipe \
  testing-310-recipe-search-signals \
  testing-400-recipe-filter-starter \
  testing-401-recipe-filter \
  testing-402-recipe-search-filter-interaction \
  testing-403-recipe-search-add-button \
  testing-404-recipe-filter-material \
  testing-500-recipe-preview-ct-starter \
  testing-501-recipe-preview-ct \
  testing-502-recipe-filter-ct-starter \
  testing-503-recipe-filter-ct \
  testing-504-recipe-search-ct-starter \
  testing-505-recipe-search-ct \
  testing-506-playwright-visual-regression-testing
