const express = require('express');
const route = express.Router();
const userCtrl = require('../controlleurs/userCtrl');
const postCtrl = require('../controlleurs/postCtrl');
const commentCtrl = require('../controlleurs/commentCtrl');
const multer = require("multer");
const likeCtrl = require('../controlleurs/likeCtrl');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/img/uploads/');
    },
    filename: function(req, file, callback)  {
        callback(null, file.originalname);
    }
 })

var upload = multer({ storage: storage });

//route resister

route.get('/register',(req,res)=>{res.render('register');})
route.post('/register',userCtrl.addUser);
//route login
route.get('/login',(req,res)=>{res.render('login');})
route.post('/login', userCtrl.logUser);
//routes home

route.get('/',userCtrl.getUserByToken,postCtrl.getAllPostsUSername); 
//route.get('/',userCtrl.getAll)

route.post('/',upload.single('attachement'), postCtrl.createPost);
route.post('/delete', postCtrl.deletePost); 
route.post('/update/:id', postCtrl.updatePost); 
route.get('/update/:id',(req,res)=>{res.render('/')})
//route comment
route.get('/comment',userCtrl.getUserByToken,commentCtrl.getAllCommentByPost); 
route.post('/comment',commentCtrl.createComment);
route.post('/deletecomment',commentCtrl.deleteComment);
 route.get('/comment/:id',(req,res)=>{res.render('comment');})

//route profile

route.get('/profile',userCtrl.getUserByToken2);
route.post('/profile',userCtrl.updateUser);
route.post('/deleteuser',userCtrl.deleteUser);
route.post('/',upload.single('attachement'),postCtrl.createPost);
route.get('/profilepost',userCtrl.getUserByToken,userCtrl.getAllPostsById);

//route like
route.route('/postlike/:id').post(likeCtrl.createlike);
route.route('/postunlike/:id').post(likeCtrl.unlike);


//route logout
route.get('/logout',userCtrl.logOut);







module.exports = route;