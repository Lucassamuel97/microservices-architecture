import dotenv from "dotenv"
import { setupDb } from "./infrastructure/repository/sequelize/setupDb";
import { listen } from "./infrastructure/api/server";


(async () => {
    dotenv.config();
    
    console.log("setting up database")
    await setupDb();

    console.log("listen starting webserver")
    listen();
})();