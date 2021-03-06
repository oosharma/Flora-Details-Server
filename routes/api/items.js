const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
// Item Model

const Item = require("../../models/Item");

// @route GET api/items
// @desc GET All items
// @access public
router.get("/", (req, res) => {
  Item.find()
    .sort({ createdAt: -1 })
    .then(items => res.json(items));
});

// @route POST api/items
// @desc Create A Post
// @access private

router.post("/", (req, res) => {
  commonName = req.body.commonName;
  Item.findOne({ commonName }).then(item => {
    if (item) return res.status(400).json({ msg: "Item already exists" });

    const newItem = new Item({
      commonName: req.body.commonName,
      bloomTime: req.body.bloomTime,
      plantType: req.body.plantType,
      appropriateLocation: req.body.appropriateLocation,
      waterNeeds: req.body.waterNeeds,
      sizeAtMaturity: req.body.sizeAtMaturity,
      suitableSiteConditions: req.body.suitableSiteConditions
    });
    newItem.save().then(item => res.json(item));
  });
});

// @route DELETE api/items/:id
// @desc Delete An Item
// @access private
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
