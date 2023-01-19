#!/usr/bin/env sh

set -e

TOOLS_PATH="$(dirname $0)"

${TOOLS_PATH}/cascade-changes.sh \
  $* \
  base \
  testing-000-boilerplate \
  testing-100-meal-planner-boilerplate \
  testing-101-meal-planner \
  testing-102-meal-planner-reactive \
  testing-200-meal-repository-fake-boilerplate \
  testing-201-meal-repository-fake \
  testing-202-meal-repository-sync-boilerplate \
  testing-203-meal-repository-sync \
  testing-204-meal-repository-boilerplate \
  testing-205-meal-repository \
  testing-300-recipe-search-boilerplate \
  testing-301-recipe-search-isolated-boilerplate \
  testing-302-recipe-search-isolated \
  testing-303-recipe-search-integration-boilerplate \
  testing-304-recipe-search-integration \
  testing-305-recipe-search-shallow-boilerplate \
  testing-306-recipe-search-shallow \
  testing-307-recipe-search-async-pipe \
  testing-400-recipe-filter-boilerplate \
  testing-401-recipe-filter \
  testing-402-recipe-search-filter-interaction \
  testing-403-recipe-search-add-button \
  testing-404-recipe-filter-material \
  testing-500-recipe-filter-material-harness-boilerplate \
  testing-501-recipe-filter-material-harness \
  testing-502-recipe-filter-harness \
  testing-503-recipe-search-harness \
  testing-504-recipe-search-harness-testing \
  testing-600-recipe-preview-ct-boilerplate \
  testing-601-recipe-preview-ct \
  testing-602-recipe-filter-ct-boilerplate \
  testing-603-recipe-filter-ct \
  testing-604-recipe-search-ct-boilerplate \
  testing-605-recipe-search-ct \
  testing-606-ct-harness-boilerplate \
  testing-607-ct-harness \
  testing-608-visual-regression-testing
