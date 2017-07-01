const Client = require ('../../models/client');


/**
 * @api {get} /clients Get Clients
 * @apiName Get Clients
 * @apiGroup Client
 *
 *
 * @apiSuccess {String} _id Client id.
 * @apiSuccess {String} name Client name.
 * @apiSuccess {String} details  Client details.
 * @apiSuccess {Number} responsible  Client responsible.
 * @apiSuccess {Number} key  Client key.
 *
 *
 * @apiError {String} error Error Message.
 */

exports.get = (req,res) => {

  const ClientProjection = {
  __v: false,
  };

  Client.find({}, ClientProjection, (err,listOfClient) => {
    if (err)
      return res.status(400).json({"error": err});

    res.status(200).json(listOfClient.reverse())
  });
};

/**
 * @api {get} /clients/:id Get Client Info
 * @apiName Get Client Info
 * @apiGroup Client
 *
 * @apiParam {String} :id Client ID
 *
 * @apiSuccess {String} name Client name.
 * @apiSuccess {String} details  Client details.
 * @apiSuccess {Number} responsible  Client responsible.
 * @apiSuccess {Number} key  Client key.
 *
 *
 * @apiError {String} error Error Message.
 */

exports.info = (req,res) => {

  const ClientProjection = {
  _id: false,
  __v: false,
  };

  Client.findById(req.params.id, ClientProjection , (err, clientDetail) => {
    if (err)
      return res.status(400).json({"error":err})

    if (clientDetail == null )
      return res.status(400).json({"errorFind":"Nie znaleziono klienta z takim ID"});

    res.status(200).json(clientDetail);
    });
};

/**
 * @api {post} /clients Add Clients
 * @apiName Post Clients
 * @apiGroup Client
 *
 * @apiParam {String} name Client name.
 * @apiParam {String} details Client details.
 * @apiParam {Number} responsible Client responsible.
 * @apiParam {Number} key Client key.
 *
 * @apiSuccess {String} information Dodano pomyślnie klienta.
 *
 *
 * @apiError {String} error Error Message.
 */

exports.add = (req,res) => {

  let client = new Client (req.body);

      client.save((err) => {
        if (err)
          return res.status(400).json({"Error during saving : ": err})
        else
          return res.status(200).json({"information":"Dodano pomyślnie klienta", "Client": client});

      });
    };

/**
 * @api {delete} /clients/:id Delete Client
 * @apiName Delete Client
 * @apiGroup Client
 *
 * @apiParam {String} :id  Client id.
 *
 * @apiSuccess {String} information Usunięto klienta.
 *
 * @apiError {String} error Error Message.
 */

exports.delete = (req,res) => {

    Client.findByIdAndRemove(req.params.id, (err,deletedClient) => {
      if (deletedClient == null)
        return res.status(400).json("Klient z takim ID nie istnieje!")

      if (err)
        return res.status(400).json({"error":err})

      res.status(200).json("Usunięto klienta")
    });
};

/**
 * @api {put} /clients/:id Update Client
 * @apiName Update Client
 * @apiGroup Client
 *
 * @apiParam {String} name Client name.
 * @apiParam {String} details  Client details.
 * @apiParam {Number} responsible  Client responsible.
 * @apiParam {Number} key  Client key.
 *
 * @apiSuccess {String} information Zaktualizowano
 *
 * @apiError {String} error Error Message.
 */
exports.update = (req,res) => {

  Client.findByIdAndUpdate(req.params.id, req.body, (err,updatedClient) => {
    if (err)
      return res.status(400).json({"error":err})

    if (updatedClient == null)
      return res.status(400).json({"errorID":"Klient z takim ID nie istnieje!"})

    res.status(200).json("Zaktualizowano")
  })
}
