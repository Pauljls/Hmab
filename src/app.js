const express=require("express");
//HELP TO ROUT PATH 
const path=require("path");
//FRAME
const engine=require("ejs-mate");
//MIDDLEWARE
const morgan=require("morgan");
//AUTHENTICATE
const passport=require("passport")
//SESSION
const session=require("express-session");
//CONECT-FLASH,MESSAGE
const flash=require("connect-flash");//WAY TO SEND MESSAGES ACROSS TO PAGES


//INITIALIZATIONS
const app=express();
/*WE REQUIRE ./DATABASE FOR USE IT */
require('./database');
/*WE REQUIRE AUTENTHICATE METHODS CLARATED IN PASSPORT FOR TRAVEL INTER PAGES*/
require('./passport/local-auth');

//PORT DECLARATION//SETTINGS
app.set('views',path.join(__dirname,'views'));//VIEWS ROUTE
app.engine('ejs',engine);
app.set('view engine','ejs');
app.set('port',process.env.PORT || 3000);

//MIDDLEWARES
// FUNCTIONS THAT WORK BEFORE TO ROUTES EXECUTION
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));//RECIVE DATA FROM THE CLIENT 
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false//with this we indicate that we do not need to have a previous initialisation.
}));
app.use(flash());//THIS MODULE MUST BE USE BEFORE TO PASSPORT AND AFTER TO SESSION BECAUSE, IT WILL USE HIS DATA 
app.use(passport.initialize());//WE'LL INITIALIZE PASSPORT FOR MAKE SERAILIZATION, AUTHENTICATION, ETC
app.use(passport.session());//SESSION DECALRATION FOR STORAGE
app.use((req,res,next)=>{
    app.locals.signupMessage=req.flash('signupMessage');
    app.locals.signinMessage=req.flash('signinMessage');
    app.locals.user=req.user;
    next();
});


//ROUTES
app.use(express.static(path.join(__dirname,'public')));//STATIC FILES LIKE IMG AND STYLESHEETS
app.use('/',require('./routes/routes'))
 
//EXECUTION OF THE PORT
app.listen(app.get('port'),()=>{
    console.log('Server on Port', app.get('port'));
})