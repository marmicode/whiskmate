# Setup

```sh
git checkout origin/nodejs-20-recipe-api-auth-boilerplate

yarn
```

# 🎯 Goal: Setup authentication for recipes API using Passport & JWT

# 📝 Steps

1. Run tests: `yarn test:watch` (or `npm run test:watch`).

2. Activate tests by replacing `xdescribe` with `describe`.

3. Use auth middleware in `main.ts`:

```ts
app.use(createAuthMiddleware());
```

4. Setup Passport in `auth.middleware.ts`:

```ts
export function createAuthMiddleware(...) {
  const passport = new Passport();

  passport.use(
    new BearerStrategy(async (token, done) => {
      ...

      // valid token
      done(null, {id: ...}, {scope: ...});

      // invalid token
      done(null, false);
    })
  );

  return passport.authenticate('bearer', { session: false });
}
```

5. Verify JWT token using custom verifier:

```ts
import { createJwtVerifier } from './utils/jwt-verifier';
...

const { verify } = createJwtVerifier(
  'https://whiskmate.eu.auth0.com/.well-known/jwks.json',
  {
    audience: 'https://recipe-api.marmicode.io',
    issuer: 'https://whiskmate.eu.auth0.com/',
    verifyExpiration,
  }
);
```

6. Make tests pass.
