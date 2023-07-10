const express = require('express');
const path = require("path"); // in build  module in node
const port = 8000;

const db = require('./config/mongoose');
const mongoose = require('mongoose');

// collection will be populated using this Collections Contact
const Contact = require('./models/contact')

const app = express();


app.set('view engine', 'ejs');// setting the value for a property
app.set('views',path.join(__dirname,'views'));

// These are middleware
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("assets"));//


//middleWare1
// app.use(function(req,res,next){

//     req.myName = "Manoj";
    // console.log("middleware1 is Called");
//     next();
// })

//middleWare2
// app.use(function(req,res,next){

//    console.log("My Name from MW2", req.myName);
    // console.log("middleware2 is Called");
//     next();
// })

var contactList = [
    {
        name: "Manoj",
        phone: "7895169134"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Coding Ninjas",
        phone:"0987654321"
    }
]


//routes
// app.get('/', function(req, res){

//     // console.log('this is called from route controller',req.myName);


//     Contact.find({},function(err, contacts){
//         if(err){
//             console.log('Error in fetching the contacts from DB');
//             return;
//         }

//         return res.render('home', {
//             title:"My Contacts List",
//             contact_list: contacts
//         });
//     });
   
//   });

app.get('/', function(req, res) {
    Contact.find({})
      .then(contacts => {
        return res.render('home', {
          title: "My Contacts List",
          contact_list: contacts
        });
      })
      .catch(err => {
        console.log('Error in fetching the contacts from DB');
        return res.status(500).send("Internal Server Error");
      });
  });


app.get('/practice', function(req,res){
    return res.render('practice',{
        title:"Let us play with EJS"
    });
});


// this function is giving error

// app.post('/create-contact', function(req,res){

//     // contactList.push({
//     //     name: req.body.name,
//     //     phone: req.body.phone
//     // });
// //    contactList.push(req.body);// both are same
//      // return res.redirect('/');
//     // return res.redirect('back');// both are same

//     // console.log(req.body);
//     // console.log(req.body.name);
//     // console.log(req.body.phone);
//     // return res.redirect('/practice');

// //creating contact to the database
// Contact.create({
//     name:req.body.name,
//     phone: req.body.phone 
// }, function(err,newContact){
//     if(err){
//         console.log("Error in creating a contact");
//         return;
//     }
//     console.log('*******', newContact);
//     return res.redirect('back');
// });

// });





app.post('/create-contact', async function(req, res) {
    try {
      const newContact = await Contact.create({
        name: req.body.name,
        phone: req.body.phone
      });
      console.log('*******', newContact);
      return res.redirect('back');
    } catch (err) {
      console.log("Error in creating a contact");
      return res.status(500).send("Internal Server Error");
    }
  });



// for deleting the contact

// using params 
// app.get("/delete-contact/:phone", function(req,res){
    // console.log(req.params);
    // let phone = req.params.phone;


    //using query
// app.get("/delete-contact", function(req,res){

    
//     // console.log(req.query);
//     let phone = req.query.phone;
   
   

//     let contactIndex = contactList.findIndex(contact => contact.phone == phone);

//     if (contactIndex != -1){
//         contactList.splice(contactIndex,1);
//     }

//     return res.redirect("back");

// })


// this function getting error 
// app.get("/delete-contact", function(req,res){


// //get id from the query in the ul
//     let id = req.query.id;
   
// // find the contact in the database using id and delete

// Contact.findByIdAndDelete(id,function(err){
//     if (err){
//         console.log('Error in deleting an object from database');
//         return;
//     }
//     return res.redirect('back');
// });

// });


// this is the final function
app.get("/delete-contact", function(req, res) {

    //get id from the query in the ul
    let id = req.query.id;
  
    // find the contact in the database using id and delete

    Contact.findByIdAndDelete(id)
      .then(() => {
        return res.redirect('back');
      })
      .catch(err => {
        console.log('Error in deleting an object from the database');
        return res.status(500).send("Internal Server Error");
      });
  });
  





app.listen(port, function(err){
    if(err){
        console.log("Error in running the server", err);
    }
    console.log("Yup! My Express Server is running on Port:", port);
});