// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config({ path: __dirname + "/./.env" });

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const session = require("express-session");
const flash = require("connect-flash");
const msal = require("@azure/msal-node");

const authRouter = require("./routes/v1/auth");
const teamsRouter = require("./routes/v1/teams");
const { slackApp } = require("./slack/app");

var app = express();

if (!process.env.SLACK_SIGNING_SECRET) {
  throw new Error(
    "SLACK_SIGNING_SECRET must be set in the environment variables",
  );
}

//const expressReceiver = new ExpressReceiver({
//  signingSecret: process.env.SLACK_SIGNING_SECRET
//})

if (!process.env.MS_CLIENT_ID || !process.env.MS_CLIENT_SECRET) {
  throw new Error(
    "MS_CLIENT_ID and MS_CLIENT_SECRET must be set in the environment variables",
  );
}

//const msalConfig = {
//  auth: {
//    clientId: process.env.MS_CLIENT_ID,
//    authority: `https://login.microsoftonline.com/${process.env.MS_TENANT_ID}`,
//    clientSecret: process.env.MS_CLIENT_SECRET,
//  },
//};

//const msalClient = new ConfidentialClientApplication(msalConfig);
// <MsalInitSnippet>
// In-memory storage of logged-in users
// For demo purposes only, production apps should store
// this in a reliable storage
app.locals.users = {};

// MSAL config
const msalConfig = {
  auth: {
    clientId: process.env.MS_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.MS_TENANT_ID}`,
    clientSecret: process.env.MS_CLIENT_SECRET,
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        if (!containsPii) console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

// Create msal application object
app.locals.msalClient = new msal.ConfidentialClientApplication(msalConfig);
// </MsalInitSnippet>
// <SessionSnippet>
// Session middleware
// NOTE: Uses default in-memory session store, which is not
// suitable for production
app.use(
  session({
    secret: "your_secret_value_here",
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
  }),
);

// Flash middleware
app.use(flash());

// Set up local vars for template layout
app.use(function (req, res, next) {
  //  // Read any flashed errors and save
  res.locals.error = req.flash("error_msg");
  //  // Check for simple error string and
  //  // convert to layout's expected format
  var errs = req.flash("error");
  //
  for (var i in errs) {
    res.locals.error.push({ message: "An error occurred", debug: errs[i] });
  }

  // Check for an authenticated user and load
  // into response locals
  if (req.session.userId) {
    res.locals.user = app.locals.users[req.session.userId];
  }

  next();
});
// </SessionSnippet>

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/teams", teamsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// start the slack app?

module.exports = app;
