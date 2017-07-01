const cron = require('node-cron');
const Task = require('../models/task')
const server = require('../emails/email');
let html = '<html><body><a href = "https://www.npmjs.com/package/node-cron"> KLIKNIJ TU ABY ZOBACZYC MAGIE INTERNETU </a> </body> </html>';

cron.schedule('0 7 * * *', () => {

  server.sendmail(
    "rmrowiec@icloud.com",
    "Robert umie Cron i samo wysyla sie maile —tadam",
    html
  ),
  server.sendmail(
    "ziomal09bb@gmail.com",
    "Robert umie Cron i samo wysyla sie maile —tadam",
    html
  );
  // server.sendmail(
  //   "dh.lama@gmail.com",
  //   "Robert umie Cron i samo wysyla sie maile —tadam",
  //   html
  // ),
  // server.sendmail(
  //   "michal@surprise.design",
  //   "Robert umie Cron i samo wysyla sie maile —tadam",
  //   html
  // );

});

cron.schedule('0 8 * * *', () => {
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

      if (founded[i].endDate.getDate() != onlyDay && founded[i].endDate.getMonth() != onlyMonth){
        timetableArray.push(founded[i].title + " " + founded[i].description)
      }
    }
    server.sendmail(
      "rmrowiec@icloud.com",
      "Robert umie Cron i samo wysyla sie maile z taskami! —tadam",
      founded
    )
  });
});
