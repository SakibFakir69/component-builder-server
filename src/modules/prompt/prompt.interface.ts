export enum ROLE {
  USER = "user",
  ASSISTANT = "assistant",
}

export interface IChatMessage {
  role: ROLE;
  content: string;
  timestamp: Date;
}

export interface IPrompt {
  userId: string;
  conversationId: string;
  messages: IChatMessage[];
}
