import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { shouldBeUser } from '../middleware/authMiddleware.js'
import stripe from '../utils/stripe.js'

const app = new Hono()
app.use('*', clerkMiddleware())

app.get('/health', (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now()
  })
})

app.post('/create-stripe-product', shouldBeUser, async (c) => {
  const res = await stripe.products.create({
    id: "123",
    name: "Test Product",
    default_price_data: {
      currency: "cad",
      unit_amount: 10 * 100,
    },
  })
  return c.json(res);
})

app.get('/get-stripe-product-price', shouldBeUser, async (c) => {
  const res = await stripe.prices.list({
    product: "123"
  })
  return c.json(res);
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