import { Passport } from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { createJwtVerifier } from './utils/jwt-verifier';

import { Handler } from 'express';

export function createAuthMiddleware({
  verifyExpiration = true,
}: { verifyExpiration?: boolean } = {}): Handler {
  const passport = new Passport();

  const { verify } = createJwtVerifier(
    'https://whiskmate.eu.auth0.com/.well-known/jwks.json',
    {
      audience: 'https://recipe-api.marmicode.io',
      issuer: 'https://whiskmate.eu.auth0.com/',
      verifyExpiration,
    }
  );

  passport.use(
    new BearerStrategy(async (token, done) => {
      try {
        const claims = await verify(token);
        done(
          null,
          {
            id: claims.sub,
          },
          {
            scope: claims.scope.split(','),
          }
        );
      } catch (err) {
        console.error(err);
        done(null, false);
      }
    })
  );

  return passport.authenticate('bearer', {
    session: false,
  });
}
