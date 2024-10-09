const { default: axios } = require("axios");
const selectTeamsModal = require("../commands/modals/selectTeams");

const displayTeamsInfoCallback = async ({
  ack,
  body,
  client,
  logger,
  context,
}) => {
  await ack();
  //console.log("context", context);
  try {
    // call the teams endpoint
    const serverResponse = await axios.get("http://localhost:8080/teams");
    //console.log("response from express: ", await serverResponse.data);

    const channels = await serverResponse.data.value

    const result = await client.views.update({
      view_id: body.view.id,
      view: selectTeamsModal(channels),
    });
    // result
    logger.info("select teams modal:", result, result.view.id);
  } catch (error) {
    console.error(error);
    logger.error("action error: ", error);
  }
};

module.exports = { displayTeamsInfoCallback };
