// src/modules/payment/payment.model.ts

import mongoose, { Schema, model, Document } from "mongoose";

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;  
  name:string,
  planName: string;
  price: number;                     
  expiresAt: Date;
  isActive: boolean;
  stripeSessionId: string;
  stripePaymentIntent: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    userId: {                                  
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name:{type:String},

    planName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,          // ← MUST be Number, not String
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean, default: true },
    stripeSessionId: {
      type: String,
      required: true,
      unique: true,
    },
    stripePaymentIntent: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const Payment = model<IPayment>("Payment", paymentSchema);