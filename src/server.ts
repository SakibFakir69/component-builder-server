import mongoose from "mongoose";
import { Server } from "http";
import { server } from "."; // Must be exported from root file
import { exit } from "process";

const port = process.env.PORT;
const URI = process.env.MONGODB_URL;

let httpServer: Server;

(async () => {
    if (!URI) {
        console.error("Please provide MONGODB_URL");
        process.exit(1);
    }

    try {
        await mongoose.connect(URI);
        console.log("MongoDB connected");

        httpServer = server.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start:", error);
        process.exit(1);
    }
})();


// process is node js global object 


process.on("SIGINT", ()=>{
      console.log("Shutting down server gracefully...");

    httpServer.close(()=>{
        process.exit(0);
        // go out without show error
    })
    // for dev
    
})

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");

  httpServer.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });

//   for server
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
 httpServer.close(()=>{
     process.exit(1);
 })
});
