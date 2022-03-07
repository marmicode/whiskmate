import { createJwtVerifier } from './jwt-verifier';

import * as nock from 'nock';

describe('jwtVerifier', () => {
  const token =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklZc1dtZkJuRnRfYnJfUXR1NEpaOCJ9.eyJpc3MiOiJodHRwczovL3doaXNrbWF0ZS5ldS5hdXRoMC5jb20vIiwic3ViIjoiUUNnUXZFT0xHaFFLbVMxRGdCZG0wbk9jeGhyRDJPc2tAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcmVjaXBlLWFwaS5tYXJtaWNvZGUuaW8iLCJpYXQiOjE2NDY2NDUzOTgsImV4cCI6MTY0NjczMTc5OCwiYXpwIjoiUUNnUXZFT0xHaFFLbVMxRGdCZG0wbk9jeGhyRDJPc2siLCJzY29wZSI6InJlY2lwZS5yZWFkIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.a0fF5gvWICWW4eaYog-aq-lbZ8hknu5MwcVsp1zfOb_ANBbnl2ZuYDvaeuzaYnfnmT8Hzno8kY_ncRaYqhgXi7D9usVCv7joMny7-WhiEp6OmvfhZdv3l_ukZkfMp_kFBfpXl9mJ9AbTb9UqDf0jnEEyYS1DR4e04s2KG8sOD-KFvv-yl6RYH_BCEioFF19_iKIZNmuyTG1cCS66iTFqeH8rwUv0uUKcmN6YMGwNV3PanMxifnwei1thIjMFz3yDChH2joxfCkvjDz_3_9896a_mpI8bOKGq2eEROzhDiEhAwqb7HJY-KCis3m-mNdi1Tk6JEfIeDQYPWbz-aigR0w';

  beforeEach(() => {
    nock('https://whiskmate.eu.auth0.com/')
      .get('/.well-known/jwks.json')
      .reply(200, {
        keys: [
          {
            alg: 'RS256',
            kty: 'RSA',
            use: 'sig',
            n: 'vodg3b40NNE1Oy4rQdBxqZk9bRhw2hSvCsT6O_anAYT9QJT8bKKBb8ZFzF_UvAJk5bByhDgi83nUXGXjId_rMQEhAVHnf2T_LThntsmokuZwKlZZBSby5SHI6mI-35DXu-4NPa8xeokrBRrVB_sSURA8aZYhkHX5FCkgnWSLblIO02lG_OS-2ozs29ZRHY4b82k6qiVanOWsmD6CcpgHfrribvwuphVDtdjA-wVbpvrZDmomS-lmAUN2EOz85_8K9y9UleGxP7aem9chGl0Woc99ihB8h8xrgbUpmNx6YYI-Re3SK1ACKAnhmVqanrbXcQ8pkd3JSJIkz09Fs5_z5Q',
            e: 'AQAB',
            kid: 'IYsWmfBnFt_br_Qtu4JZ8',
            x5t: 'QLogal00Uq8nv88DHrLUZXD3ge4',
            x5c: [
              'MIIDBzCCAe+gAwIBAgIJR+14jEv3sFH3MA0GCSqGSIb3DQEBCwUAMCExHzAdBgNVBAMTFndoaXNrbWF0ZS5ldS5hdXRoMC5jb20wHhcNMjEwNzAyMDg0ODM3WhcNMzUwMzExMDg0ODM3WjAhMR8wHQYDVQQDExZ3aGlza21hdGUuZXUuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvodg3b40NNE1Oy4rQdBxqZk9bRhw2hSvCsT6O/anAYT9QJT8bKKBb8ZFzF/UvAJk5bByhDgi83nUXGXjId/rMQEhAVHnf2T/LThntsmokuZwKlZZBSby5SHI6mI+35DXu+4NPa8xeokrBRrVB/sSURA8aZYhkHX5FCkgnWSLblIO02lG/OS+2ozs29ZRHY4b82k6qiVanOWsmD6CcpgHfrribvwuphVDtdjA+wVbpvrZDmomS+lmAUN2EOz85/8K9y9UleGxP7aem9chGl0Woc99ihB8h8xrgbUpmNx6YYI+Re3SK1ACKAnhmVqanrbXcQ8pkd3JSJIkz09Fs5/z5QIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQ0qQr7Kivs5cJSULHmlfFm16CVsDAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAJygXT64o6Yng3rpMf+3sVesfza5JK8XTGR+h7QvJsFbtUkaZuSioapRDRVqPutCteloWxZVsubL3vXPyg4GJxUEM0z5Sz013zgvnSALIkVAL2k/DPK9cCGIYB8fhBPS93vB2UsNM39H2SwX3Xgak9ZGxwaK2pvMuiLPK4cg4vuug+N3ujk0K7ZnUgrwyCbQKM6qNO3QCYDiFafo7uVzqf2w/hQX9yOze5sPJ3lomN1/qnH/C/wwXwFeOITwxwKElA1le8HxrajXCVhbAMdDBGTQaajYOWZJweukxRe56L5r6eeO3+dNlxUs5qzNRL9gGFkRDoKAz0cEsaHuVAkNZBQ=',
            ],
          },
          {
            alg: 'RS256',
            kty: 'RSA',
            use: 'sig',
            n: '0JM8TkbVCigm7MF0m2Wr5YKGu12edII21RR944E1BmLlPBcACIiemeeuyTsab9N3xvxdX5UzCnfuYjiXisOVf0Osz9DFCHMMG6zwEwcWkvOWmWx9mPkh9zzlljIjqZpUraGOdRZT0vkhx2jkjCkXB2KSiSFnUYugHcmfEeIS48RQFZAl5xVUoNo-6eC6L8OARVCKhAFM4SklEUZUd9dExWRerl9cSdNbb_GbQdK-z21K_yh4kOXpC-SJxFeeV9I0FaDAtLQxXuSccWfkTcd_uva-obyUVx7svf-FCtFD7YuckjuoF-Tzi-DBt3j2sXfgvSuctxymnZxKtpCri-THRQ',
            e: 'AQAB',
            kid: 'KxfvnK3xDvC-1BvOrnJdi',
            x5t: 'EDUnOO81oGQubJuLvWM0T3OvR9Q',
            x5c: [
              'MIIDBzCCAe+gAwIBAgIJOgtuyIwcuiRVMA0GCSqGSIb3DQEBCwUAMCExHzAdBgNVBAMTFndoaXNrbWF0ZS5ldS5hdXRoMC5jb20wHhcNMjEwNzAyMDg0ODM4WhcNMzUwMzExMDg0ODM4WjAhMR8wHQYDVQQDExZ3aGlza21hdGUuZXUuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0JM8TkbVCigm7MF0m2Wr5YKGu12edII21RR944E1BmLlPBcACIiemeeuyTsab9N3xvxdX5UzCnfuYjiXisOVf0Osz9DFCHMMG6zwEwcWkvOWmWx9mPkh9zzlljIjqZpUraGOdRZT0vkhx2jkjCkXB2KSiSFnUYugHcmfEeIS48RQFZAl5xVUoNo+6eC6L8OARVCKhAFM4SklEUZUd9dExWRerl9cSdNbb/GbQdK+z21K/yh4kOXpC+SJxFeeV9I0FaDAtLQxXuSccWfkTcd/uva+obyUVx7svf+FCtFD7YuckjuoF+Tzi+DBt3j2sXfgvSuctxymnZxKtpCri+THRQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQEA2T7wfdPNFOubwuKvjvmtUAKfjAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAJzWghdqBg24iHC9TgYxMn60IBgNkgHXT2DArbR1JyHLGBqMhMh62m/qEKh0xYvXUakkuyDQOwDHtwyYFLxzMjmtvC6mDBkO2Y4ubPVsX0rkZFQM9eZkSDe5KhZVL6J0O+zZt8Z3WY3RqJxZHOk5YruGe+OzxXOwo1wgxms4wPN+iiAu4oKVq/Xq7Mm3bhS4d/6JOcOvU+JSpRRxWLSHuAbmZJps0qbJ+Fw1rI2vPNvm2zUt79nybEjgWH+WRh1qMPCQIAstRSkoZ3jpdPKY5vNEY4G3/x+BTI44jOJFTNMP15o5HVRWB3GXEAuDsUDNQu9vvaQauf3cNprjHfkX8bw=',
            ],
          },
        ],
      });
  });

  it('should verify token', async () => {
    const { verify } = await createJwtVerifier(
      'https://whiskmate.eu.auth0.com/.well-known/jwks.json',
      {
        audience: 'https://recipe-api.marmicode.io',
        issuer: 'https://whiskmate.eu.auth0.com/',
        verifyExpiration: false,
      }
    );

    const claims = await verify(token);

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
