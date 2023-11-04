# E-Commerce Backend 
![License: MIT](https://img.shields.io/badge/MIT-blue.svg) 

## Description 

Connecting the e-commerce backend with Object Relational Mapping(ORM) 

Video Link: [https://drive.google.com/file/d/1RFDvR44DvPBsA_BkG9DubZg-jkxjFFZY/view](https://drive.google.com/file/d/1RFDvR44DvPBsA_BkG9DubZg-jkxjFFZY/view)

## Installation 

To start this project, have mySQL workbench and Insomnia installed and opened. Copy the 'schema' from the 'db' directory and paste the contents into the mySQL workbench. Then, press the lightning bolt to initiate the database and on the left side of the workbench window click the refresh button to see your database. Back to your CLI, enter 'node seeds/index' to populate your database. On Insomnia, test the get, post, put, and delete requests of /categories, /products, /tags.


## Sample ORM Code

```js
class Category extends Model {}

Category.init(
  {
    // define columns
    // id, category name
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);
```
Defining the class Category with the table names with the database link connection.

```js
// Products belongToMany Tags (through ProductTag)
// many to many relationships
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  }
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  }
});
```
Establishes a many to many relationship between the two classes referenced through a class and allowing duplicates through the unique property.

```js
 try {
    const categoryData = await Category.findAll({
      include:[{model:Product}]
    });
```
Retrieves multiple rows from a database table from Category with the associated data from Product.


```js
 try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{model:Category}, {model:Tag}]
    });
```
Retrieves a row from a database table from Product with the associated data from Category and Tag.

```js
try {
    const deleteTag = Tag.destroy({
      where: { id: req.params.id }
    });
```
Deletes a row from a database table from Tag by the requested id.

## Author Info 

#### Anthony Nguyen

* [https://github.com/Blackswan1010](https://github.com/Blackswan1010) 


## License

 https://api.github.com/licenses/MIT 
