const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // get all from model
  // then send it back to the user
  try {
    const categoryData = await Category.findAll();
    if (!categoryData) {
      res.status(404).json({ message: 'No category found!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  // specify by ID
  // get one category
  // some req.param.nonsense
  // send it back to the user
  try {
    const categoryData = await Category.findByPk(req.params.id);
    if (!categoryData) {
      res.status(404).json({ message: 'No category found!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new category
  // get the body and get the contents and insert into sequelize
  // category(DOT) create
  // return it back as res.json


});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  // taking in an id as a parameter and also receiving a req.body
  // sequelize update
  // return a res.json

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  // DESTROY
  // destroying based off the req.params.id
  // res.json to let the server
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found!' });
      return;
    }
    res.status(200).json({message: `Item ${req.params.id} has been removed!`});
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
