const { default: axios } = require("axios");

// modals
const selectTeamsModal = require("./modals/selectTeams");

const linkTeamsCallback = async ({ ack, body, client, logger }) => {
  // Acknowledge the command request
  await ack();

  console.log("from slackApp", body);

  console.log(selectTeamsModal)

  try {
    //const serverResponse = await axios.get("http://localhost:4001/teams");
    //console.log("response from express: ", await serverResponse);

    // Call views.open with the built-in client
    const result = await client.views.open({
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: selectTeamsModal,
    });

    // result
    logger.info(result);
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { linkTeamsCallback };
