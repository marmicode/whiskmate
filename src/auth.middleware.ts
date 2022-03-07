import { Passport } from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { createJwtVerifier } from './utils/jwt-verifier';

const passport = new Passport();

passport.use(
  new BearerStrategy(async (token, done) => {
    const { verify } = await createJwtVerifier(
      'https://whiskmate.eu.auth0.com/.well-known/jwks.json',
      {
        audience: 'https://recipe-api.marmicode.io',
        issuer: 'https://whiskmate.eu.auth0.com/',
        verifyExpiration: false,
      }
    );

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

export const authMiddleware = passport.authenticate('bearer', {
  session: false,
});
