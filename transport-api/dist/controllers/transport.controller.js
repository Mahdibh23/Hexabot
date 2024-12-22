"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transport_service_1 = require("../services/transport.service");
const router = express_1.default.Router();
router.post("/search", async (req, res) => {
    const { departure, arrival, date } = req.body;
    if (!departure || !arrival || !date) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }
    try {
        const options = await (0, transport_service_1.findTransportOptions)(departure, arrival, date);
        if (options.length === 0) {
            res.status(404).json({ message: "No transport options found" });
            return;
        }
        res.json({ results: options });
    }
    catch (error) {
        console.error("Error fetching transport options:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = router;
