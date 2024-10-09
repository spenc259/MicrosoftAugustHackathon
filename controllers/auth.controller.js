const { WebClient } = require("@slack/web-api");
const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

const authService = require("../services/auth.service");
const graph = require("../graph");
//const { slackApp } = require("../slack/app");
//const { slackApp } = require('../slack/app');

async function callback(req, res, next) {
  const scopes =
    process.env.OAUTH_SCOPES || "https://graph.microsoft.com/.default";
  const tokenRequest = {
    code: req.query.code,
    scopes: scopes.split(","),
    redirectUri: process.env.OAUTH_REDIRECT_URI,
  };

  const { code, state } = req.query;

  //console.log("code", code);
  //console.log("state", state);

  const { slackUser, viewId } = JSON.parse(decodeURIComponent(state));

  try {
    const response =
      await req.app.locals.msalClient.acquireTokenByCode(tokenRequest);

    // Save the user's homeAccountId in their session
    req.session.userId = response.account.homeAccountId;

    const user = await graph.getUserDetails(
      req.app.locals.msalClient,
      req.session.userId,
    );


    // Add the user to user storage
    req.app.locals.session = req.session;
    req.app.locals.users[req.session.userId] = {
      displayName: user.displayName,
      email: user.mail || user.userPrincipalName,
      timeZone: user.mailboxSettings.timeZone,
    };

    //console.log("auth user", user, req.session.userId);
    //console.log("session", req.app.locals, req.session);

    res.send(`Hello, ${user.displayName}`);

    // call the slack api
    slackClient.views.update({
      view_id: viewId, // View ID of the original modal that needs to be updated
      view: {
        type: "modal",
        title: {
          type: "plain_text",
          text: "Teams Sign-In",
        },
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "✅ You have successfully signed in to Microsoft Teams!",
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: { type: "mrkdwn", text: "Get your teams channels" },
            accessory: {
              type: "button",
              text: { type: "plain_text", text: "Get Teams", emoji: true },
              value: "get_teams",
              action_id: "show_teams_channels",
            },
          },
        ],
        //private_metadata: {
        //  userId: req.session.userID,
        //  msalclient: req.app.locals.msalClient
        //}
      },
    });

    // call the teams endpoint
    // next();
  } catch (error) {
    req.flash("error_msg", {
      message: "Error completing authentication",
      debug: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    });
  }

  //res.redirect("/");
}

module.exports = {
  callback,
};
