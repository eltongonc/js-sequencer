const express = require('express');
const path = require('path');
const livereload = require('livereload');

const server = livereload.createServer();
const app = express();

const port =  process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'development';
const publicDir = path.join(__dirname, 'public');

app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

server.watch(publicDir);

// view engine setup
app.use(express.static(publicDir));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err,
        title: 'error'
    });
});


app.listen(port, function() {
  console.log('Express server listening on port ' + this.address().port);
});
