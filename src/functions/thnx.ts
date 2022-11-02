import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";
import { Datastore, DATASTORE_NAME } from "../datastore.ts";

export const ThnxFunction = DefineFunction({
  callback_id: "thnx-function",
  title: "Thnx",
  source_file: "src/functions/thnx.ts",
  input_parameters: {
    properties: {
      target: {
        type: Schema.types.string,
      },
      plus: {
        type: Schema.types.boolean,
      },
    },
    required: ["target", "plus"],
  },
  output_parameters: {
    properties: {
      thnx: {
        type: Schema.types.number,
      },
    },
    required: [],
  },
});

export default SlackFunction(ThnxFunction, async ({ inputs, token }) => {
  if (!inputs.target) {
    return { outputs: {} };
  }

  const client = SlackAPI(token, {});

  const result = await client.apps.datastore.query<typeof Datastore.definition>(
    {
      datastore: DATASTORE_NAME,
      expression: "#target = :target",
      expression_attributes: { "#target": "target" },
      expression_values: { ":target": inputs.target },
    },
  );

  let thnx = 0;

  if (result.items.length > 0) {
    const item = result.items[0];
    thnx = getThnx(item.thnx, inputs.plus);
    await client.apps.datastore.put({
      datastore: DATASTORE_NAME,
      item: {
        id: item.id,
        thnx: thnx,
      },
    });
  } else {
    const uuid = crypto.randomUUID();
    thnx = getThnx(thnx, inputs.plus);
    await client.apps.datastore.put({
      datastore: DATASTORE_NAME,
      item: {
        id: uuid,
        target: inputs.target,
        thnx: thnx,
      },
    });
  }

  return {
    outputs: {
      thnx,
    },
  };
});

const getThnx = (thnx: number, plus: boolean) => {
  return plus ? thnx + 1 : thnx - 1;
};
