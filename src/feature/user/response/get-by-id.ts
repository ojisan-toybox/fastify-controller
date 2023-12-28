import { RouteShorthandOptions } from "fastify";
import { User } from "../entity.js";
import { HttpResponseContent } from "./http-response-content.js";
import { FromSchema } from "json-schema-to-ts";

const okSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
} as const;

const okStatus = 200;

export const findResponseSchema: RouteShorthandOptions["schema"] = {
  response: {
    [okStatus]: okSchema,
    500: { type: "string" },
  },
};

export const findSerializer = (
  input: User
): HttpResponseContent<FromSchema<typeof okSchema>> => {
  return {
    status: okStatus,
    content: input,
  };
};
