import { Workflow } from "./src/workflow.ts";
import { Manifest } from "deno-slack-sdk/mod.ts";
import { Datastore } from "./src/datastore.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "thankyou-slackbot",
  description: "count and tally thanks",
  icon: "assets/thnx.png",
  workflows: [Workflow],
  outgoingDomains: [],
  datastores: [Datastore],
  botScopes: [
    "app_mentions:read",
    "chat:write",
    "chat:write.public",
    "datastore:read",
    "datastore:write",
  ],
});
