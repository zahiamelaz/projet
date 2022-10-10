//CONST
const fetch = require('node-fetch');
const moment = require('moment');
const LocalStorage = require('node-localstorage').LocalStorage;

var localStorage = new LocalStorage('./scratch');

// FUNCTIONS //
exports.getAllPostsUSername = async (req, res) => {
    
    // console.log('****ici****',req.body)

    const response = await fetch('http://localhost:3008/api/postUsername');
    const myJson = await response.json();
    
    console.log('MYJSON ' ,myJson.allPosts.content); 

    if(myJson){


    res.render('home', {data:myJson, me:myProfil})

    };
}  
exports.getAllUsers = async (req, res) => {

    const response = await fetch('http://localhost:3008/api/getallusers');
    const myJson = await response.json();
    console.log( myJson); 

    return res.render('home',{
        getAll : myJson
    })
}  

exports.createPost = async (req, res) => {
      console.log( '-----hello---',req.body)
    // POST request using fetch()
    fetch("http://localhost:3008/api/createPost", {
      
    // Adding method type
    method: "POST",  
    // Adding body or contents to send
    body: JSON.stringify({
        content : req.body.content,
        attachement : req.body.attachement,
        createdAt :  moment(req.body.createdAt).startOf('hour').fromNow(), 
    }),
    // Adding headers to the request
    headers: {
        Authorization: localStorage.getItem('token'),// Token à récupérer 
        "Accept": 'application/json',
        "Content-type": "application/json"
    }
}) 
 // Converting to JSON
    .then(response => response.json())
    
    // Displaying results to console
    .then(json => console.log(json))

    res.redirect('/')   
}
exports.deletePost = async (req, res) => {
    console.log(' ****delete**', req.query.idpost);
        const response = await fetch(`http://localhost:3008/api/deletePost/${req.query.idpost}` ,  {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
              Authorization: localStorage.getItem("token"), // Token à récupérer
            },
          } 
        );

        const myJson = await response.json();
          console.log( myJson); 
    
        res.redirect('/')
}
exports.updatePost = async (req, res) => {
    console.log(' ****updat**', req.params.id);
    await fetch(`http://localhost:3008/api/putpost/${req.params.id}`,{
          
        // Adding method type
        method: "PUT",
          
        // Adding body or contents to send
        body: JSON.stringify({
            content : req.body.content,
            attachement: req.body.attachement,
        }),
          
        headers: {
            'Accept': 'application/json',
        'Content-Type': 'application/json',
      Authorization: localStorage.getItem("token"), //Token à récupérer
        }
    })
      
    // Converting to JSON
    .then(response => response.json())
      
    // Displaying results to console
    .then(json => console.log( 'mjs****', json))
    
    res.redirect('/')
}

