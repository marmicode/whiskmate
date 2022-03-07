import { authMiddleware } from './auth.middleware';
import * as express from 'express';
import * as request from 'supertest';
import { createJwtVerifier } from './utils/jwt-verifier';

jest.mock('./utils/jwt-verifier');

const mockCreateJwtVerifier = createJwtVerifier as jest.MockedFunction<
  typeof createJwtVerifier
>;

xdescribe(authMiddleware.name, () => {
  afterEach(() => {
    /* Reset console.error. */
    jest.resetAllMocks();
  });

  it('should call verify with token', async () => {
    const { mockVerify, client } = createApp();

    await client.get('/').set({ Authorization: 'Bearer TOKEN' });

    expect(mockVerify).toBeCalledWith('TOKEN');
  });

  it('should reject request if token is invalid', async () => {
    const { mockVerify, client } = createApp();

    jest.spyOn(console, 'error').mockReturnValue();

    mockVerify.mockRejectedValue({
      message: 'Invalid token',
    });

    const { status } = await client
      .get('/')
      .set({ Authorization: 'Bearer TOKEN' });

    expect(status).toEqual(401);
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

    const mockVerify = jest.fn().mockResolvedValue({
      sub: 'foobar',
      scope: 'recipe.read',
    });

    mockCreateJwtVerifier.mockReturnValue({
      verify: mockVerify,
    });

    const app = express();
    app.use(authMiddleware);
    app.get('/', (req, res) => {
      mockGet(req);
      res.sendStatus(200);
    });

    return { client: request(app), mockGet, mockVerify };
  }
});
