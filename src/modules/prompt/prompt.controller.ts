//// create , update , delte

import { Request, Response } from "express";
import { ai } from "../../utils/gemniApi";
import { Chat } from "./prompt.model";
import { ReturnResponse } from "../../helper/helper.returnresponse";
import { ROLE } from "./prompt.interface";

const createPrompt = async (req: Request, res: Response) => {
  try {
    const userId = (req as any)?.user?.id;

    const { prompt, sessionId } = req.body;
    console.log(prompt, sessionId , userId , ' id ')

    if (!prompt || !sessionId) {
      return res
        .status(400)
        .json({ status: false, message: "Please enter valid info" });
    }
    const structuredPrompt = `
You are an expert frontend developer.
Generate a React functional component using Tailwind CSS.

Do not include explanations or extra text.
User instruction: ${prompt}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: structuredPrompt,
    });

    // Add messages to existing session or create new session
    const chat = await Chat.findOneAndUpdate(
      { conversationId: sessionId, userId: userId },

      {
        $push: {
          messages: [
            { role: ROLE.USER, content: prompt },
            { role: ROLE.ASSISTANT, content: result.text },
          ],
        },
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      id:userId,
      status: true,
      ai: result.text,
      sessionId: sessionId,
      time: Date.now(),
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

// user chat history

const chatHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    console.log(userId , ' user id ')
    const result = await Chat.find({ userId: userId });

    console.log(result);

    return ReturnResponse(res, 200, " user chat history", result);
  } catch (error) {
    console.log(error);
  }
};

export const promptController = {
  chatHistory,
  createPrompt,
};
