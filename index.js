import ExpressServer from "./server.js";
import "dotenv/config";

new ExpressServer(process.env.PORT, process.env.DATABASE).start()