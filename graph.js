// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

var graph = require("@microsoft/microsoft-graph-client");
require("isomorphic-fetch");

module.exports = {
  getUserDetails: async function (msalClient, userId) {
    const client = getAuthenticatedClient(msalClient, userId);

    const user = await client
      .api("/me")
      .select("displayName,mail,mailboxSettings,userPrincipalName")
      .get();
    return user;
  },
 
  //<GetTeamsChannelsViewSnippet>
  getTeamsChannelsView: async function (msalClient, userId) {
    //console.log("getTeamsChannels has been called: ", userId);
    const client = getAuthenticatedClient(msalClient, userId);
    return client.api("/me/joinedTeams").select("id,displayName,description").get();
  },

  getTeamsSubChannels: async function (msalClient, userId, groupId) {
    //console.log("Teams sub channel groupId: ", groupId)
    const client = getAuthenticatedClient(msalClient, userId);
    return client.api(`/teams/${groupId}/channels`).get();
  }
};

function getAuthenticatedClient(msalClient, userId) {
  if (!msalClient || !userId) {
    throw new Error(
      `Invalid MSAL state. Client: ${msalClient ? "present" : "missing"}, User ID: ${userId ? "present" : "missing"}`,
    );
  }

  // Initialize Graph client
  const client = graph.Client.init({
    // Implement an auth provider that gets a token
    // from the app's MSAL instance
    authProvider: async (done) => {
      try {
        // Get the user's account
        const account = await msalClient
          .getTokenCache()
          .getAccountByHomeId(userId);

        if (account) {
          // Attempt to get the token silently
          // This method uses the token cache and
          // refreshes expired tokens as needed
          const scopes =
            process.env.OAUTH_SCOPES || "https://graph.microsoft.com/.default";
          const response = await msalClient.acquireTokenSilent({
            scopes: scopes.split(","),
            redirectUri: process.env.OAUTH_REDIRECT_URI,
            account: account,
          });

          // First param to callback is the error,
          // Set to null in success case
          done(null, response.accessToken);
        }
      } catch (err) {
        console.log(JSON.stringify(err, Object.getOwnPropertyNames(err)));
        done(err, null);
      }
    },
  });

  return client;
}
