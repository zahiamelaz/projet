const fetch = require('node-fetch');
const LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');


// Fonctions

exports.createComment = async (req, res) => {
    console.log( '-----hello---', req.query.idpost)
  // POST request using fetch()
  fetch("http://localhost:3008/api/comments", {
    
  // Adding method type
  method: "POST",  
  // Adding body or contents to send
  body: JSON.stringify({
      content : req.body.content,
      postId : req.query.idpost
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
  .then(json => console.log('------------here---- ', json))

  res.redirect('/')   
}
// exports.getAllCommentByPost = async (req, res,next) => {
    
//     console.log('****ici****',req.query.idpost)

//     const response = await fetch(`http://localhost:3008/api/allcomments-post/${req.query.idpost}`);
//     const allCom = await response.json();
//     console.log('***** com*', allCom); 

//     if(allCom){

//         console.log(allCom)

//         res.render('comment',{data: allCom ,me:myProfil})

//     };
// } 
exports.getAllCommentByPost = async (req, res,next) => {
    
  console.log('****ici****',req.query.idpost)

  const response = await fetch(`http://localhost:3008/api/allusercomments-post/${req.query.idpost}`);
  const allCom = await response.json();
  console.log('***** com***', allCom); 

  if(allCom){

      console.log(allCom)

      res.render('comment',{data: allCom ,me:myProfil})

  };
} 
exports.deleteComment = async (req, res) => {
    console.log(' ****deletecom**', req.query.id);
        const response = await fetch(`http://localhost:3008/api/deletecomment/${req.query.id}` ,  {
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
