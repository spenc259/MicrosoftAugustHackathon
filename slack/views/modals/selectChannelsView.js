const selectChannelsView = (channels) => {
  console.log("selectChannelsView channels: ", channels);
  const options = channels.map(({ id, displayName }, index) => {
    return {
      text: {
        type: "mrkdwn",
        text: "*Channel*",
      },
      description: {
        type: "mrkdwn",
        text: `${displayName}`,
      },
      value: `${id}`,
    };
  });

  //  const options = [{ text: { type: "mrkdwn", text: 'test'}, description: { type: "mrkdwn", text: "test"}, value: "test"}]
  return {
    type: "modal",
    callback_id: "create_subscription",
    title: {
      type: "plain_text",
      text: "Channels",
    },
    submit: {
      type: "plain_text",
      text: "Submit",
      emoji: true,
    },
    blocks: [
      {
        type: "section",
        block_id: "section-identifier",
        text: {
          type: "mrkdwn",
          text: "*Please select a channel below to start receiving notifications",
        },
      },
      {
        type: "input",
        element: {
          type: "checkboxes",
          options: options,
          //action_id: "channelCheckBoxActionId-1",
        },
        label: {
          type: "plain_text",
          text: "select all the channels you want to subscribe to:",
        },
      },
    ],
  };
};

module.exports = selectChannelsView;
