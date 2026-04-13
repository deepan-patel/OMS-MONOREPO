import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from '@clerk/express'
import { shouldBeUser } from "./middleware/authMiddleware.js";
import productRouter from "./routes/product.route.js"
import CategoryRouter from "./routes/category.route.js"

const app = express();


app.use(cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,

}));

// we need to ensure we can get data from req.body
app.use(express.json())
app.use(clerkMiddleware())

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now()
    });
});

app.get("/test", shouldBeUser, (req: Request, res: Response) => {
    res.json({
        message: "You are logged in for the product service!",
        userId: req.userId,
    })
});


// when ever we make a call to the products we will use the product router 
app.use("/products", productRouter);
app.use("/categories", CategoryRouter);


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    return res.status(err.status || 500).json({
        message: err.message || "Internal Server error occured!"
    })
})

app.listen(8000, () => {
    console.log("Product service is running on port 8000");
});