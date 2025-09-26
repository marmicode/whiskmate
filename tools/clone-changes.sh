#!/usr/bin/env sh

set -e

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <source-app> <destination-app>"
  exit 1
fi

SOURCE="$1"
DESTINATION="$2"
PATCH_FILE="tmp/changes.diff"

mkdir -p tmp

git diff HEAD "apps/$SOURCE" > "$PATCH_FILE"

sed -i '' "s/$SOURCE/$DESTINATION/g" "$PATCH_FILE"

git apply -3 --allow-empty "$PATCH_FILE"
