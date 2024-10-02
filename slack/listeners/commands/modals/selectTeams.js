const selectTeamsModal = {
  type: "modal",
  callback_id: "modal-identifier",
  title: {
    type: "plain_text",
    text: "Just a modal",
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
          options: [
            {
              text: {
                type: "mrkdwn",
                text: "*Microsoft Autumn Hackathon*",
              },
              description: {
                type: "mrkdwn",
                text: "slack-teams-app",
              },
              value: "value-0",
            },
            {
              text: {
                type: "mrkdwn",
                text: "*Microsoft Autumn Hackathon*",
              },
              description: {
                type: "mrkdwn",
                text: "flow bot output",
              },
              value: "value-1",
            },
          ],
          action_id: "channelCheckBoxActionId-1",
        },
      ],
    },
  ],
};

module.exports = selectTeamsModal;
