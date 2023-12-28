import { FastifyPluginAsync } from "fastify";
import { findResponseSchema, findSerializer } from "./response/get-by-id.js";
import {
  FindParamsSchema,
  findRouteParamsSchema,
} from "./request/get-by-id.js";
import { User } from "./entity.js";

export const userFindRouter: FastifyPluginAsync<{
  service: (id: string) => User;
}> = async (f, opts) => {
  f.get<{ Params: FindParamsSchema }>(
    "/:id",
    {
      schema: {
        params: findRouteParamsSchema?.params,
        response: findResponseSchema?.response,
      },
    },
    async (request, reply) => {
      const id = request.params.id;
      const res = await opts.service(id);
      const response = findSerializer(res);
      return reply.status(200).send(response.content);
    }
  );
};
