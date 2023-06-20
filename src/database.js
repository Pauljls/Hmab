const mongoose=require("mongoose");
const {mongodb}=require("./keys");//ATRIBUTE OF OBJECT
//HERE THERE ARE 2 PARAMETER, ONE OF THEM WILL BE AN OBJECT TO CONFIGURATION AND THE SECOND THE CONFIGURAITON
mongoose.connect(mongodb.URI,{})
    .then(db=>console.log('Database is conected'))
    .catch(err=>console.error(err));