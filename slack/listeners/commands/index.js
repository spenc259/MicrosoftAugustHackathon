const { linkTeamsCallback } = require("./link-teams");

module.exports.regiser = (app) => {
  app.command("/link-teams", linkTeamsCallback);
};
