require('dotenv').config({ path: __dirname + '/../.env' });

const { App } = require('@slack/bolt');
const { registerListeners } = require('./listeners');
const { ConfidentialClientApplication } = require('@azure/msal-node');
const axios = require('axios');
const express = require('express');

if (!process.env.MS_CLIENT_ID || !process.env.MS_CLIENT_SECRET) {
  throw new Error(
    'MS_CLIENT_ID and MS_CLIENT_SECRET must be set in the environment variables'
  );
}

const msalConfig = {
  auth: {
    clientId: process.env.MS_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.MS_TENANT_ID}`,
    clientSecret: process.env.MS_CLIENT_SECRET,
  },
};

const msalClient = new ConfidentialClientApplication(msalConfig);

const expressApp = express();

// Initializes your app with your bot token and signing secret
const slackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true, // add this
  appToken: process.env.SLACK_APP_TOKEN, // add this
  port: process.env.SLACK_PORT || 4000,
});

// Command to initiate Microsoft OAuth
slackApp.command('/auth', async ({ ack, respond }) => {
  await ack();
  const callbackUrl =
    'https://' + process.env.NGROK_DOMAIN + '/auth/callback';
  const authUrl = `https://login.microsoftonline.com/${
    process.env.MS_TENANT_ID
  }/oauth2/v2.0/authorize?client_id=${
    process.env.MS_CLIENT_ID
  }&response_type=code&redirect_uri=${encodeURIComponent(
    callbackUrl
  )}&scope=${encodeURIComponent('User.Read')}`;

  await respond(
    `Click here to authorize: <${authUrl}|Authorize with Microsoft>`
  );
});
// OAuth callback route
expressApp.get('/auth/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const accessToken = await handleOAuthCallback(code);
    const userProfile = await callGraphAPI(accessToken);
    res.send(`Hello, ${userProfile.displayName}, ${accessToken}`);
  } catch (error) {
    console.error('Error in callback route:', error);
    res.status(500).send('Authentication failed');
  }
});

// Function to handle OAuth callback and exchange code for token
const handleOAuthCallback = async (code) => {
  const callbackUrl =
    'https://' + process.env.NGROK_DOMAIN + '/auth/callback';
  const tokenRequest = {
    code,
    scopes: ['User.Read'],
    redirectUri: callbackUrl,
  };

  try {
    const tokenResponse = await msalClient.acquireTokenByCode(
      tokenRequest
    );
    return tokenResponse.accessToken;
  } catch (error) {
    console.error('Error during OAuth callback:', error);
    throw new Error('OAuth callback error');
  }
};

// Function to call Microsoft Graph API with the acquired token
const callGraphAPI = async (accessToken) => {
  try {
    const response = await axios.get(
      'https://graph.microsoft.com/v1.0/me',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error calling Graph API:', error);
    throw new Error('Error calling Microsoft Graph API');
  }
};

registerListeners(slackApp);

(async () => {
  expressApp.listen(4001, () => {
    console.log('⚡️ Express app is running!');
  });
  // Start your app
  await slackApp.start(process.env.PORT || 4000);

  console.log('⚡️ Bolt app is running!');
})();

module.exports = { slackApp };
