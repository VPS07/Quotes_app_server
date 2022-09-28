const express = require("express");
const router = express.Router();
const CrudData = require("../models/crudData");

// get all data
router.get("/", async (req, res) => {
  try {
    const data = await CrudData.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get data by id
router.get("/:id", getData, (req, res) => {
  res.json(res.foundData);
});

// create new data database
router.post("/", async (req, res) => {
  const data = new CrudData({
    name: req.body.name,
    quote: req.body.quote,
  });

  try {
    const newData = await data.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// editing data in database
router.patch("/:id", getData, async (req, res) => {
  if (req.body.name) {
    res.foundData.name = req.body.name;
  }
  if (req.body.quote) {
    res.foundData.quote = req.body.quote;
  }
  try {
    const updatedData = await res.foundData.save();
    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete data from database
router.delete("/:id", getData, async (req, res) => {
  try {
    await res.foundData.remove();
    res.json({ message: "Deleted data" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getData(req, res, next) {
  let foundData;
  try {
    foundData = await CrudData.findById(req.params.id);
    if (foundData == null) {
      return res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.foundData = foundData;
  next();
}

module.exports = router;
