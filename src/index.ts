import express, { Application } from "express";
import bodyParser from "body-parser";
import orderRoutes from "./routes/orderRoutes";

const app: Application = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", orderRoutes);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;