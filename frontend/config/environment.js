"use strict";

module.exports = function (environment) {
  const ENV = {
    modulePrefix: "jallikattu-frontend",
    environment,
    rootURL: "/",
    locationType: "history",
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {},
    },
    APP: {
      API_HOST: "http://localhost:8080",
      API_NAMESPACE: "jallikattu-admin/api",
    },
  };

  if (environment === "development") {
    // Development-specific settings
  }

  if (environment === "test") {
    ENV.locationType = "none";
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = "#ember-testing";
    ENV.APP.autoboot = false;
  }

  if (environment === "production") {
    // In production, the API is on a separate domain (Render)
    // Set this to your Render service URL, e.g.:
    // 'https://jallikattu-backend.onrender.com'
    ENV.APP.API_HOST = process.env.API_HOST || "";
  }

  return ENV;
};
