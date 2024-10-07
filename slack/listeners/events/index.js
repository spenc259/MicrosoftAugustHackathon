const { oauthEventCallback } = require("./oauth-success");

module.exports.register = (app) => {
  app.event("oauth_success_event", oauthEventCallback);
};
