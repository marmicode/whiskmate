import { setupIoServer } from './io';
import { createServer } from 'http';
import { AddressInfo } from 'net';
import { io as lookup, Socket } from 'socket.io-client';
import waitForExpect from 'wait-for-expect';
import { createTestingBowl } from './testing/testing-bowl';
import { IngredientRepository } from './ingredients/ingredient-repository';

jest.mock('./ingredients/ingredient-repository');

const MockIngredientRepository = IngredientRepository as jest.MockedClass<
  typeof IngredientRepository
>;

describe('io', () => {
  const bowl = createTestingBowl(setUp);

  it('should emit ingredients on connect', async () => {
    const { socket, mockRepository } = bowl;
    mockRepository.getRecipeIngredients.mockReturnValue([]);

    const spy = jest.fn();

    socket.onAny(spy);

    await waitForExpect(() => {
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith('ingredients-loaded', { ingredients: [] });
      expect(mockRepository.getRecipeIngredients).toBeCalledWith('burger');
    });
  });

  describe('when ingredient added', () => {
    beforeEach(() => {
      bowl.socket.on('ingredient-added', bowl.spy);
      bowl.otherSocket.on('ingredient-added', bowl.otherSpy);
      bowl.friendSocket.on('ingredient-added', bowl.friendSpy);

      bowl.socket.emit('ingredient-added', {
        ingredient: {
          id: 'avocado',
          name: '🥑 Avocado',
          quantity: 50,
          unit: 'g',
        },
      });
    });

    it('should add ingredient', async () => {
      await waitForExpect(() => {
        expect(bowl.mockRepository.addIngredient).toBeCalledTimes(1);
        expect(bowl.mockRepository.addIngredient).toBeCalledWith({
          recipeId: 'burger',
          ingredient: {
            id: 'avocado',
            name: '🥑 Avocado',
            quantity: 50,
            unit: 'g',
          },
        });
      });
    });

    it('should not notify self', async () => {
      await waitForExpect(() => {
        expect(bowl.spy).toBeCalledTimes(0);
      });
    });

    it('should notify friends', async () => {
      await waitForExpect(() => {
        expect(bowl.friendSpy).toBeCalledTimes(1);
        expect(bowl.friendSpy).toBeCalledWith({
          ingredient: {
            id: 'avocado',
            name: '🥑 Avocado',
            quantity: 50,
            unit: 'g',
          },
        });
      });
    });

    it('should not notify other recipes', async () => {
      await waitForExpect(() => {
        expect(bowl.otherSpy).toBeCalledTimes(0);
      });
    });
  });

  describe('when ingredient changed', () => {
    beforeEach(() => {
      bowl.socket.on('ingredient-changed', bowl.spy);
      bowl.otherSocket.on('ingredient-changed', bowl.otherSpy);
      bowl.friendSocket.on('ingredient-changed', bowl.friendSpy);

      bowl.socket.emit('ingredient-changed', {
        ingredientId: 'meat',
        changes: {
          quantity: '180',
        },
      });
    });

    it('should update ingredient', async () => {
      await waitForExpect(() => {
        expect(bowl.mockRepository.updateIngredient).toBeCalledTimes(1);
        expect(bowl.mockRepository.updateIngredient).toBeCalledWith({
          ingredientId: 'meat',
          changes: {
            quantity: '180',
          },
        });
      });
    });

    it('should not notify self', async () => {
      await waitForExpect(() => {
        expect(bowl.spy).toBeCalledTimes(0);
      });
    });

    it('should notify friends', async () => {
      await waitForExpect(() => {
        expect(bowl.friendSpy).toBeCalledTimes(1);
        expect(bowl.friendSpy).toBeCalledWith({
          ingredientId: 'meat',
          changes: {
            quantity: '180',
          },
        });
      });
    });

    it('should not notify other recipes', async () => {
      await waitForExpect(() => {
        expect(bowl.otherSpy).toBeCalledTimes(0);
      });
    });
  });

  function setUp() {
    const mockRepository = {
      addIngredient: jest.fn(),
      getRecipeIngredients: jest.fn(),
      updateIngredient: jest.fn(),
    } as jest.MockedObject<IngredientRepository>;

    MockIngredientRepository.mockImplementation(() => mockRepository);

    const httpServer = createServer();
    setupIoServer(httpServer);

    httpServer.listen();
    const port = (httpServer.address() as AddressInfo).port;

    let _sockets: Socket[] = [];

    function _createSocket(recipeId = 'burger') {
      const socket = lookup(`http://localhost:${port}/ingredients`, {
        query: {
          recipeId,
        },
      });
      _sockets = [..._sockets, socket];
      return socket;
    }

    return {
      mockRepository,
      socket: _createSocket('burger'),
      friendSocket: _createSocket('burger'),
      otherSocket: _createSocket('salad'),
      spy: jest.fn(),
      friendSpy: jest.fn(),
      otherSpy: jest.fn(),
      destroy() {
        for (const socket of _sockets) {
          socket.close();
        }
        httpServer.close();
      },
    };
  }
});
