import { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

export function configureSwagger(app: FastifyInstance) {
  app.register(swagger, {
    openapi: {
      info: {
        title: "Fridge API",
        description: "API za upravljanje frižiderima i proizvodima",
        version: "1.0.0",
      },
      tags: [
        { name: "Fridge", description: "Fridge operations" },
        { name: "Auth", description: "User authentication" },
        { name: "Product", description: "Products from fridge" },
        { name: "User", description: "User management" },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
  });

  app.register(swaggerUi, {
    routePrefix: "/docs",
  });
}
