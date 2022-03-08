# Setup

```sh
git checkout origin/nodejs-22-recipe-api-authn-passport-jwt

yarn
```

# 🎯 Goal: Setup authorization for recipes API

- `GET /recipes`'s consumers should have permission `recipe.read`.
- `POST /recipes` and `DELETE /recipes/:recipeId`'s consumers should have permission `recipe.write`.

# 📝 Steps

1. Run tests: `yarn test:watch` (or `npm run test:watch`).

2. Activate tests by replacing `xit` with `it`.

3. Implement middleware to check permissions:

```ts
function myPermission(req, res, next) {
  if (req.authInfo.scope...)) {
    res.status(403);
    res.send({
      type: 'https://whiskmate.io/problems/forbidden',
      title: 'Forbidden',
    });
    return;
  }

  next();
}
```

4. Use middleware:

```ts
router.get('/', myPermission, ...);
```
