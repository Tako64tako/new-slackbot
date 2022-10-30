import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";

export const SendFunction = DefineFunction({
  callback_id: "send",
  title: "Send",
  description: "Send message",
  source_file: "src/functions/send.ts",
  input_parameters: {
    properties: {
      target: {
        type: Schema.types.string,
      },
      thnx: {
        type: Schema.types.number,
      },
      channelId: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["channelId"],
  },
});

export default SlackFunction(SendFunction, ({ inputs, token }) => {
  let message = "";
  if (inputs.target === undefined || inputs.thnx === undefined) {
    message = "Usage: @thnx {name}++";
  } else {
    message = `${inputs.target} : ${inputs.thnx}`;
  }

  const client = SlackAPI(token, {});
  client.chat.postMessage({
    channel: inputs.channelId,
    text: message,
  });
  return {
    outputs: {},
  };
});
