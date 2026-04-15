import { createMiddleware } from "hono/factory";
import { getAuth } from "@hono/clerk-auth";
import type { CustomJwtSessionClaims } from "@repo/types";

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


export const shouldBeAdmin = createMiddleware<{
    Variables: {
        userId: string
    }
}>(async (c, next) => {

    const { userId, sessionClaims } = getAuth(c)

    if (!userId) {
        return c.json({
            message: 'You are not logged in for the payment service.',
        })
    }

    c.set("userId", userId);

    const claims = sessionClaims as unknown as CustomJwtSessionClaims;

    if (claims.metadata?.role !== "admin") {
        return c.json({
            message: 'You are not authorized for the payment service.',
        })
    }

    await next();
});



