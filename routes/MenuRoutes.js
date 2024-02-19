const express = require("express");
const MenuItem = require("../models/Menu");
const router = express.Router();

router.post("/menuItem", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);

    // Save the new MenuItem asynchronously
    const savedMenuItem = await newMenuItem.save();

    console.log("Data saved successfully");
    res.status(200).json(savedMenuItem);
  } catch (error) {
    console.error("Error on saving data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/menuItem", async (req, res) => {
  try {
    const response = await MenuItem.find();
    console.log("Data Fetch Succefully");
    res.status(200).json(response);
    console.log(response);
  } catch (error) {
    console.error("Error on saving data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/menuItem/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
      const response = await MenuItem.find({ taste: tasteType });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Test Type" });
    }
  } catch (error) {
    console.error("Error on saving data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/menuItem/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const updatedMenuData = req.body;
    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ msg: "Menu Item did't Found" });
    }
    console.log("Menu Item  Update");
    res.status(200).json(response);
  } catch (error) {
    console.error("Error on saving data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.delete("/menuItem/:id", async (req, res) => {
  try {
    const deleteId = req.params.id;
    const response = await MenuItem.findByIdAndDelete(deleteId);

    if (!response) {
      return res.status(404).json({ msg: "Menu Item did't Found" });
    }
    console.log("Menu Item Delete Succesfully");
    res.status(200).json({ msg: "MenuItem Deleted Succesfully" });
  } catch (error) {
    console.error("Error on saving data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
