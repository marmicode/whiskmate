# Setup

```sh
git checkout origin/nodejs-24-recipe-api-db-boilerplate

yarn
```

# 🎯 Goal: Implement `RecipeRepositoryMongodb`

## 📝 Steps

1. Setup prisma using `src/schema.prisma`:

```prisma
datasource db {
  provider = "mongodb""
  url = env("MONGODB_URI")
}

generator client {
  provider = "prisma-client-js"
  previewFeatures = ["mongoDb"]
}

model Recipe {
  id String @id @default(cuid()) @map("_id")
  createdAt DateTime @default(now())
  name String
}
```

2. Restart server with given `MONGODB_URI`:

```sh
MONGODB_URI=... yarn start # or npm start
```

3. Generate prisma client:

```sh
yarn codegen # or npm run codegen
```

4. Use Prisma client in `RecipeRepositoryMongodb`:

```ts
prisma.create(...);
prisma.findMany(...);
prisma.delete({
  where: {
    id: '...'
  }
})
```

5. Handle unexisting recipe:

```ts
import { Prisma } from '@prisma/client';

const PRISMA_RECORD_NOT_FOUND_CODE = 'P2025';

...

if (
  err instanceof Prisma.PrismaClientKnownRequestError &&
  err.code === PRISMA_RECORD_NOT_FOUND_CODE
) {
  throw new RecipeNotFoundError(recipeId);
}
```
