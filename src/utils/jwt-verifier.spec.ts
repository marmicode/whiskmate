import { createJwtVerifier } from './jwt-verifier';

describe('jwtVerifier', () => {
  const token =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklZc1dtZkJuRnRfYnJfUXR1NEpaOCJ9.eyJpc3MiOiJodHRwczovL3doaXNrbWF0ZS5ldS5hdXRoMC5jb20vIiwic3ViIjoiUUNnUXZFT0xHaFFLbVMxRGdCZG0wbk9jeGhyRDJPc2tAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcmVjaXBlLWFwaS5tYXJtaWNvZGUuaW8iLCJpYXQiOjE2NDY2NDUzOTgsImV4cCI6MTY0NjczMTc5OCwiYXpwIjoiUUNnUXZFT0xHaFFLbVMxRGdCZG0wbk9jeGhyRDJPc2siLCJzY29wZSI6InJlY2lwZS5yZWFkIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.a0fF5gvWICWW4eaYog-aq-lbZ8hknu5MwcVsp1zfOb_ANBbnl2ZuYDvaeuzaYnfnmT8Hzno8kY_ncRaYqhgXi7D9usVCv7joMny7-WhiEp6OmvfhZdv3l_ukZkfMp_kFBfpXl9mJ9AbTb9UqDf0jnEEyYS1DR4e04s2KG8sOD-KFvv-yl6RYH_BCEioFF19_iKIZNmuyTG1cCS66iTFqeH8rwUv0uUKcmN6YMGwNV3PanMxifnwei1thIjMFz3yDChH2joxfCkvjDz_3_9896a_mpI8bOKGq2eEROzhDiEhAwqb7HJY-KCis3m-mNdi1Tk6JEfIeDQYPWbz-aigR0w';

  xit('should verify token', async () => {
    const { verify } = createJwtVerifier(
      'https://whiskmate.eu.auth0.com/.well-known/jwks.json',
      {
        verifyExpiration: false,
      }
    );
    const claims = verify(token);
    expect(claims).toEqual({
      iss: 'https://whiskmate.eu.auth0.com/',
      sub: 'QCgQvEOLGhQKmS1DgBdm0nOcxhrD2Osk@clients',
      aud: 'https://recipe-api.marmicode.io',
      iat: 1646645398,
      exp: 1646731798,
      azp: 'QCgQvEOLGhQKmS1DgBdm0nOcxhrD2Osk',
      scope: 'recipe.read',
      gty: 'client-credentials',
    });
  });
});
