export const createFridgeSchema = {
  body: {
    type: "object",
    required: ["name", "userId"],
    properties: {
      name: { type: "string" },
      userId: { type: "number" },
    },
  },
};

export const addUserToFridgeSchema = {
  body: {
    type: "object",
    required: ["fridgeId", "userId"],
    properties: {
      fridgeId: { type: "number" },
      userId: { type: "number" },
    },
  },
};

export const getFridgeSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
};
