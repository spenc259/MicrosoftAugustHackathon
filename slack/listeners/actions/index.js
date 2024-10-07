const { displayTeamsInfoCallback } = require("./selectTeamsAction");

module.exports.register = (app) => {
  app.action("show_teams_channels", displayTeamsInfoCallback);
};
