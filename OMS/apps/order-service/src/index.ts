import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { clerkClient, clerkPlugin, getAuth } from '@clerk/fastify'

const server: FastifyInstance = Fastify({})

server.register(clerkPlugin)


const opts: RouteShorthandOptions = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    pong: {
                        type: 'string'
                    }
                }
            }
        }
    }
}

server.get("/health", (req, reply) => {
    reply.status(200).send({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now()
    });
});


server.get('/test', async (req, reply) => {
    try {

        const { isAuthenticated, userId } = getAuth(req)


        if (!isAuthenticated) {
            return reply.code(401).send({ error: 'User not authenticated' })
        }

        const user = await clerkClient.users.getUser(userId)

        return reply.send({
            message: 'User retrieved successfully for the order service!!',
            user,
        })
    } catch (error) {
        server.log.error(error)
        return reply.code(500).send({ error: 'Failed to retrieve user' })
    }
})



const start = async () => {
    try {
        await server.listen({ port: 8001 })

        const address = server.server.address()
        const port = typeof address === 'string' ? address : address?.port
        console.log(`Order Service running on port ${port}`)

    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()