const { App } = require("@slack/bolt");
const {registerListeners} = require('./listeners');

// Initializes your app with your bot token and signing secret
const slackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true, // add this
  appToken: process.env.SLACK_APP_TOKEN, // add this
  port: process.env.PORT || 4000,
});

registerListeners(slackApp);

(async () => {
  // Start your app
  await slackApp.start(process.env.PORT || 4000);

  console.log("⚡️ Bolt app is running!");
})();

module.exports = { slackApp };
