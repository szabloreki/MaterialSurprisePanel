const Task = require ('../../models/task');
const User = require('../../models/user');

exports.changeResponsible = (req, res) => {

  User.findOne({"showName":req.body.responsible} , (err,foundedUser) => {
    if (err)
     	 return res.status(400).json({"error":err})

    const clientId = foundedUser._id;
    Task.find({"responsible":req.body.responsible}, (err,foundedTask) => {
      if (err)
     	  return res.status(400).json({"error":err})

      for (let i = 0; foundedTask.length > i ; i++){
        Task.findByIdAndUpdate(foundedTask[i]._id, {"responsible": clientId}, (err,response) => {
          if (err)
           	 return res.status(400).json({"error":err})

        })
      }
      res.status(200).json('Zmieniono pomyślnie')
    });
  })
};

/**
 * @api {get} /tasks/list/:id Get Tasks by user ID
 * @apiName Get Tasks by user ID
 * @apiGroup Task
 *
 *
 * @apiParam {String} id User id.
 *
 * @apiSuccess {String} Imię Imię.
 * @apiSuccess {String} information Ile łącznie.
 * @apiSuccess {String} information Ile na dziś.
 *
 * @apiError {String} error Error Message.
 */

exports.loggedUser = (req,res) => {
  let date = new Date();
  let onlyDay = date.getDate();
  let onlyMonth = date.getMonth();
  let list = [];
  let howMuchToday = 0 ;
  User.findById(req.params.userId,(err,foundedUser) => {
    if (err)
       return res.status(400).json({"error":err})

    let name = foundedUser.name;
    Task.find({"responsible":req.params.userId}, (err, foundedTask) => {
      if (err)
       	 return res.status(400).json({"error":err})

      let foundedTaskNumbers = foundedTask.length;
      for (let i=0; foundedTask.length > i; i++){
        if (foundedTask[i].endDate.getDate() == onlyDay && foundedTask[i].endDate.getMonth() == onlyMonth)
          howMuchToday = howMuchToday + 1;
      }
      list.push("Imię: " + name + " Ile łącznie: " + foundedTaskNumbers + " Ile na dziś: " + howMuchToday )
      res.status(200).json(list)
    })
  })
}

/**
 * @api {get} /tasks/date/date Get Daily Tasks
 * @apiName Get Daily Tasks
 * @apiGroup Task
 *
 *
 * @apiSuccess {String} _id Taask id.
 * @apiSuccess {String} title Task title.
 * @apiSuccess {String} description  Task description.
 * @apiSuccess {String} projectId  Task projectId.
 * @apiSuccess {Number} estimate  Task estimate.
 * @apiSuccess {Number} estimateResult  Task estimateResult.
 * @apiSuccess {String} responsible  Task responsible.
 * @apiSuccess {Boolean} status  Task status.
 * @apiSuccess {String} categoryId  Task categoryId.
 * @apiSuccess {Boolean} hidden  Task hidden.
 * @apiSuccess {Number} priority  Task priority.
 *
 *
 * @apiError {String} error Error Message.
 */

exports.date = (req,res) => {
  let date = new Date();
  let timetableArray = []
  let onlyDay = date.getDate();
  let onlyMonth = date.getMonth();
  Task.find({}, (err,founded) => {
    if (err)
     	 return res.status(400).json({"error":err})

    for (let i = 0; founded.length > i; i++){
      let foundedOnlyDate = founded[i].endDate.getDate();
      let foundedOnlyMonth = founded[i].endDate.getMonth();

      if (founded[i].endDate.getDate() == onlyDay && founded[i].endDate.getMonth() == onlyMonth){
        timetableArray.push(founded[i])
      }
    }
    res.status(200).json(timetableArray)
  })
}

exports.tomorrow = (req, res) => {
  let date = new Date()
  let timetableArrayTomorrow = []
  let onlyDay = date.getDate() + 1
  let onlyMonth = date.getMonth()
  Task.find({}, (err, founded) => {
    if (err)
     	 return res.status(400).json({"error":err})

    for (let i = 0; founded.length > i; i++) {
      if (founded[i].endDate.getDate() == onlyDay && founded[i].endDate.getMonth() == onlyMonth)
        timetableArrayTomorrow.push(founded[i])
    }
    res.status(200).json(timetableArrayTomorrow)
  })
}

