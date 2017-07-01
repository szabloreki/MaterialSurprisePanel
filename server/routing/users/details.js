const User = require('../../models/user');
const crypto = require ('crypto');
const server = require('../../emails/email')
const passwordHash = require('password-hash');

/**
 * @api {get} /users Get Users
 * @apiName Get Users Table
 * @apiGroup Users
 *
 *
 * @apiSuccess {String} email Users email address.
 * @apiSuccess {String} showName  Users showName.
 * @apiSuccess {String} name  Users name.
 * @apiSuccess {String} recoveryKey  Users recoveryKey.
 *
 *
 * @apiError {String} error Error Message.
 */

exports.get = (req,res) => {
  const usersProjection = {
    __v: false,
    password: false,
  };

  User.find({},usersProjection, (err,listOfUsers) => {
    if (err)
      return res.status(400).json({"error":"Nie udało sie pobrac użytkowników"});

    res.status(200).json(listOfUsers.reverse());
  });
};

/**
 * @api {get} /users/:id Get User Information
 * @apiName Get User Information
 * @apiGroup Users
 *
 * @apiParam {String} :id Registered User ID
 *
 * @apiSuccess {String} email Users email address.
 * @apiSuccess {String} password  Users password.
 * @apiSuccess {String} recoveryKey  Users recoveryKey.
 * @apiSuccess {String} showName  Users showName.
 * @apiSuccess {String} name  Users name.
 *
 * @apiError {String} error Error Message.
 */

exports.info = (req,res) => {

  const usersProjection = {
  _id: false,
  __v: false,
};

    User.findById(req.params.id, usersProjection, (err, UserDetail) => {
      if (err)
        return res.status(400).json({"error": err});

      if (UserDetail == null )
        return res.status(400).json({"error":"Nie udało sie znaleźć użytkownika z takim ID"});

      res.status(200).json(UserDetail);
    });
};

/**
 * @api {post} /users Add Users
 * @apiName Add Users
 * @apiGroup Users
 *
 *
 * @apiParam {String} email Users email address.
 * @apiParam {String} password  Users password.
 * @apiParam {String} showName  Users showName.
 * @apiParam {String} name  Users name.
 *
 * @apiSuccess {String} information Zapisano pomyślnie.
 *
 * @apiError {String} error Error Message.
 */


exports.add = (req,res) => {

  req.checkBody('password', "Invalid password!").isLength({min:3, max: 120});
  req.checkBody('email', "Invalid address email!").isEmail();

  const errors = req.validationErrors();

  if (errors)
    return res.status(400).json({"error": errors})

  let user = new User (req.body);
  let pass = user.password;
  User.findOne({email: req.body.email}, (err,finded) => {
    if (finded != null)
      return res.status(400).send({"errorUserExist": "Ten email jest już zajęty"})

    if (user.email == user.password)
      return res.status(400).json({"passwordError":"Hasło nie moze byc takie samo jak email!"});

    let hashedPassword = passwordHash.generate(req.body.password)
    user.password = hashedPassword;

    user.save((err) => {
      if (err)
        return res.status(400).json({"Błąd podczas zapisywania : ": err})
      else {

        let emailadd = req.body.email;
        let passwd = req.body.password;
        let loginInfo = "<html> Dzien dobry, oto Twoje dane do logowania: <br>" + "Email : " + emailadd + "<br>" + "Hasło: " + passwd + "</html>";
        server.sendmail(emailadd, "Dane do logowania", loginInfo ).then(function (message) {
          if (!message)
            return res.status(400).json({ "Error": message });

            res.status(200).json({"User":user,"information":"Zapisano pomyślnie "});
        });
      };
    });
  });
};


/**
 * @api {delete} /users/:id Delete Users
 * @apiName Delete User
 * @apiGroup Users
 *
 *
 * @apiParam {String} :id User ID.
 *
 * @apiSuccess {String} information Pomyślnie usunięto
 *
 * @apiError {String} error Error Message.
 */

exports.delete = (req,res) => {

  User.findByIdAndRemove(req.params.id, (err,deleted) => {
    if (deleted == null)
      return res.status(400).json({"error":"Nie udało sie znaleźć użytkownika z takim ID"});

    if (err)
      return res.status(400).json({"error": err});

    res.status(200).json("Pomyślnie usunięto");

  })
}

/**
 * @api {put} /users/:id Request Users update
 * @apiName Put User
 * @apiGroup Users
 *
 * @apiParam {String} :id User ID.
 *
 * @apiParam {String} email Users email address.
 * @apiParam {String} password  Users password.
 * @apiParam {String} showName  Users showName.
 * @apiParam {String} name  Users name.
 *
 * @apiSuccess {String} informacja Zaktualizowano pomyślnie.

 * @apiError {String} error Error Message.
 */

exports.update = (req,res) => {

  if (req.body.password != null && req.body.password != "")
    req.body.password = passwordHash.generate(req.body.password)

  if (req.body.password == "")
    delete req.body.password;

  if (req.body._id)
    delete req.body._id;

  User.findByIdAndUpdate(req.params.id, req.body, (err,updatedUser) => {
    if (err)
      return res.status(400).json({"error":err})

    if (updatedUser == null)
      return res.status(400).json({"errorID":"Nie udało sie znaleźć użytkownika z takim ID"})

    res.status(200).json("Zaktualizowano pomyślnie")
  })
};
