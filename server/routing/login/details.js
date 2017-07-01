const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const server = require('../../emails/email');
const secret = require('../../token/sekret');
const crypto = require ('crypto');
const passwordHash = require('password-hash');

/**
 * @api {post} /login Request Login
 * @apiName Post Login
 * @apiGroup Login
 *
 * @apiParam {String} email Your email
 * @apiParam {String} password Your password
 *
 * @apiSuccess {String} text Zalogowano pomyślnie.
 *
 * @apiError {String} error Error Message.
 */

exports.login = (req,res) => {
  User.findOne({email: req.body.email}, (err,findedUser) => {
    if (findedUser == null)
      return res.status(400).json({"notExist":"Account with this email does not exist!"})
    else
    {
      const hashedPassword = findedUser.password;
        if (passwordHash.verify(req.body.password, hashedPassword)){
          const token = jwt.sign({foo: 'bar'}, secret.secretToken, {expiresIn : '1h'});
          return res.status(200).json({"text": "Zalogowano pomyślnie ", "token": token, "user": findedUser});
        };
        res.status(400).json({"invalid":"Niepoprawny email lub hasło"})
    }
  });
};


/**
 * @api {post} /login/forgot Request Forgot
 * @apiName Post Forgot
 * @apiGroup Login
 *
 * @apiParam {String} email Your email
 *
 * @apiSuccess {String} info Sprawdź swojego maila!
 *
 * @apiError {String} error Error Message.
 */


exports.forgot = (req,res) => {
  key = crypto.randomBytes(18).toString('hex')
  User.findOneAndUpdate({email: req.body.email}, {recoveryKey: key} , (err, user) => {
    if(err)
      return res.status(400).json({"error":err})

    if (user == null )
      return res.status(400).json({"errors":"User with specific email does not exist"})

    let mail = req.body.email;
    let email = "<html> <a href = 'hosting.suprice.today:8014/api/login/change/" + key + "'>Click here for change password! </a></html>" ;
    server.sendmail(mail, "Change password", email).then(function (message) {
      if (!message)
        return res.status(400).json({ "Error": message });

        res.status(200).json({"info":"Sprawdź swojego maila!"})
      });
  });
};

/**
 * @api {put} /login/change Request Change
 * @apiName Put Change
 * @apiGroup Login
 *
 * @apiParam {String} password Your new password
 *
 * @apiSuccess {String} info Hasło zostało zmienione
 *
 * @apiError {String} error Error Message.
 */

exports.change = (req,res) => {
  req.body.password = passwordHash.generate(req.body.password)
  req.body.recoveryKey = crypto.randomBytes(5).toString('hex');
  User.findOneAndUpdate({recoveryKey:req.params.recoveryKey}, req.body, (err,findedUser) => {
    if (err)
      return res.status(400).json({"Error": err})

    if(findedUser == null)
      return res.status(400).json("Nieprawidłowy klucz odzyskiwania, może już zmieniłeś hasło ?")
    else
    {
      if (findedUser.recoveryKey != req.params.recoveryKey)
        return res.status(400).json("Nieprawidłowy klucz odzyskiwania, może już zmieniłeś hasło ?")

      pass = req.body.password;
      res.status(200).json("Hasło zostało zmienione")
    };
  });
};
