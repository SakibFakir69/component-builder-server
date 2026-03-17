import { Request, Response } from "express";
import { Payment } from "./payment.model";
import { ReturnResponse } from "../../helper/helper.returnresponse";
import mongoose from "mongoose";
import { stripe } from "../../utils/stripe";
import { User } from "../users/user.model";

const createPayment = async (req: Request, res: Response) => {
  try {
    const { planName, price, durationDays } = req.body;
    const userId = req.user?.id; // assuming req.user is properly typed with id: string

    // Validate required fields
    if (!planName || !price || !durationDays) {
      return ReturnResponse(res, 400, "Missing required fields: planName, price, durationDays");
    }
    console.log( req?.body , " data", userId , " user id ");

    // Ensure userId exists and is a valid ObjectId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return ReturnResponse(res, 400, "Invalid or missing user ID");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: planName },
            unit_amount: Math.round(Number(price) * 100), // convert to cents safely
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.FRONTEND_URL}/dashboard/payment-cancel`,
      metadata: {
        userId,
        planName,
        durationDays: String(durationDays),
      },
    });

    return ReturnResponse(res, 200, "Payment session created successfully", {
      url: session.url!,
    });
  } catch (error) {
    console.error("Create payment error:", error);
    return ReturnResponse(res, 500, "Failed to create payment session");
  }
};

/**
 * Step 2: Confirm payment after Stripe redirect/webhook
 */
const confirmPayment = async (req: Request, res: Response) => {
  try {
    const sessionId = (req.query.session_id as string) || req.body.sessionId;

    if (!sessionId) {
      return ReturnResponse(res, 400, "Missing sessionId");
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    if (session.payment_status !== "paid") {
      return ReturnResponse(res, 400, "Payment not completed yet");
    }

    const userId = session?.metadata?.userId;
    const planName = session?.metadata?.planName;
    const durationDays = Number(session?.metadata?.durationDays);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + durationDays);

    const paymentUserName = await User.findById(userId);
    if(!paymentUserName)
    {
      return res.status(404).json({
        success:false
        ,
        message:"User Name Not Founded"
      })
    }

    const payment = await Payment.create({
      userId,
      name:paymentUserName?.name,
      planName,
      price: session.amount_total! / 100,
      expiresAt,
      isActive: true,
      stripeSessionId: session.id,
      stripePaymentIntent:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id ?? null,
    });

    return ReturnResponse(res, 201, "Payment recorded successfully", payment);
  } catch (error) {
    console.log("Confirm error:", error);
    return ReturnResponse(res, 500, "Failed to confirm payment");
  }
};


const getPayment = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    console.log(userId);

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return ReturnResponse(res, 400, "Invalid or missing user ID");
    }

    const payments = await Payment.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).sort({ createdAt: -1 }).limit(1);

    return ReturnResponse(res, 200, "Payment history retrieved", payments);
  } catch (error) 
    {
    console.error("Get payments error:", error);
    return ReturnResponse(res, 500, "Failed to fetch payment history");
  }
};


export const paymentController = {
  createPayment,
  confirmPayment,
  getPayment,
}