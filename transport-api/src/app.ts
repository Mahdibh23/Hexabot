import express, { Application } from "express";
import bodyParser from "body-parser";
import transportRoutes from "./controllers/transport.controller";

const app: Application = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/transport", transportRoutes);

export default app;
