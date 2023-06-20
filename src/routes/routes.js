const express=require('express');
const router=express.Router();
//AUTHENTICATION
const passport=require("passport")


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
    successRedirect: "/profile",
    failureRedirect: "/registro",
    passReqToCallback: true
}));

router.get('/signin',(req,res,next)=>{
    res.render('signin');
    next();
});

router.post('/signin',passport.authenticate("local-signin",{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/profile',(req,res,next)=>{
    res.render('profile');
})

module.exports=router;