const oauthEventCallback = async ({ ack, client, event, logger }) => {
  await ack();

  try {
    // Assuming you store the user's Slack ID and view ID when initiating OAuth
    const { view_id } = event; // Example: data passed in event or session

    // Update the modal with a success message
    await client.views.update({
      view_id: view_id, // This is the view ID of the modal we want to update
      view: {
        type: "modal",
        callback_id: "signin_teams_modal",
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
        ],
      },
    });
    logger.info("event callback success");
  } catch (error) {
    logger.error("error in event callback");
    console.error("Error updating modal after sign-in:", error);
  }
};

module.exports = { oauthEventCallback }
