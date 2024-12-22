import app from "./app";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
