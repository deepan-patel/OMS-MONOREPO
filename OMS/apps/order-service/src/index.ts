import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'

const server: FastifyInstance = Fastify({})


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