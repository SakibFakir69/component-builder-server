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
      secure: true, 
      sameSite: "none", 
      maxAge: 5 * 24 * 60 * 60 * 1000, 
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, 
    });

   

    return ReturnResponse(res, 200, "User login successfully", {
      
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





export const refreshToken = async (req: Request, res: Response) => {
  try {
  
    const token = req.cookies?.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });
    }

   
    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as any;

    if (!decoded) {
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const userId = decoded.userId;

    const newAccessToken = jwt.sign(
      { userId },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "5d" }
    );

  
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true, 
      sameSite: "none",
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Access token refreshed",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Refresh token failed",
    });
  }
};
// export controller
export const authController = {
  loginUser,
  me,
  logout,
};
