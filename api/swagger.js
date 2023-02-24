// generate the swagger config file
// and start the server
//
// Compare this snippet from api/swagger.js:
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API Documentation",
      description: "API Documentation",
      contact: {
        name: "API Support",
        url: "https://swagger.io",
      },
      servers: ["http://localhost:3000"],
    },
  },
  apis: ["./api/components/user/network.js"],
};
const swaggerDocs = (app, port) => {
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log(
    "Swagger docs available at http://localhost:" + port + "/api-docs"
  );
};
module.exports = {
  swaggerDocs,
};
