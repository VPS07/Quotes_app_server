require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const crudappRouter = require("./routes/crudapp");
const port = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_URL)
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

app.use("/crudapp", crudappRouter);

app.get("/", (req, res) => {
  res.send("");
});

app.listen(port, () => {
  //console.log("Server is running http://localhost:5000");
});
