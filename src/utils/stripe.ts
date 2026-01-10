// src/utils/stripe.ts
import dotenv from 'dotenv'
dotenv.config();
import Stripe from "stripe";
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "STRIPE_SECRET_KEY is missing! Did you forget to add it to your .env file?"
  );
}
// THIS IS THE CORRECT WAY — reads from .env automatically
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover", // always use a pinned version
  typescript: true,
});