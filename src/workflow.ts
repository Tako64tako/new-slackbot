import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { ExtractFunction } from "./functions/extract.ts";
import { ThnxFunction } from "./functions/thnx.ts";
import { SendFunction } from "./functions/send.ts";

export const Workflow = DefineWorkflow({
  callback_id: "thnx",
  title: "Thnx Workflow",
  input_parameters: {
    properties: {
      text: {
        type: Schema.types.string,
      },
      userId: {
        type: Schema.slack.types.user_id,
      },
      channelId: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["text", "userId", "channelId"],
  },
});

const extractStep = Workflow.addStep(ExtractFunction, {
  body: Workflow.inputs.text,
});

const thnxStep = Workflow.addStep(ThnxFunction, {
  target: extractStep.outputs.target,
  plus: extractStep.outputs.plus,
});

Workflow.addStep(SendFunction, {
  channelId: Workflow.inputs.channelId,
  target: extractStep.outputs.target,
  thnx: thnxStep.outputs.thnx,
});

export default Workflow;
