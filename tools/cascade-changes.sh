#!/usr/bin/env sh

set -e

while :;
do
    case "$1" in
        "--skip-install" )
          SKIP_INSTALL=true
          shift;;
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
    if [ "$SKIP_INSTALL" != "true" ]
    then
      pnpm install
    fi

    if [ "$SKIP_RESET" != "true" ]
    then
      # Retry reset 3 times as the daemon is sometimes not ready
      RESET="pnpm reset"
      $RESET || (sleep 1 && $RESET) || (sleep 3 && $RESET)
    fi

    pnpm nx run-many --target jest,test,test-ui --pass-with-no-tests
  fi

  PARENT_BRANCH="$CURRENT"

done

if [ "$PUSH" = "true" ]
then
  git push --all
fi
