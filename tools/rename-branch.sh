#!/usr/bin/env sh

set -e

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <branch-name> <new-branch-name>"
  exit 1
fi

BRANCH=$1
NEW_BRANCH=$2

git checkout $BRANCH
git checkout -b $NEW_BRANCH
git push
git branch -d $BRANCH
git push origin :$BRANCH

# Rename branch in instructions & sync-testing.sh

git checkout testing-000-starter

sed -i '' "s/$BRANCH/$NEW_BRANCH/g" docs/*.md
sed -i '' "s/$BRANCH/$NEW_BRANCH/g" tools/sync-*.sh

git add docs/*.md tools/sync-*.sh
git commit -m "docs: 📝 rename branch $BRANCH to $NEW_BRANCH"
