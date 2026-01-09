const express = require("express");
const CodeNote = require("../models/CodeNote");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* POST /api/notes */
router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title required" });
    }

    const note = await CodeNote.create({
      title,
      content: content || "",
      owner: req.userId
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/*GET /api/notes*/
router.get("/", auth, async (req, res) => {
  try {
    const notes = await CodeNote.find({ owner: req.userId }).sort({
      updatedAt: -1
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/*GET /api/notes/:id*/
router.get("/:id", auth, async (req, res) => {
  try {
    const note = await CodeNote.findOne({
      _id: req.params.id,
      owner: req.userId
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/*PUT /api/notes/:id*/
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await CodeNote.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { title, content, updatedAt: new Date() },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
