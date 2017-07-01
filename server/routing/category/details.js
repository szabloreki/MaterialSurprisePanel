 const Category = require ('../../models/category');


/**
 * @api {get} /categories Get Categories
 * @apiName Get Categories
 * @apiGroup Category
 *
 *
 * @apiSuccess {String} _id Category id.
 * @apiSuccess {String} title Category title.
 * @apiSuccess {String} description Category description.
 * @apiSuccess {String} projectId Category projectId.
 *
 *
 * @apiError {String} error Error Message.
 */


exports.get = (req,res) => {
  const CategoryProjection = {
  __v: false,
  };

  Category.find({}, CategoryProjection, (err,listOfCategory) => {
    if (err)
      return res.status(400).json({"error": err});

    res.status(200).json(listOfCategory.reverse())
  });
};

/**
 * @api {get} /categories/project/:projectId Get Project by Categories
 * @apiName Get Project Categories
 * @apiGroup Category
 *
 * @apiParam {String} projectId projectId.
 *
 * @apiSuccess {String} title Category title.
 * @apiSuccess {String} description Category description.
 * @apiSuccess {String} projectId Category projectId.
 *
 *
 * @apiError {String} error Error Message.
 */

exports.projectId = (req,res) => {

  Category.find({projectId: req.params.projectId}, (err, founded) => {
    if (err)
     	 return res.status(400).json({"error":err})

    res.status(200).json(founded)
  });
};

/**
 * @api {get} /categories/:id Get Category Info
 * @apiName Get Category Info
 * @apiGroup Category
 *
 * @apiParam {String} _id Category id.
 *
 * @apiSuccess {String} title Category title.
 * @apiSuccess {String} description  Category description.
 * @apiSuccess {String} projectId  Category projectId.
 *
 *
 * @apiError {String} error Error Message.
 */

exports.info = (req,res) => {

  const CategoryProjection = {
  __v: false,
  };

  Category.findById(req.params.id, CategoryProjection , (err, categoryDetail) => {
    if (err)
      return res.status(400).json({"error":err})

    if (categoryDetail == null )
      return res.status(400).json({"errorFind":"Kategoria z takim ID nie istnieje"});

    res.status(200).json(categoryDetail);
    });
}

/**
 * @api {post} /categories Add Categories
 * @apiName Post Categories
 * @apiGroup Category
 *
 * @apiParam {String} title Category title.
 * @apiParam {String} description Category description.
 * @apiParam {String} projectId Category projectId.
 *
 * @apiSuccess {String} information Dodano pomyślnie kategorię.
 *
 *
 * @apiError {String} error Error Message.
 */


exports.add = (req,res) => {

  let category = new Category (req.body);

      category.save((err) => {
        if (err)
          return res.status(400).json({"Error during saving : ": err})
        else
          return res.status(200).json({"category":category,"informacja":"Dodano pomyślnie kategorię"});

      });
    };

/**
 * @api {delete} /categories/:id Category Delete
 * @apiName Get Categories Delete
 * @apiGroup Category
 *
 * @apiParam {String} :id Category id.
 *
 * @apiSuccess {String} information Usunięto kategorię.
 *
 * @apiError {String} error Error Message.
   */

exports.delete = (req,res) => {

    Category.findByIdAndRemove(req.params.id, (err,deletedCategory) => {
      if (deletedCategory == null)
        return res.status(400).json("Kategoria z takim ID nie istnieje!")

      if (err)
        return res.status(400).json({"error":err})

      res.status(200).json("Usunięto kategorię")
    });
};

/**
 * @api {put} /categories Update Category
 * @apiName Put Category
 * @apiGroup Category
 *
 * @apiParam {String} id Category id.
 *
 * @apiSuccess {String} title Category title.
 * @apiSuccess {String} description  Category description.
 * @apiSuccess {String} projectId  Category projectId.
 *
 *
 * @apiError {String} error Error Message.
 */

exports.update = (req,res) => {

  Category.findByIdAndUpdate(req.params.id, req.body, (err,updatedCategory) => {
    if (err)
      return res.status(400).json({"error":err})

    if (updatedCategory == null)
      return res.status(400).json({"errorID":"Kategoria z takim ID nie istnieje!"})

    res.status(200).json("Zaktualizowano")
  })
}
