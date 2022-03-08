# Setup

```sh
git checkout origin/nodejs-16-openapi-boilerplate

yarn
```

# 🎯 Goal: Embrace OpenAPI

- Use types from OpenAPI spec.
- Reject invalid requests using `express-openapi-validator`.

# 📝 Steps

1. Generate types from OpenAPI spec: `yarn codegen` (or `npm run codegen`).

2. Use generated types (including `Problem` type for errors).

3. Setup request validation using OpenAPI middleware:

```ts
app.use(
  openapiMiddleware({
    apiSpec: join(__dirname, 'openapi/whiskmate.yaml'),
    validateRequests: true,
  })
);
```

4. Customize OpenAPI validation errors:

```ts
app.use((err, req, res, next) => {
  if (err instanceof error.BadRequest) {
    ...
  }

  if (err instanceof error.NotFound) {
    ...
  }
});
```

5. Add `additionalProperties: false` to `RecipeRequest` in spec and see what happens when you send extra properties.
