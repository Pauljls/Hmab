const express=require('express');
const router=express.Router();
//AUTHENTICATION
const passport=require('passport')


router.get('/',(req,res,next)=>{
    res.render('index');
});
router.get('/nosotros',(req,res,next)=>{
    res.render('nosotros');
});
router.get('/reservaciones',(req,res,next)=>{
    res.render('reservaciones');
});
router.get('/menu',(req,res,next)=>{
    res.render('menu');
});

router.get('/registro',(req,res,next)=>{
    res.render('registro');
});
router.post('/registro',passport.authenticate("local-signup",{
    successRedirect: "/signin",
    failureRedirect: "/registro",
    passReqToCallback: true
}));

router.get('/signin',(req,res,next)=>{
    res.render('signin');
});

router.post('/signin',passport.authenticate("local-signin",{
    successRedirect: "/profile",
    failureRedirect: "/signin",
    passReqToCallback: true
}));

router.get("/logout", (req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect("/");
    });
});

function isAuthenticated(req,res,next){
     if(req.isAuthenticated()){
        return next();
     }
     res.redirect('/');
};
//WITH AUTHENTICATE U CAN MANAGE THE PASS TO OTHER SITES
//IN THIS CASE WE DO THIS FOR MANAGE THE ACCESS TO THE PROFILE SITE
// U NEED BE AUTHENTICATE FOR JOIN BUT IF U WANNA GIVE A AUTENTICATION
//FOR MMORE SITES U SHOULD USE A FUNCTION BEFORE TU GET FUNCIONS
//LIKE THIS
/*
router.use((req,res,next)=>{
    isAuthenticated(req,res,next);
    next();
});
*/

router.get('/profile',isAuthenticated,(req,res,next)=>{
    res.render('profile');
})

module.exports=router;