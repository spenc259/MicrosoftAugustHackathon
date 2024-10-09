const authButtonModal = (url) => {
  return {
    type: "modal",
    callback_id: "signin_teams_modal",
    title: {
      type: "plain_text",
      text: "Sign in to Teams",
    },
    blocks: [
      {
        type: "section",
        block_id: "section-identifier",
        text: {
          type: "mrkdwn",
          text: "Please log in to get teams notifications",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Log in to teams",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Login",
            emoji: true,
          },
          value: "login",
          url: url,
          //action_id: "show_teams_channels",
        },
      },
    ],
  };
};

module.exports = authButtonModal;
