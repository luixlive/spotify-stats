const httpStatus = require('./../../utils/http_status');
const logger = require('./../../utils/logger');

const logout = (req, res) => {
  logger.debug(`api/authentication/logout: ${JSON.stringify(req.user)}`);
  req.logout();
  res.sendStatus(httpStatus.OK);
};

const spotifyCallback = (req, res) => {
  logger.debug(`api/authentication/spotify/callback: ${JSON.stringify(req.user)}`);
  res.redirect('/stats');
};

const user = (req, res) => {
  logger.debug(`api/authentication/user: ${JSON.stringify(req.user)}`);
  if (req.user) {
    res.send(req.user);
  } else {
    res.sendStatus(httpStatus.UNAUTHORIZED);
  }
};

module.exports = {
  logout,
  spotifyCallback,
  user,
};