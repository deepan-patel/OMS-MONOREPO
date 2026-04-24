import stripe from "./stripe";
import { StripeProductType } from "@repo/types";

export const createStripeProduct = async (item: StripeProductType) => {
    try {
        const res = await stripe.products.create({
            id: item.id,
            name: item.name,
            default_price_data: {
                currency: "CAD",
                unit_amount: item.price * 100,
            },
        })
        return res;
    } catch (err) {
        console.log(err)
        return err;
    }

}

export const getProductStripePrice = async (productId: number) => {
    try {
        const res = await stripe.prices.list({
            product: "123"
        })
        return res.data[0]?.unit_amount;

    } catch (err) {
        console.log(err)
        return err;
    }

}
