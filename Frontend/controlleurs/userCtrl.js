const fetch = require('node-fetch');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

// FUNCTIONS //

exports.addUser = async (req, res) => {
   await fetch('http://localhost:3008/api/register', {
        // Adding method type
        method: "POST",
        // Adding contents to send
        body: JSON.stringify({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            bio: req.body.bio,
            attachement: req.body.attachement,
        }),
            // Adding headers to the request
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            }
    })
    .then(response => response.json())
    .then(json => {
        if (json.error) {
            console.log('------- front ------', json)
            res.render('register', json)
        } else {
            res.redirect('/login');
        }
    })
}
exports.logUser = async (req, res, next) => {

    await fetch("http://localhost:3008/api/login", {
        // Adding method type
        method: "POST",
        // Adding headers to the request
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        // Adding contents to send
        body: JSON.stringify({
            email: req.body.email,
            password: req.body.password,
        }),
    })
    // Converting to JSON
    .then((res) => res.json())
    // Displaying results to console
    .then(json =>{
       
        localStorage.setItem('token',json.token)

        if(json.token){
            res.redirect('/')
        }else{
            res.render('login',json)
        }
    })

    
}
        
exports.getUserByToken = async (req, res, next) => {
    console.log('---data---', req.params.id);

    // il faut recuperer le id depuis le token 

    const response = await fetch(`http://localhost:3008/api/getuser/${req.params.id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')// Token à récupérer 
        }
    });
    myProfil = await response.json();
    
    next();

}
exports.updateUser = async (req, res, next) => {
    console.log('---bcdh---',req);
    const response = await fetch('http://localhost:3008/api/updateuser', {
       // Adding method type
    method: "PUT",

    // Adding body or contents to send
    body: JSON.stringify({
      username: req.body.username,
      bio: req.body.bio,
      attachement: req.body.attachement,
      
    }),

    // Adding headers to the request
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      Authorization: localStorage.getItem("token"), //Token à récupérer
    },
  })
    // Converting to JSON
    .then((response) => response.json())

    // Displaying results to console
    .then((json) => {
      res.redirect('/profile');
    });
};
exports.logOut = async (req, res, next) => {
    const tokenFromLocalStorage = localStorage.getItem('token')
    if (tokenFromLocalStorage) {
        localStorage.clear();
        res.redirect('/login')
    };
}
exports.deleteUser = async (req, res) => {
    const response = await fetch(
        'http://localhost:3008/api/deleteuser',
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"), // Token à récupérer
        },
      }
    );
  
    const myJson = await response.json();
  
    res.redirect("/register");
  };
exports.getAll = async (req, res) => {

    const allUsers = await fetch('http://localhost:3008/api/getallusers');
    const myJson = await allUsers.json();
    console.log('****users**', myJson); 

    return res.render('/',{
        users : myJson
    })
}  
exports.getUserByToken2 = async (req, res, next) => {
    

    // il faut recuperer le id depuis le token 

    const response = await fetch(`http://localhost:3008/api/getuser/${req.params.id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')// Token à récupérer 
        }
    });
    const myJson = await response.json();
    res.render('profile', { user: myJson });
    
    return next();

}
exports.getAllPostsById = async (req, res) => {

    const response = await fetch('http://localhost:3008/api/getAllPostsById',
    {
        headers: {
            'Authorization': localStorage.getItem('token')// Token à récupérer 
        }
    });
    const myJson = await response.json();
    console.log('ici userbyid---',myJson); 

    if(myJson){

        //console.log(myJson)
    
        res.render('profilepost', {data:myJson ,me:myProfil})
    
        };
    // return res.render('profilepost',{
    //     postsuser : myJson
    // })
}  





