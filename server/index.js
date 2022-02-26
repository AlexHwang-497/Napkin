import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import portfolioRoutes from "./routes/portfolio.js";
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors({origin: 'http://localhost:3000'}))

app.use(
  cors({
    origin: [
      "https://portfoliobuildertool.herokuapp.com",
      "http://localhost:3000",
    ],
  })
);
// app.use(cors({origin: ['http://localhost:3000']}))

app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/portfolio", portfolioRoutes);

app.get("/", (req, res) => {
  res.send("Hello to memories API");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )

  .catch((error) => console.log(`${error} did not connect`));
