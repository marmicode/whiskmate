#!/usr/bin/env sh

set -e

while :;
do
    case "$1" in
        "--skip-reset" )
          SKIP_RESET=true
          shift;;
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
  git pull origin $CURRENT
  git merge --no-edit $PARENT_BRANCH

  if [ "$SKIP_TESTS" != "true" ]
  then
    pnpm install

    if [ "$SKIP_RESET" != "true" ]
    then
      pnpm reset
    fi

    pnpm nx run-many --target test,vitest --watch false
    pnpm nx run-many --target test-ui --pass-with-no-tests
  fi

  PARENT_BRANCH="$CURRENT"

done

if [ "$PUSH" = "true" ]
then
  git push --all
fi
