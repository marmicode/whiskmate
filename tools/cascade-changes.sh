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


export NX_TUI=false

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
      nx reset

      # Retry reset 3 times as the daemon is sometimes not ready
      RESET="nx run-many --target reset"
      $RESET || (sleep 1 && $RESET) || (sleep 3 && $RESET)
    fi

    pnpm nx run-many --target test,test-ui,vitest --pass-with-no-tests
  fi

  PARENT_BRANCH="$CURRENT"

done

if [ "$PUSH" = "true" ]
then
  git push --all
fi
