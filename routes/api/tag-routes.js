const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{model:Product}]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No category found!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model:Product}]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No category found!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag =  Tag.create({
      tag_name: req.body.tag_name
    });
    if(!newTag){
      res.status(404).json({message: `Failed to create a new tag!`});
      return;
    }
    res.status(200).json({message: `Successfully created new tag!`});
  } catch (err) {
    res.json(err);
  }
 

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: { id: req.params.id }
      });
    if (!updateTag) {
      res.status(404).json({ message: 'No tag to update!' });
      return;
    }
    res.status(200).json({message: 'Tag updated with new name!'});
  } catch (err) {
    res.json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!deleteTag) {
      res.status(404).json({ message: 'No tag to delete!' });
      return;
    }
    res.status(200).json({ message: 'Tag deleted!'});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
