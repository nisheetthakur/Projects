
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const static = express.static(__dirname + '/public');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const configRoutes = require('./routes');


const handlebarInstance = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        asJSON: (obj, spacing) => {
            if(typeof spacing == 'number') 
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing))

            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    }
});

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/public', static);
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());   

// view engine
app.engine('handlebars', handlebarInstance.engine);
app.set('view engine', 'handlebars');

// configure routes
configRoutes(app);


// 3. One which will log the last time the user has made a request, and store it in a cookie.
app.use(function(request, response, next) {
    // If we had a user system, we could check to see if we could access /admin
  
    console.log("The request has all the following cookies:");
    console.log(request.cookies);
    if (request.cookies.AuthCookie) {
      console.log(
        "successful username / password combination with AuthCookie" + request.cookies.AuthCookie
      );
    } else {
      console.log("This user has never accessed the site before");
    }
  
    // THIS SECTION WILL EXPIRE THE COOKIE EVERY 5th request
    if (currentNumberOfRequests % 5 === 0) {
      console.log("now clearing the cookie");
      const anHourAgo = new Date();
      anHourAgo.setHours(anHourAgo.getHours() - 1);
      response.clearCookie("AuthCookie");
      next();
      return;
    }
   
    //Expire the cookie
    const now = new Date();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
  
    response.cookie("AuthCookie", now.toString(), { expires: expiresAt });
    next();
  });



app.listen(3000, ()=> {
    console.log("Server is running on => http://localhost:3000");

    //Add the line for grading
    if (process && process.send) process.send({done: true});
})

