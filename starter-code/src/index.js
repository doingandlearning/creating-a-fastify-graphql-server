const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
const routes = require("./routes");

mongoose
  .connect("mongodb://localhost/mysurfshop")
  .then(() => console.log("Mongodb connected.."))
  .catch((err) => console.log(err));

routes.forEach((route) => fastify.route(route));

const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (error) {
    fastify.log(error);
    process.exit(1);
  }
};

start();

module.exports = fastify;
