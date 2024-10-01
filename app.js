const { App } = require("@slack/bolt");

// Initializes your app with your bot token and signing secret
export const slackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true, // add this
  appToken: process.env.SLACK_APP_TOKEN, // add this
  port: process.env.PORT || 3000,
});


(async () => {
  // Start your app
  await slackApp.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
