import mongoose from "mongoose";
import { Server } from "http";
import { server } from "."; // Must be exported from root file

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
