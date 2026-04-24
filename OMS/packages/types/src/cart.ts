import z from "zod";
import type { Product, Category } from "@repo/product-db"

const provinces = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
] as const;


export type ProductsType = Product[];

export const ShippingFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    province: z.enum(provinces),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
    phone: z.string().min(10, "Phone number must be 10 digits").max(10, "Phone number must be 10 digits").regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

})

export type ShippingFormInputs = z.infer<typeof ShippingFormSchema>;

export const PaymentFormSchema = z.object({
    CardHolderName: z.string().min(1, "Card holder name is required"),
    CardNumber: z.string().min(16, "Card number must be 16 digits").max(16, "Card number must be 16 digits").regex(/^[0-9]{16}$/, "Card number must be 16 digits"),
    CardExpiryDate: z.string().min(1, "Card expiry is required").regex(/^[0-9]{2}\/[0-9]{2}$/, "Card expiry must be in MM/YY format"),
    CardCVV: z.string().min(3, "Card CVV must be 3 digits").max(3, "Card CVV must be 3 digits").regex(/^[0-9]{3}$/, "Card CVV must be 3 digits"),
})

export type PaymentFormInputs = z.infer<typeof PaymentFormSchema>;

// Cart Store Types

export type CartItemType = Product & {
    quantity: number;
    selectedSize: string;
    selectedColor: string;
};


export type CartItemsType = CartItemType[];

export type CartStoreStateType = {
    cart: CartItemsType;
    hasHydrated: boolean;
};

export type CartStoreActionsType = {
    addToCart: (product: CartItemType) => void;
    removeFromCart: (product: CartItemType) => void;
    clearCart: () => void;
}
