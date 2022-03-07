import { createAuthMiddleware } from './auth.middleware';
import * as express from 'express';
import * as request from 'supertest';
import { verify } from 'jsonwebtoken';
import { callbackify } from 'util';
import * as nock from 'nock';

jest.mock('jsonwebtoken');

describe('authMiddleware', () => {
  const token =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklZc1dtZkJuRnRfYnJfUXR1NEpaOCJ9.eyJpc3MiOiJodHRwczovL3doaXNrbWF0ZS5ldS5hdXRoMC5jb20vIiwic3ViIjoiUUNnUXZFT0xHaFFLbVMxRGdCZG0wbk9jeGhyRDJPc2tAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcmVjaXBlLWFwaS5tYXJtaWNvZGUuaW8iLCJpYXQiOjE2NDY2NDUzOTgsImV4cCI6MTY0NjczMTc5OCwiYXpwIjoiUUNnUXZFT0xHaFFLbVMxRGdCZG0wbk9jeGhyRDJPc2siLCJzY29wZSI6InJlY2lwZS5yZWFkIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.a0fF5gvWICWW4eaYog-aq-lbZ8hknu5MwcVsp1zfOb_ANBbnl2ZuYDvaeuzaYnfnmT8Hzno8kY_ncRaYqhgXi7D9usVCv7joMny7-WhiEp6OmvfhZdv3l_ukZkfMp_kFBfpXl9mJ9AbTb9UqDf0jnEEyYS1DR4e04s2KG8sOD-KFvv-yl6RYH_BCEioFF19_iKIZNmuyTG1cCS66iTFqeH8rwUv0uUKcmN6YMGwNV3PanMxifnwei1thIjMFz3yDChH2joxfCkvjDz_3_9896a_mpI8bOKGq2eEROzhDiEhAwqb7HJY-KCis3m-mNdi1Tk6JEfIeDQYPWbz-aigR0w';

  let mockVerify: jest.Mock;

  beforeEach(() => {
    mockVerify = jest.fn();
    mockVerify.mockResolvedValue({
      sub: 'foobar',
      scope: 'recipe.read',
    });

    (verify as jest.MockedFunction<typeof verify>).mockImplementation(
      callbackify(mockVerify) as any
    );

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
          },
        ],
      });
  });

  afterEach(() => {
    /* Reset console.error. */
    jest.resetAllMocks();
  });

  it('should reject request if token is invalid', async () => {
    const { client } = createApp();

    jest.spyOn(console, 'error').mockReturnValue();

    mockVerify.mockRejectedValue(new Error('Invalid token'));

    const { status } = await client
      .get('/')
      .set({ Authorization: `Bearer ${token}` });

    expect(status).toEqual(401);
    expect(mockVerify).toBeCalledTimes(1);
    expect(mockVerify).toBeCalledWith(
      expect.stringMatching('eyJhbGci*'),
      expect.stringMatching('-----BEGIN PUBLIC KEY-----*'),
      expect.anything()
    );
  });

  it('should read user id and scopes from token', async () => {
    const { mockGet, client } = createApp();

    await client.get('/').set({ Authorization: 'Bearer TOKEN' });

    expect(mockGet).toBeCalledTimes(1);
    const req = mockGet.mock.calls[0][0];
    expect(req.user).toEqual({ id: 'foobar' });
    expect(req.authInfo).toEqual({ scope: ['recipe.read'] });
  });

  function createApp() {
    const mockGet = jest.fn();

    const app = express();
    app.use(
      createAuthMiddleware({
        /* Testing token is expired. */
        verifyExpiration: false,
      })
    );

    app.get('/', (req, res) => {
      mockGet(req);
      res.sendStatus(200);
    });

    return { client: request(app), mockGet };
  }
});
