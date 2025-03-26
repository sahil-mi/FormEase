/**
|--------------------------------------------------
| express configuration settings
|--------------------------------------------------
*/

import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./routes/router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Use the router
app.use(router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
