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

 // console.log("app locals", req.app.locals)
  //console.log("session", req.session);

  try {
    const channels = await teamsService.getChannels(req, res);
    //console.log("channels from controller:", channels);
    res.json(channels);
  } catch (error) {
    console.error(`Error while getting channels from teams`);
    next(error);
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
};
