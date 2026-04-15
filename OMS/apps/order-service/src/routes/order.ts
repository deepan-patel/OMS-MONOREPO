import fastify, { FastifyInstance } from "fastify"
import { shouldBeUser } from "../middleware/authMiddleware"
import { Order } from "@repo/order-db"

export const orderRouter = async (fastify: FastifyInstance) => {
    fastify.get("/user-orders", { preHandler: [shouldBeUser] }, async (req, reply) => {
        const orders = await Order.find({
            userId: req.userId
        })
        return reply.send(orders);
    })

    fastify.get("/orders", async (req, reply) => {
        const orders = await Order.find()
        return reply.send(orders);
    })


}