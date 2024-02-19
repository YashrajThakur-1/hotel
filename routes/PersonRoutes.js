const express = require("express");
const Person = require("../models/personSchema");
const router = express.Router();

router.post("/person", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);

    // Save the new person asynchronously
    const savedPerson = await newPerson.save();

    console.log("Data saved successfully");
    res.status(200).json(savedPerson);
  } catch (error) {
    console.error("Error on saving data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/person", async (req, res) => {
  try {
    const response = await Person.find();
    console.log("Data Fetch Succefully", response);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error on saving data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/person/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work Type" });
    }
  } catch (error) {
    console.error("Error on saving data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/person/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "User Not Found" });
    }

    console.log("data Updated");
    res.status(200).json(response);
  } catch (error) {
    console.error("Error on saving data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/person/:id", async (req, res) => {
  try {
    const deleteId = req.params.id;
    const response = await Person.findByIdAndDelete(deleteId);

    if (!response) {
      return res.status(404).json({ error: "User Not Found" });
    }
    console.log("Person Deleted Successfully");
    res.status(200).json({ message: "person Deleted Succesfully" });
  } catch (error) {
    console.error("Error on saving data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
