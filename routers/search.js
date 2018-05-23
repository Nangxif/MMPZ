var express=require('express');
var router=express.Router();
var app=express();
var swig=require('swig');
app.engine('html',swig.renderFile);
app.set('views','/views');
app.set('view engine','html');
app.use('/public',express.static(__dirname+'/public'));
router.get('/',function(req,res,next){
    res.render('search');
});
router.get('/result',function(req,res,next){
    res.render('searchResult');
})
module.exports=router;