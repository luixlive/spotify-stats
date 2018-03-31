import emptyFunction from './../../test_utils/empty_function';
import getRouter from './../../../server/routers/authentication';
import handleRouterRequest from './../../test_utils/handle_router_request';

describe('Server Routers - Authentication', () => {
  let controller;
  let router;
  beforeAll(() => {
    controller = {
      logout: jest.fn(),
      spotifyCallback: emptyFunction,
      user: jest.fn(),
    };
    router = getRouter(controller);
  });

  it('calls logout controller', () => {
    const req = { url: '/logout', method: 'GET' };
    handleRouterRequest(router, req, null, true);
    expect(controller.logout).toHaveBeenCalledTimes(1);
  });

  it('calls user controller', () => {
    const req = { url: '/user', method: 'GET' };
    handleRouterRequest(router, req, null, true);
    expect(controller.user).toHaveBeenCalledTimes(1);
  });
});
