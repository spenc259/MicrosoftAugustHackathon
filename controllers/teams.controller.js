const teamsService = require("../services/teams.service");

async function get(req, res, next) {
  // if no session.userId return console.error();
  //if (!req.session.userId || req.session.userId !== undefined) {
  //  console.error("no user session: ", req.session);
  //  //throw new Error("no user session");
  //  const error = "no user";
  //  res.sendStatus(400);
  //  return next(new Error(error));
  //}
  //
  //
  req.session = req.app.locals.session

  try {
    const teams = await teamsService.getTeams(req, res);
    res.json(teams);
  } catch (error) {
    console.error(`Error while getting teams`);
    next(error);
  }
}

async function getChannels(req, res, next) {
  req.session = req.app.locals.session
  //console.log("controller: getChannels");
  //console.log("req.body: ", req.body)
  const groups = req.body.groups
  //console.log("groups: ", groups)
  try {
    const channels = await teamsService.getChannels(req, res, groups)

    res.json(channels)
  } catch (error) {
    next(error);
  }
}


async function createSubscription(req, res, next) {
  req.session = req.app.locals.session

  try {
    const subscription = await teamsService.createSubscription(req, res, groupId, channelId );
    res.json(subscription)
  } catch (error) {
    next(error)
  }
}

async function post(req, res, next) {
  try {
    res.toJSON({ success: "post success" });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  get,
  post,
  getChannels,
  createSubscription
};
