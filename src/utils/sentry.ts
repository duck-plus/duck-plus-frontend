import * as Sentry from "@sentry/react";

function init() {
  if (process.env.NODE_ENV === "production") {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      integrations: [
        new Sentry.BrowserTracing({
          // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
          tracePropagationTargets: ["localhost", "https:api.duckplus.net/"],
        }),
        new Sentry.Replay(),
      ],
      // Performance Monitoring
      tracesSampleRate: 0.1, // Capture 100% of the transactions, reduce in production!
      // Session Replay
      replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
      replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    });
  }
}

const captureMessage = (
  message: Parameters<typeof Sentry.captureMessage>[0],
  severityLevel: Sentry.SeverityLevel
) => {
  if (process.env.NODE_ENV === "production") {
    Sentry.captureMessage(message, severityLevel);
  } else {
    if (severityLevel === "error" || severityLevel === "fatal") {
      console.error(message);
    } else if (severityLevel === "warning") {
      console.warn(message);
    } else {
      console.log(message);
    }
  }
};

const captureException = (e: Parameters<typeof Sentry.captureException>[0]) => {
  if (process.env.NODE_ENV === "production") {
    Sentry.captureException(e);
  } else {
    console.error(e);
  }
};

const sentry = {
  init,
  captureMessage,
  captureException,
} as const;

export default sentry;
