const express=require('express');
const router=express.Router();


router.get('/',(req,res,next)=>{
    res.render('index');
});
router.post('/',(req,res,next)=>{

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
router.get('/login',(req,res,next)=>{
    res.render('login');
});
router.get('/registro',(req,res,next)=>{
    res.render('registro');
});
module.exports=router;