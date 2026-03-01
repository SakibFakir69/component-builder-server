import { Request, Response } from "express";
import { Payment } from "../payment/payment.model";
import { ReturnResponse } from "../../helper/helper.returnresponse";
import { User } from "../users/user.model";
import mongoose from "mongoose";


// make admin protect route 

// user - handle multiple user use pagination
// make admin only access admin api 


// dashboard
// some front-end bug


// add payment pagination , search , filter
const allPayment = async (req: Request, res: Response) => {
  try {
    const allPayment = await Payment.find({});
    console.log(allPayment, "payment");

    return ReturnResponse(res, 200, "Payment retrive successfull", allPayment);
  } catch (error) {
    console.log(error);
  }
};



const allUser = async (req: Request, res: Response) => {
  try {
    const pageLimit = parseInt(req.query.pageLimit as string) || 10;
    const lastId = (req.query.lastId as string) || undefined;
    const role = req.query.role as string | undefined;
    const search = (req.query.search as string) || undefined;

    const query: any = {};

    if (lastId && mongoose.Types.ObjectId.isValid(lastId)) {
    }
    if (role) {
      query.role = role;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const allUser = await User.find(query)
      .sort({ createAt: "asc" })
      .limit(pageLimit);
    /// next cursor
    const nextCursor = allUser.length ? allUser[allUser.length - 1]._id : null;

    return ReturnResponse(res, 200, "Users fetched successfully", {
      allUser,
      nextCursor,
      pageLimit,
    });
  } catch (error: any) {
    console.log(error);
    return ReturnResponse(res, 500, "Internal server error", {
      name: error?.name,
      message: error?.message,
      stack: process.env.NODE_ENV === "development" ? error?.stack : undefined,
    });
  }
};



////    USER PAYMENT AND PLAN

const userPaymentAndUserDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const resultForPayment = await Payment.findById(userId);

    if (!resultForPayment) {
      return ReturnResponse(res, 404, "User payment Details  not founded");
    }
    return res.status(200).json(resultForPayment);
  } catch (error: any) {
    console.log(error);
    return ReturnResponse(res, 500, "Internal server error", {
      error: error?.name,
      message: error.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return ReturnResponse(res, 400, "Invalid user ID");
    }

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return ReturnResponse(res, 404, "User not found");
    }

    // Delete all payments associated with this user
    await Payment.deleteMany({ userId: id });

    return ReturnResponse(
      res,
      200,
      "User and their payments deleted successfully",
    );
  } catch (error) {
    console.error(error);
    return ReturnResponse(res, 500, "Failed to delete user");
  }
};

export const adminController = {
  allPayment,
  allUser,
  deleteUser,

  userPaymentAndUserDetails,
};
