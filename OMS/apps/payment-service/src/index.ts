import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { shouldBeUser } from '../middleware/authMiddleware.js'

const app = new Hono()
app.use('*', clerkMiddleware())

app.get('/health', (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now()
  })
})

app.get('/test', shouldBeUser, (c) => {


  return c.json({
    message: 'You are logged in for the payment service!',
    userId: c.get("userId"),
  })
})

const start = async () => {
  try {
    serve({
      fetch: app.fetch,
      port: 8002
    }, (info) => {
      console.log(`Payment Service is running on port ${info.port}`)
    })
  }
  catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()