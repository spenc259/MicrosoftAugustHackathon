const { createSubscriptionCallback } = require('./createSubscription');

module.exports.register = (app) => {
  app.view('create_subscription', createSubscriptionCallback);
}
