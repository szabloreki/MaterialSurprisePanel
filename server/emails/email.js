const email = require('emailjs');
const Promise = require('promise');
const server = email.server.connect({
    user: "robert@suprice.today",
    password: "XHPp3CzP",
    host: "mail.suprice.today",
    tls: true,
  });

exports.sendmail = (getTo, getSubject, getData) => {
  return new Promise ((resolve, reject) => {
    server.send(
      {
        text:"",
        from: "<robert@suprice.today>",
        to: getTo,
        subject: getSubject,
        attachment:
        [
          {data: getData, alternative:true},
        ]
      },
      (errors,sended) => {
        if (errors)
          reject(errors)

        resolve(true)
      }
    );
  });
}
