const fastify = require("fastify")();
const fastifyListRoute = require("../index");

async function run() {
  await fastify.register(fastifyListRoute, { colors: true });

  fastify.get("/", (request, reply) => {
    reply.send({ hello: "world" });
  });

  fastify.get("/path1/:id", {
    async handler() {
      return { ok: true };
    },
  });

  fastify.post("/path2", {
    async handler() {
      return { ok: true };
    },
  });

  fastify.register(require("./demo"), { prefix: "/demo" });

  fastify.patch("/bbb", {
    async handler() {
      return { ok: true };
    },
  });

  fastify.post("/aaa", {
    async handler() {
      return { ok: true };
    },
  });

  fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err;

    console.log(`Server is now listening on ${address}`);
  });
}
run();
