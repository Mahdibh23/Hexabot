"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTransportOptions = void 0;
const csvParser_1 = require("../utils/csvParser");
const path_1 = __importDefault(require("path"));
const datasets = {
    bus: path_1.default.resolve(__dirname, "../datasets/bus.csv"),
    train: path_1.default.resolve(__dirname, "../datasets/train.csv"),
    louage: path_1.default.resolve(__dirname, "../datasets/louage.csv"),
    airplane: path_1.default.resolve(__dirname, "../datasets/avion.csv"),
};
const findTransportOptions = async (departure, arrival, date) => {
    const results = [];
    for (const [transportType, filePath] of Object.entries(datasets)) {
        try {
            const data = await (0, csvParser_1.parseCSV)(filePath);
            const filteredData = data.filter((entry) => {
                // Ajuster le filtrage selon le type de dataset
                switch (transportType) {
                    case "bus":
                    case "train":
                    case "airplane":
                        return (entry["Departure Station"]?.toLowerCase() ===
                            departure.toLowerCase() &&
                            entry["Arrival Station"]?.toLowerCase() ===
                                arrival.toLowerCase() &&
                            entry["Departure Date"] === date);
                    case "louage":
                        return (entry["Route"]?.toLowerCase().includes(departure.toLowerCase()) &&
                            entry["Route"]?.toLowerCase().includes(arrival.toLowerCase()) &&
                            entry["Departure Date"] === date);
                    default:
                        return false;
                }
            });
            filteredData.forEach((item) => {
                results.push({ ...item, transportType });
            });
        }
        catch (error) {
            console.error(`Error parsing dataset for ${transportType}:`, error);
        }
    }
    return results;
};
exports.findTransportOptions = findTransportOptions;
