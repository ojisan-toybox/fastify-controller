import Fastify from "fastify";
import { userFindRouter } from "./feature/user/router.js";
import { User } from "./feature/user/entity.js";
const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.register(userFindRouter, {
  prefix: "/users",
  service: (id: string) => new User(id),
});

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
