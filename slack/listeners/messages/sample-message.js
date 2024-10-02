const sampleMessageCallback = async ({ message, say }) => {
  try {
    await say({
      blocks: [
        {
          type: "section",
          text: { type: "mrkdwn", text: `Hey there <@${message.user}>!!` },
        },
      ],
      text: `Hey <@${message.user}>!!!!`,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sampleMessageCallback };
