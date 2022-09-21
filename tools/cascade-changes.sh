#!/usr/bin/env sh

set -e

while :;
do
    case "$1" in
        "--skip-tests" )
          SKIP_TESTS=true
          shift;;
        "--push" )
          PUSH=true
          shift;;
        *)
          break;;
   esac
done


PARENT_BRANCH=$1

shift

for CURRENT in $*; do

  git checkout $CURRENT
  git merge --no-edit $PARENT_BRANCH

  if [ "$SKIP_TESTS" != "true" ]
  then
    yarn
    yarn nx run-many --target test

    # Run component tests if `cy.ts` files exist.
    if [ $(find apps libs -name '*.cy.ts' | wc -l) -gt 0 ]
    then
      yarn nx run-many --target component-test 
    fi
  fi

  PARENT_BRANCH="$CURRENT"

done

if [ "$PUSH" = "true" ]
then
  git push --all
fi
