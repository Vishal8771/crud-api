const express = require("express");
const connectDB = require("./db");
const cors = require("cors");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", require("./routes/route"));





app.get("/", (req, res) => {
  res.send("Server is running");
});



const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});