exports.older = (req, res) => {
  let date = new Date()
  let timetableArrayOlder = []
  let onlyDay = date.getDate()
  let onlyMonth = date.getMonth()
  Task.find({}, (err, founded) => {
    if (err)
     	 return res.status(400).json({"error":err})

    for (let i = 0; founded.length > i; i++) {
      if (founded[i].endDate.getDate() < onlyDay && founded[i].endDate.getMonth() <= onlyMonth)
        timetableArrayOlder.push(founded[i])
    }
    res.status(200).json(timetableArrayOlder)
  })
}

/**
 * @api {get} /tasks Get Tasks
 * @apiName Get Tasks
 * @apiGroup Task
 *
 *
 * @apiSuccess {String} _id Task id.
 * @apiSuccess {String} title Task title.
 * @apiSuccess {String} description  Task description.
 * @apiSuccess {String} projectId  Task projectId.
 * @apiSuccess {Number} estimate  Task estimate.
 * @apiSuccess {Number} estimateResult  Task estimateResult.
 * @apiSuccess {String} responsible  Task responsible.
 * @apiSuccess {Boolean} status  Task status.
 * @apiSuccess {String} categoryId  Task categoryId.
 * @apiSuccess {Boolean} hidden  Task hidden.
 * @apiSuccess {Number} priority  Task priority.
 * @apiSuccess {Date} endDate  Task endDate.
 *
 *
 * @apiError {String} error Error Message.
 */

exports.get = (req,res) => {

  const TaskProjection = {
  __v: false,
  };

  Task.find({}, TaskProjection, (err,listOfTask) => {
    if (err)
      return res.status(400).json({"error": err});

    res.status(200).json(listOfTask.reverse())
  });
};

/**
 * @api {get} /tasks/:id  Get Task Info
 * @apiName Get Task Info
 * @apiGroup Task
 *
 * @apiParam {String} :id Task ID
 *
 * @apiSuccess {String} _id Task id.
 * @apiSuccess {String} title Task title.
 * @apiSuccess {String} description  Task description.
 * @apiSuccess {String} projectId  Task projectId.
 * @apiSuccess {Number} estimate  Task estimate.
 * @apiSuccess {Number} estimateResult  Task estimateResult.
 * @apiSuccess {String} responsible  Task responsible.
 * @apiSuccess {Boolean} status  Task status.
 * @apiSuccess {String} categoryId  Task categoryId.
 * @apiSuccess {Boolean} hidden  Task hidden.
 * @apiSuccess {Number} priority  Task priority.
 * @apiSuccess {Date} endDate  Task endDate.
 *
 *
 * @apiError {String} error Error Message.
 */

exports.info = (req,res) => {

  const TaskProjection = {
  _id: false,
  __v: false,
  };

  Task.findById(req.params.id, TaskProjection , (err, taskDetail) => {
    if (err)
      return res.status(400).json({"error":err})

    if (taskDetail == null )
      return res.status(400).json({"errorFind":"Nie znaleziono taska z takim ID"});

    res.status(200).json(taskDetail);
    });
}

/**
 * @api {get} /tasks/project/:projectId/category/:categoryId Get task Info by project and category ID
 * @apiName Get Task by project and category ID
 * @apiGroup Task
 *
 * @apiParam {String} :categoryId category ID
 * @apiParam {String} :projectId projects ID
 *
 * @apiSuccess {String} _id Task id.
 * @apiSuccess {String} title Task title.
 * @apiSuccess {String} description  Task description.
 * @apiSuccess {String} projectId  Task projectId.
 * @apiSuccess {Number} estimate  Task estimate.
 * @apiSuccess {Number} estimateResult  Task estimateResult.
 * @apiSuccess {String} responsible  Task responsible.
 * @apiSuccess {Boolean} status  Task status.
 * @apiSuccess {String} categoryId  Task categoryId.
 * @apiSuccess {Boolean} hidden  Task hidden.
 * @apiSuccess {Number} priority  Task priority.
 * @apiSuccess {Date} endDate  Task endDate.
 *
 *
 * @apiError {String} error Error Message.
 */

