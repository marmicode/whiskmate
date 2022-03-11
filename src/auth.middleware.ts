import { Passport } from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { Handler } from 'express';

export function createAuthMiddleware({
  verifyExpiration = true,
}: { verifyExpiration?: boolean } = {}): Handler {
  const passport = new Passport();

  passport.use(
    new JwtStrategy(
      {
        // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
        secretOrKeyProvider: passportJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://whiskmate.eu.auth0.com/.well-known/jwks.json',
        }),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        audience: 'https://recipe-api.marmicode.io',
        issuer: 'https://whiskmate.eu.auth0.com/',
        algorithms: ['RS256'],
        ignoreExpiration: !verifyExpiration,
      },
      (payload, done) => {
        done(
          null,
          {
            id: payload.sub,
          },
          {
            scope: payload.scope.split(' '),
          }
        );
      }
    )
  );

  return passport.authenticate('jwt', {
    session: false,
  });
}
