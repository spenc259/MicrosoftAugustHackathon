const { default: axios } = require("axios");

// modals
const authButtonModal = require("./modals/authModal");
const { callback_id, type } = require("./modals/selectTeams");

const linkTeamsCallback = async ({ ack, body, client, logger }) => {
  // Acknowledge the command request
  await ack();

  //logger.info("body, client", body, client);

  //console.log("from slackApp", body);

  try {
    //const serverResponse = await axios.get("http://localhost:8080/teams");
    //console.log("response from express: ", await serverResponse);
    const initialModal = await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
        callback_id: "signin_teams_modal",
        title: { type: "plain_text", text: "Login to teams" },
        blocks: [
          {
            type: "section",
            block_id: "section-identifier",
            text: {
              type: "mrkdwn",
              text: "Please log in to get teams notifications",
            },
          },
        ],
      },
    });

    logger.info(initialModal.view.id);

    const state = JSON.stringify({
      slackUser: body.user_id,
      viewId: initialModal.view.id,
    });
    const authUrl = `https://login.microsoftonline.com/${process.env.MS_TENANT_ID}/oauth2/v2.0/authorize?client_id=${process.env.MS_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(process.env.OAUTH_REDIRECT_URI)}&scope=${encodeURIComponent("User.Read")}&state=${encodeURIComponent(state)}`;
    // Call views.open with the built-in client
    const result = await client.views.update({
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      view_id: initialModal.view.id,
      // View payload
      view: authButtonModal(authUrl),
    });

    // result
    logger.info("result:", result, result.view.id);
  } catch (error) {
    logger.error(error);
  }
  //try {
  // const result = await client.views.open({
  //    trigger_id: body.trigger_id,
  //    view: {
  //      type: 'modal',
  //      callback_id: 'signin_teams_modal',
  //      title: {
  //        type: 'plain_text',
  //        text: 'Teams Sign-In'
  //      },
  //      blocks: [
  //        {
  //          type: 'section',
  //          text: {
  //            type: 'mrkdwn',
  //            text: 'Please sign in to Microsoft Teams to continue.'
  //          },
  //          accessory: {
  //            type: 'button',
  //            text: {
  //              type: 'plain_text',
  //              text: 'Sign in to Teams'
  //            },
  //            action_id: 'sign_in_teams_button' // Action ID for the button
  //          }
  //        }
  //      ]
  //    }
  //  });

  //  logger.info('Result: ', result, result.view.id);
  //} catch (error) {
  //  logger.error('Error opening modal:', error);
  //}
};

module.exports = { linkTeamsCallback };
