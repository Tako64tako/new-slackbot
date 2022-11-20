import { Trigger } from "deno-slack-api/types.ts";
import { Workflow } from "../workflow.ts";
import { datetime } from "https://deno.land/x/ptera@v1.0.2/mod.ts";
import env from "../../env.ts";

const trigger: Trigger<typeof Workflow.definition> = {
  // type: "scheduled",
  // event: {
  //   event_type: "slack#/events/app_mentioned",
  //   channel_ids: [`${env.CHANNEL_ID}`], // TODO: Should use environment variables etc.
  // },
  // name: "Mention trigger",
  // workflow: "#/workflows/thnx",
  // "inputs": {
  //   "text": {
  //     value: "{{data.text}}",
  //   },
  //   "userId": {
  //     value: "{{data.user_id}}",
  //   },
  //   "channelId": {
  //     value: "{{data.channel_id}}",
  //   },
  // },
  name: "Mention trigger",
  type: "scheduled",
  workflow: "#/workflows/thnx",
  inputs: {
    text: {
      value: "{{data.text}}",
    },
    userId: {
      value: "{{data.user_id}}",
    },
    channelId: {
      value: "{{data.channel_id}}",
    },
  },
  schedule: {
    start_time: datetime().add({ minute: 1 }).toUTC().toISO(),
    timezone: "Asia/Tokyo",
    frequency: {
      type: "weekly",
      on_days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
  },
};

export default trigger;
