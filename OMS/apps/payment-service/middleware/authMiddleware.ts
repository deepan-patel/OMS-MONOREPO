import { createMiddleware } from "hono/factory";
import { getAuth } from "@hono/clerk-auth";

export const shouldBeUser = createMiddleware<{
    Variables: {
        userId: string
    }
}>(async (c, next) => {

    const { userId } = getAuth(c)

    if (!userId) {
        return c.json({
            message: 'You are not logged in for the payment service.',
        })
    }

    c.set("userId", userId);

    await next();
});