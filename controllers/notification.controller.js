const 

async function post(req, res, next) {
  try {
    const notificationData = req.body;
    // const slackMessage = formatSlackMessage(notificationData.message)
    //
    // send the notification to slack
    // sendSlackMessage(slackMessage);
    res.status(200).send('notification sent');
  } catch (error) {
    req.flash("error_msg", {
      message: 'Error sending notification',
      debug: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    };
    next(error);
  }
}

module.exports = { post, };
