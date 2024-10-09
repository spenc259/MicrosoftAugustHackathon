const subscriptionSuccess = () => {
  return {
    type: 'modal',
    callback_id: 'create_subscription',
    title: {
      type: 'plain_text',
      text: 'Success!'
    },
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '✅ You have successfully subscribed to channels!'
        }
      }
    ]
  }
}
