
const { default: axios } = require("axios");

const subscriptionSuccess = require("../../views/modals/subscriptionSuccess");

const createSubscriptionCallback = async ({
  ack,
  body,
  client,
  logger,
  context,
}) => {
  console.log('createSubscription called!!')
  const subscription = {
    changeType: "created",
    notificationUrl: "http://localhost:8080/notifications",
    resource: "/teams/{id}/channels/{id}/messages",
  };
  try {
    await ack();

    const subscriptionResponse = await axios.post(
      "http://localhost:8080/teams/subscription",
      subscription,
    );
    console.log("response from express: ", await subscriptionResponse.data);

    const result = await client.views.update({
      view_id: body.view.id,
      view: subscriptionSuccess(),
    })

    logger.info("subscription created");
  } catch (error) {
    logger.error("error creating subscription: ", error);
  }
};

module.exports = { createSubscriptionCallback }
