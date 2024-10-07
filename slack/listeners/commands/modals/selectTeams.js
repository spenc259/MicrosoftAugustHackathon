const selectTeamsModal = (channels) => {
  const options = channels.map(({ id, displayName }, index) => {
    return {
      text: {
        type: "mrkdwn",
        text: "*Microsoft Autumn Hackathon*",
      },
      description: {
        type: "mrkdwn",
        text: `${displayName}`,
      },
      value: `${id}`,
    };
  });
  return {
    type: "modal",
    callback_id: "signin_teams_modal",
    title: {
      type: "plain_text",
      text: "Team Channels",
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
        type: "actions",
        elements: [
          {
            type: "checkboxes",
            options: options,
            action_id: "channelCheckBoxActionId-1",
          },
        ],
      },
    ],
  };
};

module.exports = selectTeamsModal;
