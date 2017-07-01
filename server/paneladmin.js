const app = require('./app');

app.set('port', 8013)

const server = app.listen( app.get('port'), (req,res) => {
    console.log("Serwer działa na porcie : " + app.get('port'));
});
