const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // get all from model
  // then send it back to the user
  try {
    const categoryData = await Category.findAll({
      include:[{model:Product}]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No categories found!' });
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
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });
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

  try {
    const newCategory =  Category.create({
      category_name: req.body.category_name
    });
    if(!newCategory){
      res.status(404).json({message: `Failed to create a new category!`});
      return;
    }
    res.status(200).json({message: `Successfully created new category!`});
  } catch (err) {
    res.json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  // taking in an id as a parameter and also receiving a req.body
  // sequelize update
  // return a res.json 
  try {
    const updateCategory = Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: { id: req.params.id }
      })
    if (!updateCategory) {
      res.status(404).json({ message: 'No category to update!' });
      return;
    }
    res.status(200).json({message: 'Category updated with new name!'});
  } catch (err) {
    res.json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  // DESTROY
  // destroying based off the req.params.id
  // res.json to let the server
  try {
    const deleteCategory = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!deleteCategory) {
      res.status(404).json({ message: 'No category to delete!' });
      return;
    }
    res.status(200).json({ message: `Category has been removed!` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
