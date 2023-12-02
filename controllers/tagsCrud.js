const Tag = require('../schema/tags');

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createTag = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newTag = await Tag.create({
      name,
      description
    });
    res.status(201).json(newTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteAllTags = async (req, res) => {
  try {
    await Tag.deleteMany({});
    res.json({ message: 'All tags deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTagById = async (req, res) => {
  const tagId = req.params.id;
  try {
    const tag = await Tag.findById(tagId);
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTagById = async (req, res) => {
  const tagId = req.params.id;
  try {
    const updatedTag = await Tag.findByIdAndUpdate(tagId, req.body, { new: true });
    if (updatedTag) {
      res.json(updatedTag);
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTagById = async (req, res) => {
  const tagId = req.params.id;
  try {
    const deletedTag = await Tag.findByIdAndDelete(tagId);
    if (deletedTag) {
      res.json({ message: 'Tag deleted successfully' });
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllTags,
  createTag,
  deleteAllTags,
  getTagById,
  updateTagById,
  deleteTagById
};
