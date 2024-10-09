const { displayTeamsInfoCallback } = require("./selectTeamsAction");
const { displaySelectChannelsCallback } = require("./selectChannelsAction");

module.exports.register = (app) => {
  app.action("show_teams_channels", displayTeamsInfoCallback);
  app.action("display_channels", displaySelectChannelsCallback);
};
