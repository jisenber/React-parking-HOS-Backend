const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const invaderRoutes = require('./route/invader-routes.js');
const loadRoutes = require('./route/db-load-routes.js');
const carRoutes = require('./route/car-routes.js');
const searchRoutes = require('./route/search-routes.js');
const authRoutes = require('./route/auth-routes.js');
const errorMiddleWare = require('./lib/error.js');
const User = require('./model/user');
const cors = require('cors');
//const nunjucks = require('nunjucks');
const LocalStrategy = require('passport-local').Strategy;
//const flash = require('connect-flash');
//const expressSession = require('express-session');
//const MongoStore = require('connect-mongo')(expressSession);


let app = express();
let PORT = process.env.PORT || 4200;

//define monogo and connect it.
let MONGODB_URI =  process.env.MONGODB_URI || 'mongodb://localhost/invaders';

mongoose.connect(MONGODB_URI);
mongoose.Promise = Promise;

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//mouting routes and middlware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(expressSession({
//   secret: process.env.EXPRESS_SES_SECRET || 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
//   store: new MongoStore({ mongooseConnection: mongoose.connection })
// }));

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
app.use(cors());
app.use(errorMiddleWare);
app.use(authRoutes);
app.use(loadRoutes);
app.use(invaderRoutes);
app.use(carRoutes);
app.use(searchRoutes);

app.listen(PORT, function() {
  console.log('Listening on port: ', PORT);
});
