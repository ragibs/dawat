require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5050;
app.use(cors());

//initial get request
app.get("/", (_req, res) => {
  res.send("Welcome to my API");
});

//routes
app.use("/listing", listingRoutes);
app.use("/reservation", reservationRoutes);
app.use("/user", userRoutes);

//app listen
app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
