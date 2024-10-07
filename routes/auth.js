// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const graph = require('../graph');
const router = require('express-promise-router').default();


router.get('/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const accessToken = await handleOAuthCallback(code);
    const userProfile = await callGraphAPI(accessToken);
    res.send(`Hello, ${userProfile.displayName}`);
  } catch (error) {
    console.error('Error in callback route:', error);
    res.status(500).send('Authentication failed');
  }
});

// Function to handle OAuth callback and exchange code for token
const handleOAuthCallback = async (code) => {
  const tokenRequest = {
    code,
    scopes: ['User.Read'],
    redirectUri: 'https://<ngrok_subdomain>.ngrok.io/auth/callback',
  };

  try {
    const tokenResponse = await msalClient.acquireTokenByCode(tokenRequest);
    return tokenResponse.accessToken;
  } catch (error) {
    console.error('Error during OAuth callback:', error);
    throw new Error('OAuth callback error');
  }
};


/* GET auth callback. */
//router.get('/signin',
//  async function (req, res) {
//    const scopes = process.env.OAUTH_SCOPES || 'https://graph.microsoft.com/.default';
//    const urlParameters = {
//      scopes: scopes.split(','),
//      redirectUri: process.env.OAUTH_REDIRECT_URI
//    };
//
//    try {
//      const authUrl = await req.app.locals
//        .msalClient.getAuthCodeUrl(urlParameters);
//      res.redirect(authUrl);
//    }
//    catch (error) {
//      console.log(`Error: ${error}`);
//      req.flash('error_msg', {
//        message: 'Error getting auth URL',
//        debug: JSON.stringify(error, Object.getOwnPropertyNames(error))
//      });
//      res.redirect('/');
//    }
//  }
//);
//
//// <CallbackSnippet>
//router.get('/callback',
//  async function(req, res) {
//    const scopes = process.env.OAUTH_SCOPES || 'https://graph.microsoft.com/.default';
//    const tokenRequest = {
//      code: req.query.code,
//      scopes: scopes.split(','),
//      redirectUri: process.env.OAUTH_REDIRECT_URI
//    };
//
//    try {
//      const response = await req.app.locals
//        .msalClient.acquireTokenByCode(tokenRequest);
//
//      // Save the user's homeAccountId in their session
//      req.session.userId = response.account.homeAccountId;
//
//      const user = await graph.getUserDetails(
//        req.app.locals.msalClient,
//        req.session.userId
//      );
//
//      // Add the user to user storage
//      req.app.locals.users[req.session.userId] = {
//        displayName: user.displayName,
//        email: user.mail || user.userPrincipalName,
//        timeZone: user.mailboxSettings.timeZone
//      };
//    } catch(error) {
//      req.flash('error_msg', {
//        message: 'Error completing authentication',
//        debug: JSON.stringify(error, Object.getOwnPropertyNames(error))
//      });
//    }
//
//    res.redirect('/');
//  }
//);
//// </CallbackSnippet>
//
//router.get('/signout',
//  async function(req, res) {
//    // Sign out
//    if (req.session.userId) {
//      // Look up the user's account in the cache
//      const accounts = await req.app.locals.msalClient
//        .getTokenCache()
//        .getAllAccounts();
//
//      const userAccount = accounts.find(a => a.homeAccountId === req.session.userId);
//
//      // Remove the account
//      if (userAccount) {
//        req.app.locals.msalClient
//          .getTokenCache()
//          .removeAccount(userAccount);
//      }
//    }
//
//    // Destroy the user's session
//    req.session.destroy(function () {
//      res.redirect('/');
//    });
//  }
//);
//
module.exports = router;
