const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;//Strategys of autentication
const User=require("../models/user");//WE CALL THE SCHEMA USER FROM THE MODEL DATABASE

//DATA SAVED FOR NAV IN DIFFERENTS PAGES
passport.serializeUser((user,done)=>{
    done(null,user.id);
});
//FIND USER.ID IN DATABASE FOR GIVE HIS DATA
passport.deserializeUser(async (id,done)=>{
    const user = await User.findById(id);
    done(null,user);
});

/*LOCAL STRATEGY USE 2 PAPRAMETERS A OBJECT WITH THAT WE CAN AUTENTICATE AND CALLBACK FOR AUTENTICATION*/
passport.use('local-signup',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,email,password,done)=>{
    /*PROCESS AND STORE OF DATA IN DB */
    const user = await User.findOne({email: email}); ///FIND AN ONLY ITEM IN THIS CASE AN ONLY EMAIL
    //VALUE OF THIS FUNTION IS A BOOLEAN 
    if(user){
        return done(null,false,req.flash("signupMessage","The email is already taken."));
    }else{

        // Comprobar si las contraseñas coinciden
        if(password !== req.body.confirm_password){
            return done(null, false, req.flash("signupMessage", "Las contraseñas no coinciden."));
        }
        const newUser= new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.name = req.body.name;
        newUser.lastname=req.body.lastname;
        newUser.address=req.body.address;
        newUser.phone=req.body.phone;
        await newUser.save();//SAVE IN DATABASE
        done(null,newUser);//RETURN DATA+
    }

}));/*NAME OF METHOD OF AUTENTICATION AND STRATEGY OF AUTENTICATION*/

passport.use('local-signin',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,email,password,done)=>{
    
    const user = await User.findOne({email:email});//SEARCH IN DB
    if(!user){
        return done(null,false,req.flash('signinMessage','No user found.'));
    }
    if(!user.comparePassword(password)){
        return done(null,false,req.flash('signinMessage','Incorrect Password'));
    }

    done(null,user);
}));