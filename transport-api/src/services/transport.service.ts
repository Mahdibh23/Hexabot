import { parseCSV } from "../utils/csvParser";
import path from "path";

const datasets = {
  bus: path.resolve(__dirname, "../datasets/bus.csv"),
  train: path.resolve(__dirname, "../datasets/train.csv"),
  louage: path.resolve(__dirname, "../datasets/louage.csv"),
  airplane: path.resolve(__dirname, "../datasets/avion.csv"),
};

export const findTransportOptions = async (
  departure: string,
  arrival: string,
  date: string
) => {
  const results: any[] = [];

  for (const [transportType, filePath] of Object.entries(datasets)) {
    try {
      const data = await parseCSV(filePath);

      const filteredData = data.filter((entry: any) => {
        // Ajuster le filtrage selon le type de dataset
        switch (transportType) {
          case "bus":
          case "train":
          case "airplane":
            return (
              entry["Departure Station"]?.toLowerCase() ===
                departure.toLowerCase() &&
              entry["Arrival Station"]?.toLowerCase() ===
                arrival.toLowerCase() &&
              entry["Departure Date"] === date
            );
          case "louage":
            return (
              entry["Route"]?.toLowerCase().includes(departure.toLowerCase()) &&
              entry["Route"]?.toLowerCase().includes(arrival.toLowerCase()) &&
              entry["Departure Date"] === date
            );
          default:
            return false;
        }
      });

      filteredData.forEach((item: any) => {
        results.push({ ...item, transportType });
      });
    } catch (error) {
      console.error(`Error parsing dataset for ${transportType}:`, error);
    }
  }

  return results;
};
