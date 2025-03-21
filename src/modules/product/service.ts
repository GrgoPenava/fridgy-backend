import axios from "axios";
import { prisma } from "../../config/database";
import logger from "../../utils/logger";
import { Response } from "../../types";

export async function addProductByBarcode(
  barcode: string,
  fridgeId: number
): Promise<Response> {
  try {
    const fridge = await prisma.fridge.findUnique({ where: { id: fridgeId } });
    if (!fridge) {
      logger.warn({ fridgeId }, "Frižider nije pronađen");
      return {
        message: "Frižider nije pronađen",
        code: 404,
      };
    }

    const apiResponse = await axios.get(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );
    const productData = apiResponse.data;

    if (productData.status !== 1 || !productData.product) {
      logger.warn({ barcode }, "Proizvod nije pronađen na Open Food Facts");
      return {
        message: "Proizvod nije pronađen na Open Food Facts",
        code: 404,
      };
    }

    const productName =
      productData.product.product_name || "Nepoznati proizvod";
    const calories = productData.product.nutriments["energy-kcal_100g"] || 0;

    const product = await prisma.product.create({
      data: {
        name: productName,
        barcode,
        calories,
        fridgeId,
      },
    });

    logger.info(
      { productId: product.id, fridgeId, barcode },
      "Proizvod dodan u frižider"
    );
    return {
      message: "Proizvod uspješno dodan u frižider",
      code: 201,
      data: product,
    };
  } catch (error) {
    logger.error(
      { error, barcode, fridgeId },
      "Greška pri dodavanju proizvoda"
    );
    return {
      message: "Greška pri dodavanju proizvoda",
      code: 500,
    };
  }
}

export async function getProduct(productId: number): Promise<Response> {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    console.log(product);

    if (!product) {
      logger.warn({ productId }, "Product not found");
      return {
        message: "Product not found",
        code: 404,
      };
    }

    logger.info({ productId }, "Product not found");
    return {
      message: "Product fetched",
      code: 200,
      data: product,
    };
  } catch (error) {
    logger.error({ error, productId }, "Error fetching product");
    return {
      message: "Cannot get product",
      code: 500,
    };
  }
}
