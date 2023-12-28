import { RouteShorthandOptions } from "fastify";
import { FromSchema } from "json-schema-to-ts";

const findParamsSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
  },
  required: ["id"],
} as const;

export const findRouteParamsSchema: RouteShorthandOptions["schema"] = {
  params: findParamsSchema,
} as const;

export type FindParamsSchema = FromSchema<typeof findParamsSchema>;
