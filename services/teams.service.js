const axios = require("axios");
const graph = require("../graph");

const getTeams = async function (req, res) {
  //console.log("get channels has been called");
  const params = {
    channels: [],
  };

  // Get the user
  const user = req.app.locals.users[req.session.userId];

  //console.log("get channels User: ", user);

  try {
    // get teams channels
    const channels = await graph.getTeamsChannelsView(
      req.app.locals.msalClient,
      req.session.userId,
    );

    //console.log("channels from service:", channels);
    params.teams = channels.value;
    return channels;
  } catch (err) {
    req.flash("error_msg", {
      message: "Could not fetch channels",
      debug: JSON.stringify(err, Object.getOwnPropertyNames(err)),
    });
  }
};


const getChannels = async function (req, res, groups) {
  const { text, value, description } = groups[0];
  //console.log("text:", text)
  //console.log("value:", value)
  //console.log("description", description)
  try {
  const user = req.app.locals.users[req.session.userId];
    // send a request for each teams group id that the user has selected
    const channels = await graph.getTeamsSubChannels(
      req.app.locals.msalClient,
      req.session.userId,
      groups[0].value);
    console.log("service channels from graph: ", channels)
    return channels;
  } catch (error) {
    req.flash("error_msg", {
      message: "Could not fetch sub channels for teams group",
      debug: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    });
    
  }
}

const createSubscription = async function (req, res, groupId, channelId) {
  try {
   const subscription = await graph.createSubscription(
    req.app.locals.msalClient,
      req.session.userId,
      groupId,
      channelId
    );
    console.log('subscription: ', subscription);
   return subscription; 
  } catch (error) {
    
    req.flash("error_msg", {
      message: "Could not create subscription",
      debug: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    });
  }
}

module.exports = { getTeams, getChannels, createSubscription };
