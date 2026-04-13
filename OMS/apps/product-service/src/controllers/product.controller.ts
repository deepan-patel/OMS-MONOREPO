import { Request, Response } from "express"
import { prisma } from "@repo/product-db";

export const createProduct = async (req: Request, res: Response) => {
    const data: prisma.ProductCreateInput = req.body;

    // checking if the mapping is correct for sizes and colours
    const { colours, images } = data;

    if (!colours || !Array.isArray(colours) || colours.length === 0) {
        return res.status(400).json({ error: "Colours array is required!" });
    }

    if (!images || typeof images !== "object") {
        return res.status(400).json({ error: "Images object is required!" });
    }

    // now we need to make sure the mapping works 
    const missingColours = colours.filter((c) => !images[c]);

    if (missingColours.length > 0) {
        return res.status(400).json({ error: `Missing images for colours: ${missingColours.join(", ")}` });
    }

    const product = await prisma.product.create({ data });
    res.status(201).json(product);

};
export const updateProduct = async (req: Request, res: Response) => { };
export const deleteProduct = async (req: Request, res: Response) => { };
export const getProducts = async (req: Request, res: Response) => { };
export const getProduct = async (req: Request, res: Response) => { };