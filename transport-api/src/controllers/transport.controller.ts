import express, { Request, Response } from "express";
import { findTransportOptions } from "../services/transport.service";

const router = express.Router();

router.post("/search", async (req: Request, res: Response): Promise<void> => {
  const { departure, arrival, date } = req.body;

  if (!departure || !arrival || !date) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    const options = await findTransportOptions(departure, arrival, date);

    if (options.length === 0) {
      res.status(404).json({ message: "No transport options found" });
      return;
    }

    res.json({ results: options });
  } catch (error) {
    console.error("Error fetching transport options:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
