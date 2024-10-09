const selectTeamsModal = (channels) => {
  const options = channels.map(({ id, displayName, description }, index) => {
    return {
      text: {
        type: "mrkdwn",
        text: `*${displayName}*`,
      },
      description: {
        type: "mrkdwn",
        text: `${description}`,
      },
      value: `${id}`,
    };
  });
  return {
    type: "modal",
    callback_id: "signin_teams_modal",
    title: {
      type: "plain_text",
      text: "Teams Selector",
    },
    blocks: [
      {
        type: "section",
        block_id: "section-identifier",
        text: {
          type: "mrkdwn",
          text: "*Please select Teams you want to follow",
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "checkboxes",
            options: options,
            action_id: "display_channels",
          },
        ],
      },
    ],
  };
};

module.exports = selectTeamsModal;
