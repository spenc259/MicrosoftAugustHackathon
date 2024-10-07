const axios = require("axios");
const graph = require("../graph");

const getChannels = async function (req, res) {
  console.log("get channels has been called");
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

module.exports = { getChannels };
