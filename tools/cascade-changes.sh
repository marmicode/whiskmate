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
  [ "$SKIP_TESTS" = "true" ] || (yarn && yarn jest)

  PARENT_BRANCH="$CURRENT"

done

if [ "$PUSH" = "true" ]
then
  git push --all
fi
