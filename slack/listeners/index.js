const messages = require("./messages");
const commands = require("./commands");
const events = require('./events');
const actions = require('./actions');

module.exports.registerListeners = (app) => {
  messages.register(app);
  commands.regiser(app);
  events.register(app);
  actions.register(app);
};
