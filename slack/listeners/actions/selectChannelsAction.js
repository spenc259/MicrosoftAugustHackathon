const { default: axios } = require("axios");

const selectChannelsView = require("../../views/modals/selectChannelsView");

const displaySelectChannelsCallback = async ({
  ack,
  body,
  client,
  logger,
  context,
}) => {
  const groups = body.actions[0].selected_options;
  try {
    // call teams/channels endpoint
    const channelsResponse = await axios.post("http:localhost:8080/teams/channels", { groups: groups });
    console.log("response from express: ", await channelsResponse.data)

    const channels = await channelsResponse.data.value;
    // update the modal
    const result = await client.views.update({
      view_id: body.view.id,
      view: selectChannelsView(channels),
    });

    logger.info("select channels view:", result);
  } catch (error) {
    logger.error("displaySelectChannels error: ", error);
  }
};

module.exports = { displaySelectChannelsCallback };
