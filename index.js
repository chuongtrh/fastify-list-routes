const fp = require("fastify-plugin");

const COLORS = {
  yellow: 33,
  green: 32,
  blue: 34,
  red: 31,
  grey: 90,
  magenta: 35,
  clear: 39,
};

const colorText = (color, string) =>
  `\u001b[${color}m${string}\u001b[${COLORS.clear}m`;

function colorMethod(method) {
  switch (method) {
    case "POST":
      return colorText(COLORS.yellow, method);
    case "GET":
      return colorText(COLORS.green, method);
    case "PUT":
      return colorText(COLORS.blue, method);
    case "DELETE":
      return colorText(COLORS.red, method);
    case "PATCH":
      return colorText(COLORS.grey, method);
    default:
      return method;
  }
}

function printRoutes(routeOptions, opts) {
  const { colors } = opts;

  if (routeOptions.length === 0) {
    return;
  }

  //Sort route Options
  routeOptions.sort((a, b) => a.url.localeCompare(b.url));

  console.info("Available routes:");
  for (const routeOption of routeOptions) {
    const { method, url } = routeOption;
    if (method === "HEAD") continue;
    console.info(`${colors ? colorMethod(method) : method}\t${url}`);
  }
}

function fastifyListRoute(instance, opts, next) {
  const routeOptions = [];
  instance.addHook("onRoute", (routeOption) => {
    routeOptions.push(routeOption);
  });

  instance.addHook("onReady", (done) => {
    printRoutes(routeOptions, opts);
    done();
  });
  next();
}

module.exports = fp(fastifyListRoute, {
  name: "fastify-list-routes",
  fastify: "4.x",
});
