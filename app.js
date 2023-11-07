const express = require(`express`);
const app = express();

app.use(express.static(`public`));

app.get(`/hola`, function(request, response) {
    response.send({message: 'hola'});
});

app.listen(8000, function() {
    console.log('server is up and running!!!');
});