exports.catproj = (req,res) => {
  const TaskProjection = {
  categoryId: false,
  projectId: false,
  };

  Task.find({categoryId: req.params.categoryId, projectId: req.params.projectId}, TaskProjection , (err,founded) => {
    if (err)
     	 return res.status(400).json({"error":err})

    res.status(200).json(founded.sort(function(a, b){return a.endDate-b.endDate}))
  })
}
/**
 * @api {post} /tasks Add Task
 * @apiName Post Task
 * @apiGroup Task
 *
 *
 * @apiParam {String} _id Task id.
 * @apiParam {String} title Task title.
 * @apiParam {String} description  Task description.
 * @apiParam {String} projectId  Task projectId.
 * @apiParam {Number} estimate  Task estimate.
 * @apiParam {Number} estimateResult  Task estimateResult.
 * @apiParam {String} responsible  Task responsible.
 * @apiParam {Boolean} status  Task status.
 * @apiParam {String} categoryId  Task categoryId.
 * @apiParam {Boolean} hidden  Task hidden.
 * @apiParam {Number} priority  Task priority.
 * @apiParam {Date} endDate  Task endDate.
 *
 * @apiSuccess {String} information Dodano pomyślnie task.
 * @apiError {String} error Error Message.
 */

exports.add = (req,res) => {
  let tasksNumber;

  Task.find({projectId: req.body.projectId}, (err, foundedListOfTasks)=> {
    if (err)
      return res.status(400).json(err)

    tasksNumber = foundedListOfTasks.length +1;
    let task = new Task (req.body);
      if (req.body.endDate == null );
        task.endDate = new Date ();

      if (!req.body.title)
        return res.status(400).json("Nie dodano title")
      task.showName = req.body.title.substring(0,3) + "-" + tasksNumber;

      task.save((err) => {
        if (err)
          return res.status(400).json({"Error during saving : ": err})
        else
          return res.status(200).json({"information":"Dodano pomyślnie task", "task": task});
        });
      });
    };


/**
 * @api {delete} /tasks/:id  Task Delete
 * @apiName Delete Task
 * @apiGroup Task
 *
 * @apiParam {String} :id Task ID
 *
 * @apiSuccess {String} information Usunięto taska.
 *
 *
 * @apiError {String} error Error Message.
` */

exports.delete = (req,res) => {

    Task.findByIdAndRemove(req.params.id, (err,deletedTask) => {
      if (deletedTask == null)
        return res.status(400).json("Task z takim ID nie istnieje!")

      if (err)
        return res.status(400).json({"error":err})

      res.status(200).json("Usunięto taska")
    });
};

 /**
  * @api {put} /tasks/:id Task update
  * @apiName Put Task
  * @apiGroup Task
  *
  * @apiParam {String} id Task ID.
  *
  * @apiSuccess {String} title Task title.
  * @apiSuccess {String} description  Task description.
  * @apiSuccess {String} projectId  Task projectId.
  * @apiSuccess {String} responsible  Task responsible.
  * @apiSuccess {Boolean} status  Task status.
  * @apiSuccess {String} categoryId  Task categoryId.
  * @apiSuccess {Boolean} hidden  Task hidden.
  * @apiSuccess {Number} priority  Task priority.
  * @apiSuccess {Date} endDate  Task endDate.
  *
  *
  * @apiError {String} error Error Message.
  */

exports.update = (req,res) => {

  Task.findByIdAndUpdate(req.params.id, req.body, (err,updatedTask) => {
    if (err)
      return res.status(400).json({"error":err})

    if (updatedTask == null)
      return res.status(400).json({"errorID":"Task z takim ID nie istnieje!"})

    res.status(200).json("Zaktualizowano")
  })
}
