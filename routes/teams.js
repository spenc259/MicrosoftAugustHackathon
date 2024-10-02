const router = require("express-promise-router").default();
const graph = require("../graph.js");

router.get("/", async function(req, res) {
  if (!req.session.userId) {
    // Redirect unauthenticated requests to home page
    res.redirect("/");
  } else {
    const params = {
      active: { calendar: true },
    };

    // Get the user
    const user = req.app.locals.users[req.session.userId];

    try {
      // get teams channels
      const channels = await graph.getTeamsChannelsView(
        req.app.locals.msalClient,
        req.session.userId,
      );

      console.log("getTeams:", channels);
      params.teams = channels.value;
      // Get the events
      //const events = await graph.getCalendarView(
      //  req.app.locals.msalClient,
      //  req.session.userId,
      //  dateFns.formatISO(weekStart),
      //  dateFns.formatISO(weekEnd),
      //  user.timeZone,
      //);

      //// Assign the events to the view parameters
      //params.events = events.value;
    } catch (err) {
      req.flash("error_msg", {
        message: "Could not fetch channels",
        debug: JSON.stringify(err, Object.getOwnPropertyNames(err)),
      });
    }

    res.render("teams", params);
  }
});

module.exports = router;
