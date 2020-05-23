const express = require('express');
const app = express();

const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://f27b22eef6d9494ebc94eb76cc152f49@o397039.ingest.sentry.io/5251201' });

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'hbs');

app.use(express.static('./views/images'));

var hbs = require('hbs');
var fs = require('fs');

var partialsDir = __dirname + '/views/partials';

var filenames = fs.readdirSync(partialsDir);

filenames.forEach(function (filename) {
  var matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  var name = matches[1];
  var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
  hbs.registerPartial(name, template);
});

const mainRoutes = require('./routes');
const subcategoryRoutes = require('./routes/subcategorypage');
const productRoutes = require('./routes/productdetailpage');

app.use(mainRoutes);
app.use(subcategoryRoutes);
app.use(productRoutes);


app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});

module.exports = app; // for testing