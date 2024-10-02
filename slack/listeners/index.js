const messages = require("./messages");
const commands = require("./commands");

module.exports.registerListeners = (app) => {
  messages.register(app);
  commands.regiser(app);
};
