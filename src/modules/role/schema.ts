export const createRoleSchema = {
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        message: { type: "string" },
        code: { type: "number" },
        data: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            createdAt: { type: "string" },
            updatedAt: { type: "string" },
          },
        },
      },
    },
  },
};

export const updateRoleSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        code: { type: "number" },
        data: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            createdAt: { type: "string" },
            updatedAt: { type: "string" },
          },
        },
      },
    },
  },
};

export const getRoleSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        code: { type: "number" },
        data: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            createdAt: { type: "string" },
            updatedAt: { type: "string" },
          },
        },
      },
    },
  },
};

export const getAllRolesSchema = {
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        code: { type: "number" },
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },
        },
      },
    },
  },
};

export const deleteRoleSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        code: { type: "number" },
      },
    },
  },
};
