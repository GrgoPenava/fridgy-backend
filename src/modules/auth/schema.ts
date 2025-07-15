export const registerSchema = {
  body: {
    type: "object",
    required: ["email", "password", "username"],
    properties: {
      email: { type: "string", format: "email" },
      username: { type: "string", minLength: 6 },
      password: { type: "string", minLength: 6 },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        message: { type: "string" },
        user: {
          type: "object",
          properties: {
            id: { type: "integer" },
            email: { type: "string" },
            username: { type: "string" },
            role: { type: "string" },
          },
        },
      },
    },
    409: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
    500: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
};

export const loginSchema = {
  body: {
    type: "object",
    required: ["email", "password", "username"],
    properties: {
      email: { type: "string", format: "email" },
      username: { type: "string" },
      password: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        accessToken: { type: "string" },
        user: {
          type: "object",
          properties: {
            id: { type: "integer" },
            email: { type: "string" },
            username: { type: "string" },
            role: { type: "string" },
          },
        },
      },
    },
    401: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
    500: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
};
