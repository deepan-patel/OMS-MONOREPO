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
export const getProducts = async (req: Request, res: Response) => {
    const { sort, category, search, limit } = req.query;

    const orderBy = (() => {
        switch (sort) {
            case "asc":
                return { price: "asc" };
            case "desc":
                return { price: "desc" };
            case "oldest":
                return { createdAt: "asc" };
            default:
                return { createdAt: "desc" };
        }
    })();

    const products = await prisma.product.findMany({
        where: {
            ...(category && {
                category: {
                    slug: category as string
                }
            }),
            ...(search && {
                name: {
                    contains: search as string,
                    mode: "insensitive"
                }
            })
        },
        orderBy,
        take: limit ? Number(limit) : undefined
    });

    res.status(200).json(products);
};
export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
        return res.status(404).json({ error: "Product not found!" });
    }

    res.status(200).json(product);
};