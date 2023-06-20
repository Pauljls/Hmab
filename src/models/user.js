const mongoose=require("mongoose");
const {Schema}=mongoose;//ATRIBUTE FROM MONGOOSE LIBRERIE
const bcrypt=require("bcrypt-nodejs");//NODE FOR ENCRYPT PASSWORDS

const userSchema=new Schema({
    name: String,
    lastname: String,
    address: String,
    phone: String, 
    email: String,
    password: String,
});

/*METHODS FOR ENCRYPTING PASSWORDS ARE USUALLY RELATED TO SCHEMES*/
userSchema.methods.encryptPassword = (password) =>{
   return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
}
/*HERE WE WILL USE A TYPICAL JS FUNCITON FOR CAN HACE ACCESS TO SCHEMA PROPERTIES */
userSchema.methods.comparePassword= function (password){
    return bcrypt.compareSync(password,this.password);
}

module.exports=mongoose.model('users',userSchema);