module.exports = (fastify, _, done) => {
  fastify.put("/path1", {
    async handler() {
      return { ok: true };
    },
  });

  fastify.delete("/path2", {
    async handler() {
      return { ok: true };
    },
  });

  done();
};
