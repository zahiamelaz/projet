//import
const express = require ('express');
const server = express();
const apiRouter = require('./routes/apiRouter').router;
const models = require('./models');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database
});
  //instantiation
  server.get('/', (req, res)=>{
    res.setHeader('Content-Type','text/html')
    res.send('Bonjour tous le monde')
  });
//les routes

server.use(express.urlencoded({extended: true}));
server.use(express.json());

//AdminJS
const adminJs = new AdminJS({
  resources: [models.user, models.comment, models.post, models.like],
  branding: {
      companyName: 'Best LEARNING',
      logo: false
  },
  rootPath: '/admin'
});

const router = AdminJSExpress.buildRouter(adminJs)
server.use(adminJs.options.rootPath, router)

server.use('/api',apiRouter)


  //listen to the port
  server.listen(3008,()=>{
    console.log('server 3008 en ecoute')
  })