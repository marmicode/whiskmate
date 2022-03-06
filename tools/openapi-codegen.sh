#!/usr/bin/env sh

set -e

[ -d src/openapi/model ] && rm -f src/openapi/model/*.ts && rmdir src/openapi/model

openapi-generator-cli generate -i src/openapi/whiskmate.yaml -g typescript-nestjs -o src/openapi --additional-properties stringEnums=true,fileNaming=kebab-case --global-property models