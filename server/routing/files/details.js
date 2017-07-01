const Files = require('../../models/file');
const Project = require('../../models/project');


/**
 * @api {get} /files Get Files
 * @apiName Get Files
 * @apiGroup Files
 *
 *
 * @apiParam {String} file Files file.
 * @apiParam {String} name Files name.
 * @apiParam {String} projectId Files projectId.
 *
 * @apiError {String} error Error Message.
 */

exports.get = (req,res) => {
  Files.find((err,foundedFiles) => {
    if (err)
     	 return res.status(400).json({"error":err})

    res.status(200).json(foundedFiles)
  });
};


/**
 * @api {post} /files Add Files
 * @apiName Add Files
 * @apiGroup Files
 *
 *
 * @apiParam {String} file Files file.
 * @apiParam {String} name Files name.
 * @apiParam {String} projectId Files projectId.
 *
 * @apiError {String} error Error Message.
 */

exports.post = (req,res) => {
  if (req.body.projectId == undefined || req.body.projectId == null){
    return res.status(400).json("Nie wysłano projectId")
  }
  if (req.file == undefined)
    return res.status(400).json("Nie wysłano pliku!")
  let files = new Files (req.body)
  let file = {};
  file.file = req.file.filename;
  file.name = req.body.name;
  files.fieldname = req.body.name;
  files.save()

    Project.findByIdAndUpdate(req.body.projectId, {$push: {"files": file}}, (err,founded) => {
      if (err)
       	 return res.status(400).json({"error":err})

      res.status(200).json("dodałem?")
    })
};

/**
 * @api {delete} /files/:id Delete Files
 * @apiName Delete Files
 * @apiGroup Files
 *
 *
 * @apiParam {String} :id Files ID.
 *
 * @apiSuccess {String} information Usunięto.
 *
 * @apiError {String} error Error Message.
 */
exports.delete = (req,res) => {
  Files.findByIdAndRemove(req.params.id, (err, founded) => {
    if (err)
      return res.status(400).json({"error": err})

    if(founded == null)
      return res.status(400).json({"error":"Nie znaleziono pliku z takim ID"})

    res.status(200).json({"information":"Usunięto"});
  });
};
