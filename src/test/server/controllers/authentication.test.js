import _ from 'lodash';

import { authenticationController } from './../../../server/controllers';
import httpStatus from './../../../utils/http_status';

describe('Server Controllers - Authentication', () => {
  let req;
  let res;
  let redirectTo;
  let responseValue;
  let statusValue;
  let user;
  beforeEach(() => {
    redirectTo = undefined;
    responseValue = undefined;
    statusValue = undefined;
    user = 'user';
    req = {
      logout: () => { user = undefined; },
      user,
    };
    res = {
      redirect: (path) => { redirectTo = path; },
      send: (value) => { responseValue = value; },
      sendStatus: (status) => { statusValue = status; },
    };
  });

  describe('Logout', () => {
    it('logs out user', () => {
      authenticationController.logout(req, res);
      expect(statusValue).toEqual(httpStatus.OK);
      expect(responseValue).toBeUndefined();
      expect(user).toBeUndefined();
    });
  });

  describe('spotifyCallback', () => {
    it('redirects to /stats', () => {
      authenticationController.spotifyCallback(req, res);
      expect(redirectTo).toEqual('/stats');
    });
  });

  describe('User', () => {
    it('returns user if authenticated', () => {
      authenticationController.user(req, res);
      expect(responseValue).toBe(req.user);
    });

    it('returns unauthorized if not authenticated', () => {
      authenticationController.user(_.omit(req, ['user']), res);
      expect(statusValue).toBe(httpStatus.UNAUTHORIZED);
      expect(responseValue).toBeUndefined();
    });
  });
});