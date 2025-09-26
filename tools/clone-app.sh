#!/usr/bin/env sh

set -e

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <source-app> <destination-app>"
  exit 1
fi

SOURCE="$1"
DESTINATION="$2"

cp -r apps/$SOURCE apps/$DESTINATION
cd apps/$DESTINATION
sed -i '' "s/$SOURCE/$DESTINATION/g" project.json
