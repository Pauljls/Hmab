const express=require("express");
const path=require("path");
const engine=require("ejs-mate")
const app=express();

//PORT DECLARATION//SETTINGS
app.set('views',path.join(__dirname,'views'));
app.engine('ejs',engine);
app.set('view engine','ejs');
app.set('port',process.env.PORT || 3000);

//ROUTES
app.use(express.static(path.join(__dirname,'public')));
app.use('/',require('./routes/routes'))

//EXECUTION OF THE PORT
app.listen(app.get('port'),()=>{
    console.log('Server on Port', app.get('port'));
})