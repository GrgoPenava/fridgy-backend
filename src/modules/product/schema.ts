export const addProductSchema = {
  body: {
    type: "object",
    required: ["barcode", "fridgeId"],
    properties: {
      barcode: { type: "string" },
      fridgeId: { type: "number" },
    },
  },
};

export const getProductSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
};
