// src/types/express/index.d.ts
import { Request } from 'express';

// Define the structure of the user object you expect to decode
export interface AuthUser {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    // Augment the Request interface
    interface Request {
      user: AuthUser; // Add the 'user' property of type AuthUser
    }
  }
}


