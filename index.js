import Server from "./server.js";
import "dotenv/config";

new Server(process.env.PORT, process.env.DATABASE).start()