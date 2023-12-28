import Fastify from "fastify";
import { userFindRouter } from "./feature/user/router.js";
import { User } from "./feature/user/entity.js";
import swagger from "@fastify/swagger";
import swaggerui from "@fastify/swagger-ui";

const fastify = Fastify({
  logger: true,
});

await fastify.register(swagger, {
  swagger: {
    info: {
      title: "Test swagger",
      description: "Testing the Fastify swagger API",
      version: "0.1.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: "localhost",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [{ name: "user", description: "User related end-points" }],
  },
});

await fastify.register(swaggerui, {
  routePrefix: "/documentation",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

// Declare a route
fastify.register(userFindRouter, {
  prefix: "/users",
  service: (id: string) => new User(id),
});

await fastify.ready();
fastify.swagger();

// Run the server!
try {
  await fastify.listen({ port: 3000 });
  console.log(fastify.printRoutes());
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
