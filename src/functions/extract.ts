import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const ExtractFunction = DefineFunction({
  callback_id: "extract",
  title: "Extract",
  description: "Extract message from body",
  source_file: "src/functions/extract.ts",
  input_parameters: {
    properties: {
      body: {
        type: Schema.types.string,
      },
    },
    required: ["body"],
  },
  output_parameters: {
    properties: {
      plus: {
        type: Schema.types.boolean,
        default: true,
      },
      target: {
        type: Schema.types.string,
      },
    },
    required: [],
  },
});

export default SlackFunction(ExtractFunction, ({ inputs }) => {
  const regExp = /\<\@.+?\>\s?(\<\@.+?\>)(.*ありがとう|ありがとうございます.*)/;
  const match = inputs.body.match(regExp);
  if (match) {
    const target = match[1];
    const thnx = match[2];
    // const text = match[3];
    const plus = thnx === "ありがとう" || "ありがとうございます" ? true : false;
    return {
      outputs: {
        plus,
        target,
      },
    };
  }
  return {
    outputs: {},
  };
});
