const Project = require ('../../models/project');
const Task = require('../../models/task');
const Promise = require('promise');

/**
 * @api {get} /projects  Get Projects
 * @apiName Get Projects
 * @apiGroup Project
 *
 *
 * @apiSuccess {String} name Project name.
 * @apiSuccess {String} client Project client.
 * @apiSuccess {String} files Project files.
 * @apiSuccess {String} endDate Project endDate.
 * @apiSuccess {String} closeProjectDate Project closeProjectDate.
 * @apiSuccess {String} status Project status.
 * @apiSuccess {String} details Project details.
 * @apiSuccess {Number} key Project key.
 * @apiSuccess finances: {
   all,
   frontEnd,
   backEnd,
   hosting,
   graphic,
   frontEndAdmin,
   frontEndHtml
   }.
 * @apiSuccess brief: {
   name,
   description
   }.
 * @apiSuccess contacts: {
   date,
   title,
   description,
   },
   {
   date,
   title,
   description
   }.
 *
 *
 * @apiError {String} error Error Message.
 */

exports.get = (req,res) => {
  startFindProject().then( (info) =>{ //czym jest to info, nazwa funkcji? wartosci?
    res.json(info);
  })
};

let startFindProject = () =>  {
  return new Promise( (resolve, reject) => {
      let allRules;
      let a;
      let result = [];
      let status = 0;
      let hide = 0;

         Project.find((err,foundedProject) => {
            if (err)
              return res.status(400).json({"error":err})

            Task.find({}, (err, foundedTasks) => {

              connectProjectWithTasks(foundedProject.sort(function(a, b){
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1 }), foundedTasks)
                .then( (arrayTab) =>
                  resolve(arrayTab))
                })
            });
        });
  };
let connectProjectWithTasks = (projectList, tasksList) => {

  return new Promise( (resolve, reject) => {
    let returnObj = [];

      for(let i = 0; i < projectList.length; i++) {

        let newProjectObject = {};
        newProjectObject._id = projectList[i]._id;
        newProjectObject.name = projectList[i].name;
        newProjectObject.status = projectList[i].status;
        newProjectObject.contacts = projectList[i].contacts;
        newProjectObject.brief = projectList[i].brief;
        newProjectObject.files = projectList[i].files;
        newProjectObject.details = projectList[i].details;
        newProjectObject.finances = projectList[i].finances;
        newProjectObject.client = projectList[i].client;
        newProjectObject.users = projectList[i].users;
        newProjectObject.tasks = tasksList.filter(task => task.projectId == projectList[i]._id).length;
        newProjectObject.tasksDone = tasksList.filter(task => (task.projectId == projectList[i]._id) && task.status).length;
        newProjectObject.tasksHidden = tasksList.filter(task => (task.projectId == projectList[i]._id && task.hidden)).length;
        returnObj.push(newProjectObject)

        if(i == projectList.length -1)
          resolve(returnObj);
      }
  })
}

/**
 * @api {get} /projects/:id  Get Project Info
 * @apiName Get Project Info
 * @apiGroup Project
 *
 * @apiParam id Project ID.
 *
 * @apiSuccess {String} name Project name.
 * @apiSuccess {String} client Project client.
 * @apiSuccess {String} endDate Project endDate.
 * @apiSuccess {String} closeProjectDate Project closeProjectDate.
 * @apiSuccess {String} status Project status.
 * @apiSuccess files: {
   file,
   projectId
   }.
 * @apiSuccess {String} details Project details.
 * @apiSuccess {String} key Project key.
 * @apiSuccess finances: {
   all,
   frontEnd,
   backEnd,
   hosting,
   graphic,
   frontEndAdmin,
   frontEndHtml
   }.
 * @apiSuccess brief: {
   name,
   description
   }.
 * @apiSuccess contacts: {
   date,
   title,
   description,
   },
   {
   date,
   title,
   description
   }.
 *
 *
 * @apiError {String} error Error Message.
 */

exports.info = (req,res) => {
  Project.findById(req.params.id, (err,founded) => {
    if (err)
     	 return res.status(400).json({"error":err})

    res.status(200).json(founded)
  })
};

exports.userId = (req, res) => {
  Project.find({userId: req.params.userId}, (err,founded) => {
    if (err)
     	 return res.status(400).json({"error":err})

    res.status(200).json(founded)
  })
}

/**
 * @api {post} /projects Add Projects
 * @apiName Add Projects
 * @apiGroup Project
 *
 * @apiParam {String} name Project name.
 * @apiParam {String} client Project client.
 * @apiParam {String} endDate Project endDate.
 * @apiParam {String} closeProjectDate Project closeProjectDate.
 * @apiParam {String} status Project status.
 * @apiParam {String} details Project details.
 * @apiParam {String} key Project key.
 * @apiParam finances: {
   all,
   frontEnd,
   backEnd,
   hosting,
   graphic,
   frontEndAdmin,
   frontEndHtml
   }.
 * @apiParam brief: {
   name,
   description
   }.
 * @apiParam contacts: {
   date,
   title,
   description,
   },
   {
   date,
   title,
   description
   }.
 *
 * @apiSuccess {String} information Dodano pomyślnie projekt.
 *
 * @apiError {String} error Error Message.
 */

exports.add = (req, res) => {
  let project = new Project(req.body)
  project.save((err) => {
    if (err)
      return res.status(400).json({"Error during saving : ": err})

    res.status(200).json({"information":"Dodano pomyślnie projekt", "Project": project})

  })
}

/**
 * @api {delete} /projects/:id Delete Project
 * @apiName Delete Project
 * @apiGroup Project
 *
 * @apiParam {String} :id Project id.
 *
 * @apiSuccess {String} information Usunięto projekt.
 *
 * @apiError {String} error Error Message.
 */


exports.delete = (req,res) => {

    Project.findByIdAndRemove(req.params.id, (err,deletedProject) => {
      if (deletedProject == null)
        return res.status(400).json("Projekt z takim ID nie istnieje!")

      if (err)
        return res.status(400).json({"error":err})

      res.status(200).json("Usunięto projekt")
    });
};

/**
 * @api {put} /projects/:id Put Project
 * @apiName Put Project
 * @apiGroup Project
 *
 * @apiParam {String} name Project name.
 * @apiParam {String} client Project client.
 * @apiParam {String} endDate Project endDate.
 * @apiParam {String} closeProjectDate Project closeProjectDate.
 * @apiParam {String} status Project status.
 * @apiParam {String} details Project details.
 * @apiParam {String} key Project key.
 * @apiParam finances: {
   all,
   frontEnd,
   backEnd,
   hosting,
   graphic,
   frontEndAdmin,
   frontEndHtml
   }.
 * @apiParam brief: {
   name,
   description
   }.
 * @apiParam contacts: {
   date,
   title,
   description,
   },
   {
   date,
   title,
   description
   }.
 *
 * @apiSuccess {String} information Zaktualizowano.
 *
 * @apiError {String} error Error Message.
 */

exports.update = (req,res) => {

  Project.findByIdAndUpdate(req.params.id, req.body, (err,updatedProject) => {
    if (err)
      return res.status(400).json({"error":err})

    if (updatedProject == null)
      return res.status(400).json({"errorID":"Projekt z takim ID nie istnieje!"})

    res.status(200).json("Zaktualizowano")
  })
}
