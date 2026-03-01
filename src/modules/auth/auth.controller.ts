import { Request, Response } from "express";
import { User } from "../users/user.model";
import { ReturnResponse } from "../../helper/helper.returnresponse";
import jwt from "jsonwebtoken";

// login user
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ReturnResponse(res, 400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return ReturnResponse(res, 400, "User not found");
    }

    const payload = { id: user._id, email: user.email };

    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET || "secret-key",
      {
        expiresIn: "5d",
      }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || "refresh-key",
      {
        expiresIn: "30d",
      }
    );

    // set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false, // false for local dev
      sameSite: "lax", // allow sending cookie on cross-origin requests from frontend
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    const userData = { id: user.id, name: user.name, email: user.email , role:user?.role };

    return ReturnResponse(res, 200, "User login successfully", {
       userData,
      accessToken,
      refreshToken,
    });

    
    
  } catch (error) {
    console.error(error);
    return ReturnResponse(res, 500, "Server error");
  }
};

// get logged-in user
const me = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) return ReturnResponse(res, 401, "Unauthorized");

    const user = await User.findById(userId).select("-password"); // exclude password
    if (!user) return ReturnResponse(res, 404, "User not found");

    return ReturnResponse(res, 200, "User data fetched successfully", user);
  } catch (error) {
    console.error(error);
    return ReturnResponse(res, 500, "Server error");
  }
};

// logout user
const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return ReturnResponse(res, 200, "User logged out successfully");
  } catch (error) {
    console.error(error);
    return ReturnResponse(res, 500, "Server error");
  }
};

// export controller
export const authController = {
  loginUser,
  me,
  logout,
};
